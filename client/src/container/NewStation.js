import React from 'react'
import { connect } from 'react-redux'
import Station from '../component/Station'
import {
  AddStation,
  AddStationName,
  AddStationLocation
} from '../action/NewRoute'

class NewStation extends React.Component {
  constructor(props){
    super(props)
    console.log("123123123")
    console.log(props)
  }


  render() {
    return (
      <Station  
        onAddStation = {this.props.onAddStation}
        onAddStationName = {this.props.onAddStationName}
        onAddStationLocation = {this.props.onAddStationLocation}
        onSortStation={this.props.handleSortStation}
        stations = {this.props.stations}
        name = {this.props.name}
        location = {this.props.location}
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
    onAddStationName: (name) => {
      dispatch(AddStationName(name))
    },
    onAddStationLocation: (lat, lns) => {
      dispatch(AddStationLocation(lat, lns))
    },
  }
}

const mapStateToProps = (state) => {

  return {
    stations: state.stations,
    name: state.stationName,
    location: state.stationLocation,
    color: "#111",
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStation)