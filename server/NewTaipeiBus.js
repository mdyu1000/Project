const request = require('request')
const fs = require('fs');
const CONST = require('../constant') 

function combineNewTaipeiRouteAndStop(route, stop, callback) {
  //already json no need to parse
  let routeObj = route
  let stopObj = stop

  let result = []
	/* 由於 Route ID 會有重複 所以先暫時掠過 */
	let prevRecordRID = -999
	let recordRID = -998
	let busInfo = {}
 
  /*
		先對 route 做 loop
		利用 route.Id 去對應 Stop.routeId
	*/

  for(var i = 0; i < routeObj.length; i++){
    let routeItem = routeObj[i]

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
			city: "NewTaipei",
			station: []
    }
    
    let filterStop = stopObj.filter(stop => routeItem.Id == stop.routeId)

    for(var j = 0; j < filterStop.length; j++){

      if(parseFloat(filterStop[j].latitude) > 180 || parseFloat(filterStop[j].longitude > 90)) continue

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
	getNewTaipeiBusFromOpenData: function(callback){
    /* Read NewTaipei Route json */
    // fs.readFile('newTaipeiBusRoute.json', 'utf8', (err, route) => {
    //   fs.readFile('newTaipeiBusStop.json', 'utf8', (err, stop) => {
    //     combineNewTaipeiRouteAndStop(route, stop, callback)
    //   })
    // })
    global.fetch = require("node-fetch");
    fetch(CONST.NEWTAIPEI_BUS_ROUTE)
    .then(function(response) {
      return response.json();
    }).then(function(route) {
        fetch(CONST.NEWTAIPEI_BUS_STOP)
        .then(function(response) {
          return response.json();
        }).then(function(stop) {
          combineNewTaipeiRouteAndStop(route, stop, callback)
        });
    });
    

  }
}
