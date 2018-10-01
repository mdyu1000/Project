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
  UploadStationBroadcaseImg,
} from '../action/station'

import {
  DelCondition,
} from '../action/condition'

const mapDispatchToProps = (dispatch) => {
  return {
    onAddStation: (name, location, infos) => {
      dispatch(AddStation(name, location, infos))
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
    onEditStationMode: (SID, language, name, infos) => {
      dispatch(EditStationMode(SID, language, name, infos))
    },
    onEditStation: (SID, language, name, infos) => {
      dispatch(EditStation(SID, language, name, infos))
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
    UploadStationBroadcaseImg: url => {
      dispatch(UploadStationBroadcaseImg(url))
      // UploadStationBroadcaseImg(url)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    stations: state.stations,
    stationName: state.stationName,
    stationLocation: state.stationLocation,
    stationInfos: state.stationInfos,
    stationInfo: state.stationInfo,
    stationBroadcastImg: state.stationBroadcastImg,
    color: state.demoColor,
    isEditMode: state.isEditMode,
    rules: state.rules,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Station)