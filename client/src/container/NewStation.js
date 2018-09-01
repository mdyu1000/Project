import { connect } from 'react-redux'
import Station from '../component/Station'
import {
  AddStation,
  AddStationName,
  AddStationLocation,
  DelStation,
  DelStationName,
  SortStation,
  EditStation,
  EditStationMode,
  CloseStationModal,
  GetSIDOnGMap,
  SetStationSpotIcon,
  AddStationSpotName,
  DelStationSpotName,
  AddStationSpot,
  DelStationSpot,
} from '../action/station'

import {
  DelCondition,
} from '../action/condition'

const mapDispatchToProps = (dispatch) => {
  return {
    onAddStation: (name, location) => {
      dispatch(AddStation(name, location))
    },
    onAddStationName: (language, name) => {
      dispatch(AddStationName(language, name))
    },
    onAddStationLocation: (lat, lns) => {
      dispatch(AddStationLocation(lat, lns))
    },
    onDelStation: (index) => {
      dispatch(DelStation(index))
    },
    onDelStationName: (language) => {
      dispatch(DelStationName(language))
    },
    onSortStation: (station) => {
      dispatch(SortStation(station))
    },
    onEditStationMode: (SID, language, name) => {
      dispatch(EditStationMode(SID, language, name))
    },
    onEditStation: (SID, language, name) => {
      dispatch(EditStation(SID, language, name))
    },
    onCloseStationModal: () => {
      dispatch(CloseStationModal())
    },
    GetSIDOnGMap: (SID) => {
      dispatch(GetSIDOnGMap(SID))
    },
    onDelCondition: (RID) => {
      dispatch(DelCondition(RID))
    },  
    SetStationSpotIcon: icon => {
      dispatch(SetStationSpotIcon(icon))
    },
    AddStationSpotName: (language, name) => {
      dispatch(AddStationSpotName(language, name))
    },
    DelStationSpotName: language => {
      dispatch(DelStationSpotName(language))
    },
    AddStationSpot: (icon, name) => {
      dispatch(AddStationSpot(icon, name))
    },
    DelStationSpot: spotId => {
      dispatch(DelStationSpot(spotId))
    },
  }
}

const mapStateToProps = (state) => {
  return {
    stations: state.stations,
    stationName: state.stationName,
    stationLocation: state.stationLocation,
    stationInfos: state.stationInfos,
    stationInfo: state.stationInfo,
    color: state.demoColor,
    isEditMode: state.isEditMode,
    rules: state.rules,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Station)