export const ADD_STATION = "ADD_STATION"
export const DEL_STATION = "DEL_STATION"
export const SORT_STATION = "SORT_STATION"
export const EDIT_STATION = "EDIT_STATION"
export const ADD_STATION_NAME = "ADD_STATION_NAME"
export const DEL_STATION_NAME = "DEL_STATION_NAME"
export const ADD_STATION_LOCATION = "ADD_STATION_LOCATION"


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

export function DelStationName(language){
  return {
    type: DEL_STATION_NAME,
    language
  }
}

export function AddStationLocation(lat, lng){
  return {
    type: ADD_STATION_LOCATION,
    lat,
    lng
  }
}