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
  CHANGE_DEMO_COLOR,
  RECEIVE_ALL_ROUTE,
  GET_ROUTE_RID,
  RECEIVE_ONE_ROUTE,
  RECEIVE_BUS_INFO,
  LOAD_ROUTE_INFO } from '../action/NewRoute'
import {
  ADD_STATION,
  DEL_STATION,
  SORT_STATION,
  EDIT_STATION,
  ADD_STATION_NAME,
  DEL_STATION_NAME,
  ADD_STATION_LOCATION,
  EDIT_STATION_MODE, 
  CLOSE_STATION_MODAL,
  GET_SID_ON_GMAP } from '../action/station'
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
  departureLists: { ch: "忠孝復興" },
  destinationLists: { ch: "動物園" },
  colors: ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'],
  stations: [],
  stationName: {},
  stationLocation: { lat: "0", lng: "0" },
  rules: [],
  demoColor: "#FF6900",
  isEditMode: false,
  allRoute: [],
  edit_RID: 0,
  SIDOnGMap: -1, 
  busInfo: []
}

function NewDepartureName(state, action, busInfo){
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
    case RECEIVE_ONE_ROUTE:
      return {
        ...action.json.departureName
      }
    case LOAD_ROUTE_INFO:
      let filterInfo = busInfo.filter(info => info.openDataRID == action.RID)
      return {
        ...filterInfo[0].departure
      }
    default:
      return state
  }
}

function NewDestinationName(state, action, busInfo){
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
    case RECEIVE_ONE_ROUTE:
      return {
        ...action.json.destinationName
      }      
    case LOAD_ROUTE_INFO:
      let filterInfo = busInfo.filter(info => info.openDataRID == action.RID)
      return {
        ...filterInfo[0].destination
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

function NewStation(state, action, stationName, stationLocation, busInfo){
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
    case RECEIVE_ONE_ROUTE:
      return [
        ...action.json.stations
      ]
    case LOAD_ROUTE_INFO:
      let filterInfo = busInfo.filter(info => info.openDataRID == action.RID)
      let stations = []
      // console.log(filterInfo)
      stations = filterInfo[0].station.map((station, index) => {
        return {
          SID: index,
          name: station.name,
          location: station.location
        }
      })
      return [
        ...stations
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

function NewRouteName(state, action, busInfo){
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
    case RECEIVE_ONE_ROUTE:
      return {
        ...action.json.routeName
      }      
    case LOAD_ROUTE_INFO:
      let filterInfo = busInfo.filter(info => info.openDataRID == action.RID)
      return {
        ...filterInfo[0].name
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
    case RECEIVE_ONE_ROUTE:
      return [
        ...action.json.rules
      ]
    default:
      return state
  }
}

function ChangeDemoColor(state, action){
  switch(action.type){
    case CHANGE_DEMO_COLOR:
      return action.color
    case RECEIVE_ONE_ROUTE:
      return action.json.themeColor
    default:
      return state
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

function NewRoute(state, action){
  switch(action.type){
    case RECEIVE_ALL_ROUTE:
      return [
        ...action.json
      ]
    default:
      return state
  }
}

function GetEditRID(state, action){
  switch(action.type){
    case GET_ROUTE_RID:
      return action.RID
    default:
      return state
  }
}

function GetSIDOnGMAP(state, action){
  switch(action.type){
    case GET_SID_ON_GMAP:
      return action.SID
    default:
      return state
  }
}

function GetBusInfo(state, action){
  switch(action.type){
    case RECEIVE_BUS_INFO:
      return action.json
    default:
      return state
  }
}

export default function BusPlayApp(state = initialState, action){
  return {
    nameLists: NewRouteName(state.nameLists, action, state.busInfo),
    departureLists: NewDepartureName(state.departureLists, action, state.busInfo),
    destinationLists: NewDestinationName(state.destinationLists, action, state.busInfo),
    colors: NewColor(state.colors, action),
    stations: NewStation(state.stations, action, state.stationName, state.stationLocation, state.busInfo),
    stationName: NewStationName(state.stationName, action, state.isEditMode),
    stationLocation: NewStationLocation(state.stationLocation, action),
    rules: NewRule(state.rules, action),
    demoColor: ChangeDemoColor(state.demoColor, action),
    isEditMode: editMode(state.isEditMode, action),
    allRoute: NewRoute(state.allRoute, action),
    edit_RID: GetEditRID(state.edit_RID, action),
    SIDOnGMap: GetSIDOnGMAP(state.SIDOnGMap, action),
    busInfo: GetBusInfo(state.busInfo, action)
  }
}

