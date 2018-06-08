import { combineReducers } from 'redux'
import { 
  ADD_NAME, 
  ADD_COLOR,
  ADD_DEPARTURE,
  ADD_DESTINATION,
  ADD_STATION,
  ADD_CONDITION_ONE,
  ADD_CONDITION_TWO,
  ADD_CONDITION_THREE,
  ADD_CONDITION_FOUR } from '../action/NewRoute'

const initialState = {
  nameLists: { en: "NTUT", ch: "北科大" },
  departureLists: { en: "Zhongxiao Fuxing" },
  destinationLists: { ch: "動物園" },
}

function NewRoute(state = [], action){
  switch(action.type){
    case ADD_NAME:
      state["name"][action.language] = action.routeName 
      return {
        ...state,
        // action.language: action.routeName
      }
    case ADD_COLOR:
      return [
        ...state,
        action.color
      ] 
    case ADD_DEPARTURE:
      state["departure"][action.language] = action.departure
      return {
        ...state,
        // action.language: action.departure
      }
    case ADD_DESTINATION:
      state["destination"][action.language] = action.destination
      return {
        ...state,
        // action.language: action.destination
      }
    case ADD_STATION:
      return {
        ...state,    
        name: action.name,
        location: action.location         
      }
    case ADD_CONDITION_ONE:
      return {
        ...state,      
        condition: 1,
        SID: action.SID,
        distance: action.distance
      }
    case ADD_CONDITION_TWO:
      return {
        ...state,
        condition: 2,
        SID: action.SID,
        type: action.type,
        value: action.value
      }
    case ADD_CONDITION_THREE:
      return {
        ...state,
        condition: 3,
        distance: action.distance
      }
    case ADD_CONDITION_FOUR:
      return {
        ...state,    
        condition: 4,
        interval: action.interval
        
      }
    default:
      return state
  }
}

export default function BusPlayApp(state = initialState, action){
  return {
    nameLists: NewRoute(state.nameLists, action),
    departureLists: NewRoute(state.departureLists, action),
    destinationLists: NewRoute(state.destinationLists, action)
  }
}

