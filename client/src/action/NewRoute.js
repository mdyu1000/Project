export const ADD_NAME = "ADD_NAME"
export const DEL_NAME = "DEL_NAME"
export const ADD_COLOR = "ADD_COLOR"
export const DEL_COLOR = "DEL_COLOR"
export const ADD_DEPARTURE = "ADD_DEPARTURE"
export const DEL_DEPARTURE = "DEL_DEPARTURE"
export const ADD_DESTINATION = "ADD_DESTINATION"
export const DEL_DESTINATION = "DEL_DESTINATION"
export const CHANGE_DEMO_COLOR = "CHANGE_DEMO_COLOR"


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

export const AddRoute = (route, station, rule) => dispatch => {
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