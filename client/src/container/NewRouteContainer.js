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
  AddRoute,
  UpdateRoute,
  loadRouteInfo,
  initState,
  SetSimulator,
  FetchOneRoute,
} from '../action/NewRoute'

class NewRouteContainer extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    let RID = this.props.match.params.RID
    
    if(RID != undefined) {
      this.props.FetchOneRoute(RID)
    }
  }

  componentDidMount(){
    if(this.props.location.pathname == "/NewRoute"){
      this.props.initState()
    }
  }

  render(){
    return (
      <NewRoute
        allRoute={this.props.allRoute}
        nameLists={this.props.nameLists}
        departureLists={this.props.departureLists}
        destinationLists={this.props.destinationLists}
        colors={this.props.colors}
        theme_color={this.props.theme_color} 
        stations={this.props.stations}
        rules={this.props.rules}
        SIDOnGMap={this.props.SIDOnGMap}
        isEditMode={this.props.isEditMode}
        busInfo={this.props.busInfo}
        marquee={this.props.marquee}

        onAddName={this.props.onAddName}
        onAddColor={this.props.onAddColor}
        onAddDeparture={this.props.onAddDeparture}
        onAddDestination={this.props.onAddDestination}
        onDelName={this.props.onDelName}
        onDelColor={this.props.onDelColor}
        onDelDeparture={this.props.onDelDeparture}
        onDelDestination={this.props.onDelDestination}
        onChangeDemoColor={this.props.onChangeDemoColor}
        onNewRoute={this.props.onNewRoute}
        UpdateRoute={this.props.UpdateRoute}
        loadRouteInfo={this.props.loadRouteInfo}
        SetSimulator={this.props.SetSimulator}
      />
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
    },
    loadRouteInfo: (RID) => {
      dispatch(loadRouteInfo(RID))
    },
    initState: () => {
      dispatch(initState())
    },
    SetSimulator: (route) => {
      dispatch(SetSimulator(route))
    },
    FetchOneRoute: RID => {
      dispatch(FetchOneRoute(RID))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    allRoute: state.allRoute,
    nameLists: state.nameLists,
    departureLists: state.departureLists,
    destinationLists: state.destinationLists,
    colors: state.colors,
    theme_color: state.demoColor,
    stations: state.stations,
    rules: state.rules,
    SIDOnGMap: state.SIDOnGMap,
    isEditMode: state.isEditMode,
    busInfo: state.busInfo,
    marquee: state.marquee,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRouteContainer)