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
  AddRoute,
  UpdateRoute,
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
    },
    onNewRoute: (route, station, rule) => {
      dispatch(AddRoute(route, station, rule))
    },
    UpdateRoute: (RID, route) => {
      dispatch(UpdateRoute(RID, route))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    nameLists: state.nameLists,
    departureLists: state.departureLists,
    destinationLists: state.destinationLists,
    colors: state.colors,
    theme_color: state.demoColor,
    stations: state.stations,
    rules: state.rules,
    SIDOnGMap: state.SIDOnGMap,
    isEditMode: state.isEditMode,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRoute)