export const ADD_NAME = "ADD_NAME"
export const ADD_COLOR = "ADD_COLOR"
export const ADD_DEPARTURE = "ADD_DEPARTURE"
export const ADD_DESTINATION = "ADD_DESTINATION"
export const ADD_STATION = "ADD_STATION"
export const ADD_CONDITION_ONE = "ADD_CONDITION_ONE"
export const ADD_CONDITION_TWO = "ADD_CONDITION_TWO"
export const ADD_CONDITION_THREE = "ADD_CONDITION_THREE"
export const ADD_CONDITION_FOUR = "ADD_CONDITION_FOUR"

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


export function AddStation(name, location){
  return {
    type: ADD_STATION,
    name,
    location
  }
}

export function AddConditionOne(SID, distance){
  return {
    type: ADD_CONDITION_ONE,
    SID,
    distance
  }
}

export function AddConditionTwo(SID, value, type){
  return {
    type: ADD_CONDITION_TWO,
    SID,
    type,
    value
  }
}

export function AddConditionThree(distance){
  return {
    type: ADD_CONDITION_THREE,
    distance
  }
}

export function AddConditionFour(interval){
  return {
    type: ADD_CONDITION_FOUR,
    interval
  }
}