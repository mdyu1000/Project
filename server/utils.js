const geoDistance = require("geo-distance")

module.exports = {
	setDistanceAndExtremum: function(route){

	  let distanceArr = []
	  let distanceMax = 0
	  let distanceMin = 0

	  for(var i = 0; i < route.stations.length - 1; i++){
	    let item = route.stations[i]
	    let here = {
	      lat: item.location.lat,
	      lon: item.location.lng,
	    }
	    let there = {
	      lat: route.stations[i + 1].location.lat,
	      lon: route.stations[i + 1].location.lng 
	    }
	    let distance = geoDistance.between(here, there).human_readable()

	    if(distance.unit == "km"){
	      route.stations[i]["distance"] = Number(distance.distance) * 1000
	      distanceArr.push(Number(distance.distance) * 1000)
	    }
	    else if(distance.unit == "m"){
	      route.stations[i]["distance"] = Number(distance.distance)
	      distanceArr.push(Number(distance.distance))
	    }
	  }

	  distanceMax = Math.max(...distanceArr)
	  distanceMin = Math.min(...distanceArr)

	  route["distanceMax"] = distanceMax
	  route["distanceMin"] = distanceMin
	  return route
	}
}