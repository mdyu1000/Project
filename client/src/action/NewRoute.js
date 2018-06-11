export const ADD_NAME = "ADD_NAME"
export const ADD_COLOR = "ADD_COLOR"
export const ADD_DEPARTURE = "ADD_DEPARTURE"
export const ADD_DESTINATION = "ADD_DESTINATION"
export const ADD_STATION = "ADD_STATION"
export const ADD_STATION_NAME = "ADD_STATION_NAME"
export const ADD_STATION_LOCATION = "ADD_STATION_LOCATION"
export const ADD_CONDITION_ONE = "ADD_CONDITION_ONE"
export const ADD_CONDITION_THREE = "ADD_CONDITION_THREE"
export const ADD_CONDITION_FOUR = "ADD_CONDITION_FOUR"
export const DEL_STATION = "DEL_STATION"
export const DEL_CONDITION = "DEL_CONDITION"
export const SORT_STATION = "SORT_STATION"
export const ADD_CONDITION_TWO = "ADD_CONDITION_TWO"
const ADD_CONDITION_ONE_TEST = "ADD_CONDITION_ONE_TEST"
const ADD_CONDITION_TWO_BLA = "ADD_CONDITION_TWO_BLA"

export function AddName(language, routeName){
  return {
    type: ADD_NAME,
    language,
    routeName
  }
}

export function AddColor(color){
  return {
    type: ADD_COLOR,
    color
  }
}

export function AddDeparture(language, departure){
  return {
    type: ADD_DEPARTURE,
    language,
    departure
  }
}

export function AddDestination(language, destination){
  return {
    type: ADD_DESTINATION,
    language,
    destination
  }
}

let nextSID = 4
export function AddStation(name, location){
  return {
    type: ADD_STATION,
    SID: ++nextSID, 
    name,
    location
  }
}

export function DelStation(SID){
  return {
    type: DEL_STATION,
    SID
  }
}

export function SortStation(station){
  return {
    type: SORT_STATION,
    station
  }
}

export function AddStationName(language, name){
  return {
    type: ADD_STATION_NAME,
    language,
    name
  }
}

export function AddStationLocation(lat, lng){
  return {
    type: ADD_STATION_LOCATION,
    lat,
    lng
  }
}

let nextRID = 6;
export function AddConditionOne(SID, distance){
  return {
    type: ADD_CONDITION_ONE,
    RID: ++nextRID,
    SID,
    distance
  }
}

export function AddConditionTwo(SID, typeID, value){
  return {
    type: ADD_CONDITION_TWO,
    RID: ++nextRID,
    SID,
    typeID,
    value
  }
}

export function AddConditionThree(distance){
  return {
    type: ADD_CONDITION_THREE,
    RID: ++nextRID,
    distance
  }
}

export function AddConditionFour(interval){
  return {
    type: ADD_CONDITION_FOUR,
    RID: ++nextRID,
    interval
  }
}

export function DelCondition(RID){
  return {
    type: DEL_CONDITION,
    RID
  }
}