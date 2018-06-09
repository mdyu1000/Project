import { combineReducers } from 'redux'
import { 
  ADD_NAME, 
  ADD_COLOR,
  ADD_DEPARTURE,
  ADD_DESTINATION,
  ADD_STATION,
  ADD_STATION_NAME,
  ADD_STATION_LOCATION,
  ADD_CONDITION_ONE,
  ADD_CONDITION_TWO,
  ADD_CONDITION_THREE,
  ADD_CONDITION_FOUR, 
  DEL_STATION } from '../action/NewRoute'
import { stations } from '../component/Global'

const initialState = {
  nameLists: { en: "NTUT", ch: "北科大" },
  departureLists: { en: "Zhongxiao Fuxing" },
  destinationLists: { ch: "動物園" },
  colors: ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'],
  stations: stations,
  stationName: { en: "Taipei Arena", ch: "台北小巨蛋" },
  stationLocation: { lat: "0", lns: "0" }
}

function NewDepartureName(state, action){
  switch(action.type){
    case ADD_DEPARTURE:
      state[action.language] = action.departure
      return {
        ...state
      }
    default:
      return state
  }
}

function NewDestinationName(state, action){
  switch(action.type){
    case ADD_DESTINATION:
      state[action.language] = action.destination
      return {
        ...state
      }
    default:
      return state
  }
}

function NewColor(state, action){
  switch(action.type){
    case ADD_COLOR:
      return [
        ...state,
        action.color
      ]     
    default:
      return state
  }
}

function NewStation(state, action){
  switch(action.type){
    case ADD_STATION:
      return [
        ...state,    
        {
          name: action.name,  
          location: action.location    
        } 
      ]
    case DEL_STATION:
      delete state[action.index]
      return 
    default:
      return state
  }
}

function NewStationName(state, action){
  switch(action.type){
    case ADD_STATION_NAME:
      state[action.language] = action.name
      return {
        ...state
      }
    default:
      return state
  }  
}

function NewStationLocation(state, action){
  switch(action.type){
    case ADD_STATION_LOCATION:
      state["lat"] = action.lat
      state["lns"] = action.lns
      return {
        ...state
      }
    default:
      return state   
  }
}

function NewRoute(state, action){
  switch(action.type){
    case ADD_NAME:
      state[action.language] = action.routeName 
      return {
        ...state,
        // action.language: action.routeName
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
    departureLists: NewDepartureName(state.departureLists, action),
    destinationLists: NewDestinationName(state.destinationLists, action),
    colors: NewColor(state.colors, action),
    stations: NewStation(state.stations, action),
    stationName: NewStationName(state.stationName, action),
    stationLocation: NewStationLocation(state.stationLocation, action),
  }
}

