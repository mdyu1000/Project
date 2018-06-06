import { combineReducers } from 'redux'
import { 
  ADD_NAME, 
  ADD_COLOR
  ADD_DEPARTURE
  ADD_DESTINATION
  ADD_STATION
  ADD_CONDITION_ONE
  ADD_CONDITION_TWO
  ADD_CONDITION_THREE
  ADD_CONDITION_FOUR } from '../action/action'



function NewRoute(state = [], action){
  switch(action.type){
    case ADD_NAME:
      return {
        ...state,
        action.language: action.routeName
      }
    case ADD_COLOR:
      return [
        ...state,
        action.color
      ] 
    case ADD_DEPARTURE:
      return {
        ...state,
        action.language: action.departure
      }
    case ADD_DESTINATION:
      return {
        ...state,
        action.language: action.destination
      }
    case ADD_STATION:
      return {
        ...state,
        {
          name: action.name,
          location: action.location
        }
      }
    case ADD_CONDITION_ONE:
      return {
        ...state,
        {
          condition: 1,
          SID: action.SID,
          distance: action.distance
        }
      }
    case ADD_CONDITION_TWO:
      return {
        ...state,
        {
          condition: 2,
          SID: action.SID,
          type: action.type,
          value: action.value
        }
      }
    case ADD_CONDITION_THREE:
      return {
        ...state,
        {
          condition: 3,
          distance: action.distance
        }
      }
    case ADD_CONDITION_FOUR:
      return {
        ...state,
        {
          condition: 4,
          interval: action.interval
        }
      }
  }
}

