import {IMGUR_CLINET_ID, IMGUR_ALBUM} from "../constant"

export const ADD_STATION = "ADD_STATION"
export const DEL_STATION = "DEL_STATION"
export const SORT_STATION = "SORT_STATION"
export const EDIT_STATION = "EDIT_STATION"
export const ADD_STATION_NAME = "ADD_STATION_NAME"
export const DEL_STATION_NAME = "DEL_STATION_NAME"
export const ADD_STATION_LOCATION = "ADD_STATION_LOCATION"
export const EDIT_STATION_MODE = "EDIT_STATION_MODE"
export const CLOSE_STATION_MODAL = "CLOSE_STATION_MODAL"
export const GET_SID_ON_GMAP = "GET_SID_ON_GMAP"

export const SET_STATION_SPOT_ICON = "SET_STATION_SPOT_ICON"
export const ADD_STATION_SPOT_NAME = "ADD_STATION_SPOT_NAME"
export const DEL_STATION_SPOT_NAME = "DEL_STATION_SPOT_NAME"
export const ADD_STATION_SPOT = "ADD_STATION_SPOT"
export const DEL_STATION_SPOT = "DEL_STATION_SPOT"

let nextSID = 4
export function AddStation(name, location, infos){
  return {
    type: ADD_STATION,
    SID: ++nextSID, 
    name,
    location,
    infos
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

export function EditStationMode(SID, name, location, infos){
  return {
    type: EDIT_STATION_MODE,
    SID,
    name,
    location,
    infos
  }
}

export function EditStation(SID, name, location, infos){
  return {
    type: EDIT_STATION,
    SID,
    name,
    location,
    infos
  }
}

export function AddStationLocation(lat, lng){
  return {
    type: ADD_STATION_LOCATION,
    lat,
    lng
  }
}

export function CloseStationModal(){
  return {
    type: CLOSE_STATION_MODAL
  }
}

export function GetSIDOnGMap(SID){
  return {
    type: GET_SID_ON_GMAP,
    SID
  }
}

export function SetStationSpotIcon(icon) {
  return{
    type: SET_STATION_SPOT_ICON,
    icon
  }
}

export function AddStationSpotName(language, name){
  return {
    type: ADD_STATION_SPOT_NAME,
    language,
    name
  }
}

export function DelStationSpotName(language){
  return {
    type: DEL_STATION_SPOT_NAME,
    language
  }
}

export function AddStationSpot(icon, name){
  return {
    type: ADD_STATION_SPOT,
    icon,
    name
  }
}

export function DelStationSpot(spotId){
  return {
    type: DEL_STATION_SPOT,
    spotId
  }
}