const gunzip = require('gunzip-file')
const request = require('request')
const fs = require('fs');

const CONST = require('../constant') 

function combineTaipeiRouteAndStop(route, stop, callback) {
	let routeObj = JSON.parse(route)
	let stopObj = JSON.parse(stop)

	let result = []
	/* 由於 Route ID 會有重複 所以先暫時掠過 */
	let prevRecordRID = -999
	let recordRID = -998
	let busInfo = {}

	/* 
		先對 route 做 loop 
		利用 route.Id 去對應 Stop.routeId
	*/

	for(var i = 0; i < routeObj.BusInfo.length; i++){

		let routeItem = routeObj.BusInfo[i]

		/* filter duplicate route Id */
		recordRID = routeItem.Id
		if(recordRID == prevRecordRID) continue
		prevRecordRID = routeItem.Id

		busInfo = {
			openDataRID: routeItem.Id,
			name: {
				ch: routeItem.nameZh,
				en: routeItem.nameEn
			},
			departure: {
				ch: routeItem.departureZh,
				en: routeItem.departureEn
			},
			destination: {
				ch: routeItem.destinationZh,
				en: routeItem.destinationEn
			},
			city: "Taipei",
			station: []
		}

		let filterStop = stopObj.BusInfo.filter(stop => routeItem.Id == stop.routeId)

		for(var j = 0; j < filterStop.length; j++){

			if(parseFloat(filterStop[j].latitude) > 180 || parseFloat(filterStop[j].longitude > 90) continue

			busInfo = {
				...busInfo,
				station: [
					...busInfo.station,
					{
		        openDataSID: filterStop[j].Id,
		        name: {
		          ch: filterStop[j].nameZh,
		          en: filterStop[j].nameEn
		        },
		        location: {
		          lat: parseFloat(filterStop[j].latitude),
		          lng: parseFloat(filterStop[j].longitude)
		        }
					}
				]
			}
		}
		result.push(busInfo)
	}
	callback(result)
}

module.exports = {
	getTaipeiBusFromOpenData: function(callback){
		/* Get Taipei Route gz file */
		request
			.get(CONST.TAIPEI_BUS_ROUTE)
			.on('response', response => {
				const taipeiBusRoute = fs.createWriteStream("taipeiBusRoute.gz")
				const taipeiBusRouteStream = response.pipe(taipeiBusRoute)

				taipeiBusRouteStream.on('finish', () => {
					/* unzip Taipei Route gz to json */
					gunzip('taipeiBusRoute.gz', 'taipeiBusRoute.json', () => {
						console.log("TP Route gunzip done")

						/* Read Taipei Route json */
						fs.readFile('taipeiBusRoute.json', 'utf8', (err, route) => {

							/* Get Taipei Stop gz file */
							request
							.get(CONST.TAIPEI_BUS_STOP)
							.on('response', response2 => {
								const taipeiBusStop = fs.createWriteStream("taipeiBusStop.gz")
								const taipeiBusStopStream = response2.pipe(taipeiBusStop)

								taipeiBusStopStream.on('finish', () => {
									/* unzip Taipei Stop gz to json */
									gunzip('taipeiBusStop.gz', 'taipeiBusStop.json', () => {
										console.log("TP Stop gunzip done")
										/* Read Taipei Stop json */
										fs.readFile('taipeiBusStop.json', 'utf8', (err, stop) => {
											combineTaipeiRouteAndStop(route, stop, callback)
										})
									})
								})
							})
						})
					})
				})
			})
	}

}