const geoDistance = require("geo-distance")

function setDistanceUnitConversion(distance){
	if(distance.unit == "km"){
		return Number(distance.distance) * 1000
	}else {
		return Number(distance.distance)
	}
}

module.exports = {
	setDistanceAndExtremum: route => {
	  let distanceArr = []
	  let distanceMax = 0
	  let distanceMin = 0

	  for(var i = 0; i < route.stations.go.length - 1; i++){
	    let item = route.stations.go[i]
	    let here = {
	      lat: item.location.lat,
	      lon: item.location.lng,
	    }
	    let there = {
	      lat: route.stations.go[i + 1].location.lat,
	      lon: route.stations.go[i + 1].location.lng 
	    }
	    let distance = geoDistance.between(here, there).human_readable()

	    route.stations.go[i]["distance"] = setDistanceUnitConversion(distance)
	    distanceArr.push(setDistanceUnitConversion(distance))
	  }	  

	  for(var i = 0; i < route.stations.back.length - 1; i++){
	    let item = route.stations.back[i]
	    let here = {
	      lat: item.location.lat,
	      lon: item.location.lng,
	    }
	    let there = {
	      lat: route.stations.back[i + 1].location.lat,
	      lon: route.stations.back[i + 1].location.lng 
	    }
	    let distance = geoDistance.between(here, there).human_readable()

	    route.stations.back[i]["distance"] = setDistanceUnitConversion(distance)
	    distanceArr.push(setDistanceUnitConversion(distance))
	  }

	  distanceMax = Math.max(...distanceArr)
	  distanceMin = Math.min(...distanceArr)

	  route["distanceMax"] = distanceMax
	  route["distanceMin"] = distanceMin
	  return route
	},
}