import { combineReducers } from 'redux'
import { 
  ADD_NAME, 
  DEL_NAME,
  ADD_COLOR,
  DEL_COLOR,
  ADD_DEPARTURE,
  DEL_DEPARTURE,
  ADD_DESTINATION,
  DEL_DESTINATION,
  CHANGE_DEMO_COLOR } from '../action/newRoute'
import {
  ADD_STATION,
  DEL_STATION,
  SORT_STATION,
  EDIT_STATION,
  ADD_STATION_NAME,
  DEL_STATION_NAME,
  ADD_STATION_LOCATION,
  EDIT_STATION_MODE, 
  CLOSE_STATION_MODAL } from '../action/station'
import {
  ADD_CONDITION_ONE,
  ADD_CONDITION_TWO,
  ADD_CONDITION_THREE,
  ADD_CONDITION_FOUR, 
  DEL_CONDITION } from '../action/condition'
import { stations, rules } from '../component/Global'
import _ from 'lodash';

const initialState = {
  nameLists: { en: "NTUT", ch: "北科大" },
  departureLists: { en: "Zhongxiao Fuxing" },
  destinationLists: { ch: "動物園" },
  colors: ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'],
  stations: stations,
  stationName: {},
  stationLocation: { lat: "0", lng: "0" },
  rules: rules,
  demoColor: "#FF6900",
  isEditMode: false,
}

function NewDepartureName(state, action){
  switch(action.type){
    case ADD_DEPARTURE:
      state[action.language] = action.departure
      return {
        ...state
      }
    case DEL_DEPARTURE:
      delete state[action.language]
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
    case DEL_DESTINATION:
      delete state[action.language]
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
    case DEL_COLOR:
      state.splice(state.indexOf(action.color.toUpperCase()), 1)
      return [
        ...state
      ]
    default:
      return state
  }
}

function NewStation(state, action, stationName, stationLocation){
  switch(action.type){
    case ADD_STATION:
      Object.entries(stationName).map(([key, value]) => {
        delete stationName[key]
      })
      Object.entries(stationLocation).map(([key, value]) => {
        stationLocation[key] = 0
      })      
      return [
        ...state,    
        {
          SID: action.SID,
          name: action.name,  
          location: action.location    
        } 
      ]
    case DEL_STATION:
      return state.filter((state) => action.SID != state.SID)
    case SORT_STATION:
      return action.station
    case EDIT_STATION:
      Object.entries(stationName).map(([key, value]) => {
        delete stationName[key]
      })
      Object.entries(stationLocation).map(([key, value]) => {
        stationLocation[key] = 0
      }) 
      return state.map(item => {
        if(action.SID != item.SID){
          return item
        }else{
          return {
            SID: action.SID,
            name: action.name,
            location: action.location
          }
        }
      })
    case CLOSE_STATION_MODAL:
      Object.entries(stationName).map(([key, value]) => {
        delete stationName[key]
      })
      Object.entries(stationLocation).map(([key, value]) => {
        stationLocation[key] = 0
      })
      return [
        ...state
      ]
    default:
      return state
  }
}

function NewStationName(state, action){
  switch(action.type){
    case ADD_STATION_NAME:
      let tmp = _.cloneDeep(state)
      tmp[action.language] = action.name
      return {
        ...tmp
      }
    case DEL_STATION_NAME:
      let temp = _.cloneDeep(state) //複製一份 避免干擾到指標
      delete temp[action.language]
      return {
        ...temp
      }
    case EDIT_STATION_MODE:
      return {
        ...action.name
      }
    default:
      return state
  }  
}

function NewStationLocation(state, action){
  switch(action.type){
    case ADD_STATION_LOCATION:
      let tmp = _.cloneDeep(state)
      tmp["lat"] = action.lat
      tmp["lng"] = action.lng
      return {
        ...tmp
      }
    case EDIT_STATION_MODE:
      return {
        ...action.location
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
    case DEL_NAME:
      delete state[action.language]
      return {
        ...state
      }
    default:
      return state
  }
}

function NewRule(state, action){
  switch(action.type){
    case ADD_CONDITION_ONE:
      return [
        ...state,     
        {
          RID: action.RID,
          condition: 1,
          SID: action.SID,
          distance: action.distance,
        } 
      ]
    case ADD_CONDITION_TWO:
      return [
        ...state,
        {
          RID: action.RID,
          condition: 2,
          SID: action.SID,
          type: action.typeID,
          value: action.value          
        }
      ]
    case ADD_CONDITION_THREE:
      return [
        ...state,
        {
          RID: action.RID,
          condition: 3,
          distance: action.distance
        }
      ]
    case ADD_CONDITION_FOUR:
      return [
        ...state,    
        {
          RID: action.RID,
          condition: 4,
          interval: action.interval
        }
      ]
    case DEL_CONDITION:
      return state.filter((state) => action.RID != state.RID)
    default:
      return state
  }
}

function ChangeDemoColor(state, action){
  switch(action.type){
    case CHANGE_DEMO_COLOR:
      return action.color
  }
}

function editMode(state, action){
  switch(action.type){
    case EDIT_STATION_MODE:
      return true
    case EDIT_STATION:
      return false
    case CLOSE_STATION_MODAL:
      return false
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
    stations: NewStation(state.stations, action, state.stationName, state.stationLocation),
    stationName: NewStationName(state.stationName, action, state.isEditMode),
    stationLocation: NewStationLocation(state.stationLocation, action),
    rules: NewRule(state.rules, action),
    demoColor: ChangeDemoColor(state.demoColor, action),
    isEditMode: editMode(state.isEditMode, action)
  }
}

