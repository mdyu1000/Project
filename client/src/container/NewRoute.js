import React from 'react'
import { connect } from 'react-redux'
import NewRoute from '../component/NewRoute'
import {
  AddName,
  AddColor,
  AddDeparture,
  AddDestination,
} from '../action/NewRoute'

const mapDispatchToProps = (dispatch) => {
  return {
    onAddName: (language, name) => {
      dispatch(AddName(language, name))
    },
    onAddColor: (color) => {
      dispatch(AddColor(color))
    },
    onAddDeparture: (language, name) => {
      dispatch(AddDeparture(language, name))
    },
    onAddDestination: (language, name) => {
      dispatch(AddDestination(language, name))
    },
  }
}

const mapStateToProps = (state) => {
  return {
    nameLists: state.nameLists,
    departureLists: state.departureLists,
    destinationLists: state.destinationLists,
    colors: state.colors,
    stations: state.stations
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRoute)