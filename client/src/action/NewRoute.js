import { SERVER } from "../constant"

export const ADD_NAME = "ADD_NAME"
export const DEL_NAME = "DEL_NAME"
export const ADD_COLOR = "ADD_COLOR"
export const DEL_COLOR = "DEL_COLOR"
export const ADD_DEPARTURE = "ADD_DEPARTURE"
export const DEL_DEPARTURE = "DEL_DEPARTURE"
export const ADD_DESTINATION = "ADD_DESTINATION"
export const DEL_DESTINATION = "DEL_DESTINATION"
export const CHANGE_DEMO_COLOR = "CHANGE_DEMO_COLOR"
export const RECEIVE_ALL_ROUTE = "RECEIVE_ROUTE"
export const GET_ROUTE_RID = "GET_ROUTE_RID"
export const RECEIVE_ONE_ROUTE = "RECEIVE_ONE_ROUTE"
export const RECEIVE_BUS_INFO = "RECEIVE_BUS_INFO"
export const LOAD_ROUTE_INFO = "LOAD_ROUTE_INFO"

var nextRID = 0

export function AddName(language, routeName){
  return {
    type: ADD_NAME,
    language,
    routeName
  }
}

export function DelName(language){
  return {
    type: DEL_NAME,
    language
  }
}

export function AddColor(color){
  return {
    type: ADD_COLOR,
    color
  }
}

export function DelColor(color){
  return {
    type: DEL_COLOR,
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

export function DelDeparture(language){
  return {
    type: DEL_DEPARTURE,
    language
  }
}

export function AddDestination(language, destination){
  return {
    type: ADD_DESTINATION,
    language,
    destination
  }
}

export function DelDestination(language){
  return {
    type: DEL_DESTINATION,
    language
  }
}

export function ChangeDemoColor(color){
  return {
    type: CHANGE_DEMO_COLOR,
    color
  }
}

export const FetchAllRoute = () => dispatch => {
  return fetch(`${SERVER}/AllRoute`)
  .then(response => response.json())
  .then(json => {
    nextRID = json.length
    dispatch(ReceiveAllRoute(json))
  })
}

const ReceiveAllRoute = (json) => {
  return {
    type: RECEIVE_ALL_ROUTE,
    json
  }
}

export function GetRouteRID(RID){
  return {
    type: GET_ROUTE_RID,
    RID
  }
}

export const FetchOneRoute = (RID) => dispatch => {
  return fetch(`${SERVER}/AllRoute/${RID}`)
        .then(response => response.json())
        .then(json => {
          dispatch(ReceiveOneRoute(json[0]))
        })
}

const ReceiveOneRoute = (json) => {
  return {
    type: RECEIVE_ONE_ROUTE,
    json
  }
}

export const AddRoute = (route, station, rule) => dispatch => {
  route["RID"] = nextRID 
  nextRID += 1

  fetch("/NewRoute/", {
    method: 'POST',
    body: JSON.stringify({
      "route": route,
      "stations": station,
      "rules": rule
    }),
    headers: {"Content-Type": "application/json"}
  })
  .catch(function(err){
    console.log(err)
  })
}

export const UpdateRoute = (RID, route) => dispatch => {
  return  fetch(`${SERVER}/UpdateRoute/${RID}`, {
            method: 'PUT',
            body: JSON.stringify({
              "route": route,
            }),
            headers: {"Content-Type": "application/json"}
          })
          .catch(function(err){
            console.log(err)
          })
}

/* Fetch 雙北公車檔案 */
export const fetchBusInfo = () => dispatch => {
  return fetch(`${SERVER}/BusInfo`)
  .then(response => response.json())
  .then(json => {
    dispatch(ReceiveBusInfo(json))
  })
}

const ReceiveBusInfo = json => {
  return {
    type: RECEIVE_BUS_INFO,
    json
  }
}

export const loadRouteInfo = (RID) => {
  return {
    type: LOAD_ROUTE_INFO,
    RID
  }
}