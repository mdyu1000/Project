import React from 'react'
import { connect } from 'react-redux'
import Station from '../component/Station'
import {
  AddStation,
  AddStationName,
  AddStationLocation,
  DelStation,
  DelStationName,
  SortStation,
} from '../action/station'

class NewStation extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <Station  
        onAddStation = {this.props.onAddStation}
        onAddStationName = {this.props.onAddStationName}
        onAddStationLocation = {this.props.onAddStationLocation}
        onDelStation = {this.props.onDelStation}
        onDelStationName = {this.props.onDelStationName}
        onSortStation = {this.props.onSortStation}
        onChangeDemoColor = {this.props.onChangeDemoColor}
        stations = {this.props.stations}
        stationName = {this.props.stationName}
        stationLocation = {this.props.stationLocation}
        color = {this.props.color}
      />
    );
  }
}

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
  }
}

const mapStateToProps = (state) => {
  return {
    stations: state.stations,
    stationName: state.stationName,
    stationLocation: state.stationLocation,
    color: state.demoColor
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStation)