import React from 'react'
import { connect } from 'react-redux'
import NewRoute from '../component/NewRoute'
import {
  AddName,
  AddColor,
  AddDeparture,
  AddDestination,
  AddStation,
  AddConditionOne,
  AddConditionTwo,
  AddConditionThree,
  AddConditionFour
} from '../action/NewRoute'

class NewRouteContainer extends React.Component {
  constructor(props){
    super(props);
    // console.log("123123123")
    // console.log(props)
  }

  render(){
    return (
      <div>
        <NewRoute 
          onAddName = {this.props.onAddName}
          onAddDeparture = {this.props.onAddDeparture}
          onAddDestination = {this.props.onAddDestination}
          nameLists = {this.props.nameLists}
          departureLists = {this.props.departureLists}
          destinationLists = {this.props.destinationLists}
        />
      </div>
    )
  }
}

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
    onAddStation: (name, location) => {
      dispatch(AddStation(name, location))
    },
    AddConditionOne: (SID, distance) => {
      dispatch(AddConditionOne(SID, distance))
    },
    AddConditionTwo: (SID, type, value) => {
      dispatch(AddConditionTwo(SID, type, value))
    },
    AddConditionThree: (distance) => {
      dispatch(AddConditionThree(distance))
    },
    AddConditionFour: (interval) => {
      dispatch(AddConditionFour(interval))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    nameLists: state.nameLists,
    departureLists: state.departureLists,
    destinationLists: state.destinationLists,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRouteContainer)