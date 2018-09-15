import React from 'react'
import { 
  Container, Row, Col,
  Form, FormText } from 'reactstrap'
import NewStation from '../container/NewStation'
import NewRule from '../container/NewRule'
import ColorPicker from './ColorPicker'
import InputText from './InputText'
import GMap from './GoogleMap'
import { containerStyle, marquee } from './Global'
import { Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import BusInfo from './BusInfo'

const titleStyle = {
  marginTop: "2rem",
  marginBottom: "1.5rem",
  borderBottom: "1px solid #eee",
  paddingBottom: "1rem",
}

const colorPickerStyle = {
  border: "none",
  marginTop: "0.65rem",
  paddingLeft: "0.5rem",
}

const Title = () => {
  return (
    <div className="row">
      <div className="col-10">
        <h2 style={titleStyle}>New Route</h2>
      </div>
      <div className="col-2 my-auto">
        <div className="text-center">
          <button type="button" className="btn btn-success" style={{borderRadius: "50px"}} data-toggle="modal" data-target="#exampleModal">
            Load Bus File
          </button>
        </div>
      </div>
    </div>
  )
}

const CardFooter = props => {
  return (
    <div className="card-footer">
      {
        ( props.match != null &&
          <button style={{ paddingTop: "6px", paddingBottom: "6px"}} type="button" 
          className="btn btn-outline-success btn-block" onClick={props.onUpdateRoute}>Update</button> ) 
        || ( 
          props.match == null && 
          <button style={{ paddingTop: "6px", paddingBottom: "6px"}} type="button" 
          className="btn btn-outline-success btn-block" onClick={props.onNewRoute}>Submit</button> ) 
      }
    </div>
  )
}

export default class NewRoute extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isRedirect: false,
      match: matchPath(window.location.pathname, {
        path: '/UpdateRoute/:RID',
        exact: true,
        strict: false
      })
    }
    this.handleNewRoute = this.handleNewRoute.bind(this)
    this.handleUpdateRoute = this.handleUpdateRoute.bind(this)
    this.StoreRoute = this.StoreRoute.bind(this)
    this.checkStationLanguage = this.checkStationLanguage.bind(this)
    this.checkDepartureAndDestinationField = this.checkDepartureAndDestinationField.bind(this)
  }

  checkStationLanguage(stations){
    // for(var i = 0; i <)
  }

  checkDepartureAndDestinationField(route){
    /* 比較起點的欄位是否跟終點一致 */
    for(var key in route.departure_name){
      if(!route.destination_name.hasOwnProperty(key)){
        return false
      }
    }

    /* 比較終點的欄位是否跟起點一致 */
    for(var key in route.destination_name){
      if(!route.departure_name.hasOwnProperty(key)){
        return false
      }
    }
  }

  StoreRoute(route) {
    route["routeName"] = this.props.nameLists
    route["departureName"] = this.props.departureLists
    route["destinationName"] = this.props.destinationLists
    route["themeColor"] = this.props.theme_color
    route["stations"] = []
    route["rules"] = []
    route["marquee"] = [marquee[Math.floor((Math.random() * 8))], marquee[Math.floor((Math.random() * 8))]]
    this.props.stations.map(station => {
      route["stations"].push(station)
    })
    this.props.rules.map(rule => {
      route["rules"].push(rule)
    })
  }

  handleUpdateRoute() {
    let route = {}
    this.StoreRoute(route)
    this.props.UpdateRoute(this.state.match.params.RID, route)
    this.setState({
      isRedirect: true
    })
  }

  handleNewRoute(){
    if(this.props.nameLists.ch == null){
      alert("Chinese route name is necessary")
    }
    else if(this.props.departureLists.ch == null){
      alert("Chinese departure name is necessary")
    }
    else if(this.props.destinationLists.ch == null){
      alert("Chinese destination name is necessary")
    }
    else if(this.props.stations.length == 0){
      alert("Station is empty")
    }
    else{
      let route = {}
      let isFieldsEqual = true

      this.StoreRoute(route)

      isFieldsEqual = this.checkDepartureAndDestinationField(route)
      console.log("isFieldsEqual", this.checkDepartureAndDestinationField(route))

      // for(var i = 0; i < route.stations.length; i++){
      //   let item = route.stations[i]
      //   if(item.name.hasOwnProperty("ch") && item.name.hasOwnProperty("en"))
      // }

      if(isFieldsEqual){
        this.props.onNewRoute(route, this.props.stations, this.props.rules)
        this.setState({
          isRedirect: true
        })
      }else if(!isFieldsEqual){
        alert("The departure and destination language fields must be equal")
      }
    }
  }

  render() {
    if (this.state.isRedirect) {
      return <Redirect push to="/" />; //or <Redirect push to="/?a=xxx&b=yyy" /> 传递更多参数
    }

    return (
      <Container fluid style={ containerStyle }>
        <Title />
        <Row>
          <Col sm="12">
            <div className="card">
              <div className="card-header">Route Form</div>
              <div className="card-body pb-1">
                <Form>
                  <Row>
                    <div className="col-5">
                      <InputText title="Name" name="route" lists={this.props.nameLists} 
                        onAdd={this.props.onAddName} 
                        onDel={this.props.onDelName} />
                    </div>
                    <div className="col-5 offset-1">
                      <ColorPicker colors={this.props.colors} 
                        onColorChange={this.props.onChangeDemoColor} 
                        onAddColor={this.props.onAddColor}  
                        onDelColor={this.props.onDelColor} />
                    </div>
                    <div className="col-5 mt-3">
                      <InputText title="Departure" name="departure" MT="1" lists={this.props.departureLists} 
                        onAdd={this.props.onAddDeparture} 
                        onDel={this.props.onDelDeparture} />
                    </div>
                    <div className="col-5 offset-1 mt-3">
                      <InputText title="Destination" name="destination" offset="1" MT="1" lists={this.props.destinationLists} 
                        onAdd={this.props.onAddDestination} 
                        onDel={this.props.onDelDestination} />
                    </div>
                    <div className="col-5 mt-4">
                      <NewStation />
                    </div>
                    <div className="col-5 offset-1 mt-4">                    
                      <GMap stations={this.props.stations}
                        SIDOnGMap={this.props.SIDOnGMap}/>
                    </div>
                  </Row>
                  <NewRule  />
                </Form>
              </div>
              <CardFooter match={this.state.match} 
                onNewRoute={this.handleNewRoute}  
                onUpdateRoute={this.handleUpdateRoute} />
            </div>
          </Col>
        </Row>
        <BusInfo 
          busInfo={this.props.busInfo}
          loadRouteInfo={this.props.loadRouteInfo}
        />
      </Container>
    );
  }
}