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
  }
}

const mapStateToProps = (state) => {
  return {
    stations: state.stations,
    stationName: state.stationName,
    stationLocation: state.stationLocation,
    color: state.demoColor,
    isEditMode: state.isEditMode,
    rules: state.rules,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Station)