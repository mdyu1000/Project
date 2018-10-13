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
  LOAD_ROUTE_INFO,
  INIT_STATE 
} from '../action/NewRoute'
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
  GET_SID_ON_GMAP,
  SET_STATION_SPOT_ICON,
  ADD_STATION_SPOT_NAME,
  DEL_STATION_SPOT_NAME,
  ADD_STATION_SPOT,
  DEL_STATION_SPOT, 
} from '../action/station'
import {
  DEL_CONDITION,
  ADD_CONDITION_TITLE,
  DEL_CONDITION_TITLE,
  RECEIVE_BROADCAST_IMG,
  ADD_CONDITION_1,
  ADD_CONDITION_2,
  ADD_CONDITION_3,  
} from '../action/condition'
import {
  ADD_MARQUEE,
  DEL_MARQUEE,
  SET_MARQUEE
} from '../action/marquee'
import { stationInfos } from '../component/Global'
import _ from 'lodash';

const initialState = {
  nameLists: { en: "NTUT", ch: "北科大" },
  departureLists: { ch: "復興肛" },
  destinationLists: { ch: "動物園" },
  colors: ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'],
  stations: {
    go: [],
    back: [],
  },
  stationName: {},
  stationLocation: { lat: "0", lng: "0" },
  stationInfos: stationInfos,
  stationInfo: {icon: "question"},
  // stationInfo: { en: "Mr. Brown Cafe", ch: "伯朗咖啡科大店", icon: "question"},
  rules: [],
  rule: {
    title: {},
    content: {},
    img: ""
  },
  demoColor: "#FF6900",
  isEditMode: false,
  allRoute: null,
  edit_RID: 0,
  SIDOnGMap: -1, 
  busInfo: [],
  marquee: []
}

var maxRulesID = 0

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
    case INIT_STATE:
      return {
        ...initialState.departureLists
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
    case INIT_STATE:
      return {
        ...initialState.destinationLists
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
    case INIT_STATE:
      return {
        ...initialState.colors
      }
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
      return {
        go: [
          ...state.go,
          {
            SID: isNaN(Math.max.apply(Math, state.go.map(item => item.SID))) ? 1 : Math.max.apply(Math, state.go.map(item => item.SID)) + 1,
            name: action.name,  
            location: action.location,
            info: action.infos
          } 
        ],
      }
    case DEL_STATION:
      return {
        go: state.go.filter(state => action.SID != state.SID),
      }
    case SORT_STATION:
      return {
        go: action.station,
      }
    case EDIT_STATION:
      Object.entries(stationName).map(([key, value]) => {
        delete stationName[key]
      })
      Object.entries(stationLocation).map(([key, value]) => {
        stationLocation[key] = 0
      }) 
      return {
        go: state.go.map(item => {
          if(action.SID != item.SID){
            return item
          }else{
            return {
              SID: Number(action.SID),
              name: action.name,
              location: action.location,
              info: action.infos
            }
          }
        }),
      }

    case CLOSE_STATION_MODAL:
      Object.entries(stationName).map(([key, value]) => {
        delete stationName[key]
      })
      Object.entries(stationLocation).map(([key, value]) => {
        stationLocation[key] = 0
      })
      return {
        ...state
      }
    case RECEIVE_ONE_ROUTE:
      return {
        go: [...action.json.stations.go]
      }
    case LOAD_ROUTE_INFO:
      let filterInfo = busInfo.filter(info => info.openDataRID == action.RID)
      let stations = []
      stations = filterInfo[0].station.map((station, index) => {
        return {
          SID: station.openDataSID,
          name: station.name,
          location: station.location,
          info: {
            spot: []
          }
        }
      })

      return {
        go: [...stations]
      }

    case INIT_STATE:
      return {
        go: [...initialState.stations]
      }
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
    case INIT_STATE:
      return {
        ...initialState.stationName
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
    case INIT_STATE:
      return {
        ...initialState.stationLocation
      }
    default:
      return state   
  }
}

function NewStationInfos(state, action){
  switch(action.type){
    case ADD_STATION_SPOT:
      return {
        ...state,
        spot: [
          {
            spotId: state.spot.length == 0 ? 0 : state.spot.length,
            name: action.name,
            icon: action.icon
          },
          ...state.spot
        ]
      }
    case DEL_STATION_SPOT:
      let tmp = state.spot.filter(item => action.spotId != item.spotId)
      return {
        ...state,
        spot: [
          ...tmp
        ]
      }
    case EDIT_STATION_MODE:
      return {
        ...action.infos
      }
    case INIT_STATE:
      return {
        ...initialState.stationInfos
      }
    case EDIT_STATION:
      return {
        spot: []
      }
    case ADD_STATION:
      return {
        spot: []
      }
    default:
      return state
  }
}

function NewStationInfo(state, action){
  switch(action.type){
    case SET_STATION_SPOT_ICON:
      return {
        ...state,
        icon: action.icon
      }
    case ADD_STATION_SPOT_NAME:
      state[action.language] = action.name
      return {
        ...state,
      } 
    case DEL_STATION_SPOT_NAME:
      delete state[action.language]
      return {
        ...state,
      }
    case ADD_STATION_SPOT:
      return {icon: "question"}
    case INIT_STATE:
      return {
        ...initialState.stationInfo
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
    case INIT_STATE:
      return {
        ...initialState.nameLists
      }
    default:
      return state
  }
}

function NewRule(state, action){
  switch(action.type){
    case ADD_CONDITION_TITLE:
      state.title[action.language] = action.title
      return {
        ...state,
      }
    case DEL_CONDITION_TITLE:
      delete state.title[action.language]
      return {
        ...state
      }
    case RECEIVE_BROADCAST_IMG:
      return {
        ...state,
        img: action.data.isChecked ? action.data.url : null
      }
    case ADD_CONDITION_1:
    case ADD_CONDITION_2:
    case ADD_CONDITION_3:
      return {
        ...state,
        title: {},
        image: {}
      } 
    default:
      return state
  }
}

function NewRules(state, action){
  switch(action.type){
    case DEL_CONDITION:
      return state.filter((state) => action.RID != state.RID)
    case RECEIVE_ONE_ROUTE:
      return [
        ...action.json.rules
      ]
    case INIT_STATE:
      return [
        ...initialState.rules
      ]
    case ADD_CONDITION_1: 
      maxRulesID = GetMaxId(state)
      return [
        ...state,
        {
          condition: 1,
          SID: action.SID,
          distance: action.distance,
          content: action.content,
          RID: maxRulesID
        }
      ]
    case ADD_CONDITION_2:
      maxRulesID = GetMaxId(state)
      return [
        ...state,
        {
          condition: 2,
          distance: action.distance,
          content: action.content,
          RID: maxRulesID
        }
      ]
    case ADD_CONDITION_3:
      maxRulesID = GetMaxId(state)
      return [
        ...state,
        {
          condition: 3,
          interval: action.interval,
          content: action.content,
          RID: maxRulesID
        }
      ]
    default:
      return state
  }
}

function GetMaxId(array){
  if(array.length == 0){
    return 1
  }else {
    return Math.max.apply(Math, array.map(item => item.RID)) + 1
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

function NewMarquee(state, action){
  switch(action.type){
    case ADD_MARQUEE:
      return [
        ...state,
        {
          ID: Number.isInteger(Math.max.apply(Math, state.map(item => item.ID))) ? Math.max.apply(Math, state.map(item => item.ID)) + 1 : 1,
          content: ""
        }
      ]
    case DEL_MARQUEE:
      let filterMarquee = state.filter(info => info.ID != action.ID)
      return [
        ...filterMarquee
      ]
    case SET_MARQUEE:
      let filterMarquee2 = state.filter(item => item.ID == action.ID)
      filterMarquee2[0].content = action.content //copy by value, not reference
      return [
        ...state
      ]
    case RECEIVE_ONE_ROUTE:
      return [
        ...action.json.marquee
      ]
    case INIT_STATE:
      return []
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
    stationInfos: NewStationInfos(state.stationInfos, action),
    stationInfo: NewStationInfo(state.stationInfo, action),
    rule: NewRule(state.rule, action),
    rules: NewRules(state.rules, action),
    demoColor: ChangeDemoColor(state.demoColor, action),
    isEditMode: editMode(state.isEditMode, action),
    allRoute: NewRoute(state.allRoute, action),
    edit_RID: GetEditRID(state.edit_RID, action),
    SIDOnGMap: GetSIDOnGMAP(state.SIDOnGMap, action),
    busInfo: GetBusInfo(state.busInfo, action),
    marquee: NewMarquee(state.marquee, action)
  }
}

