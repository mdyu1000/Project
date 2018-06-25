import React from 'react'
import { connect } from 'react-redux'
import NewRoute from '../component/NewRoute'
import {
  AddName,
  AddColor,
  AddDeparture,
  AddDestination,
  DelName,
  DelColor,
  DelDeparture,
  DelDestination,
  ChangeDemoColor,
} from '../action/newRoute'

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
    onDelName: (language) => {
      dispatch(DelName(language))
    },
    onDelColor: (color) => {
      dispatch(DelColor(color))
    },
    onDelDeparture: (language) => {
      dispatch(DelDeparture(language))
    },
    onDelDestination: (language) => {
      dispatch(DelDestination(language))
    },
    onChangeDemoColor: (color) => {
      dispatch(ChangeDemoColor(color))
    }        
  }
}

const mapStateToProps = (state) => {
  return {
    nameLists: state.nameLists,
    departureLists: state.departureLists,
    destinationLists: state.destinationLists,
    colors: state.colors,
    stations: state.stations,
    rules: state.rules,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRoute)