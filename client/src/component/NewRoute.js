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
          className="btn btn-outline-success btn-block" onClick={() => props.setRoute("update")}>Update</button> ) 
        || ( 
          props.match == null && 
          <button style={{ paddingTop: "6px", paddingBottom: "6px"}} type="button" 
          className="btn btn-outline-success btn-block" onClick={() => props.setRoute("create")}>Submit</button> ) 
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
    this.setRoute = this.setRoute.bind(this)
    this.StoreRoute = this.StoreRoute.bind(this)
    this.checkStationLanguage = this.checkStationLanguage.bind(this)
    this.checkDepartureAndDestinationField = this.checkDepartureAndDestinationField.bind(this)
  }

  checkStationLanguage(stations){
    let invalidStationName = []
    for(var i = 0; i < stations.length; i++){
      let name = stations[i].name
      if(!name.hasOwnProperty("ch") || !name.hasOwnProperty("en") || name.ch == null || name.en == null){
        invalidStationName.push(name.ch)
      }
    }
    return invalidStationName
  }

  checkDepartureAndDestinationField(route){
    /* 比較起點的欄位是否跟終點一致 */
    for(var key in route.departureName){
      if(!route.destinationName.hasOwnProperty(key)){
        return false
      }
    }
    /* 比較終點的欄位是否跟起點一致 */
    for(var key in route.destinationName){
      if(!route.departureName.hasOwnProperty(key)){
        return false
      }
    }
    return true
  }

  StoreRoute(route, type) {
    if(type == "create"){
      if(this.props.allRoute.length == 0){
        route["RID"] = 1
      }
      else{
        let maxRID = Math.max.apply(Math, this.props.allRoute.map(item => item.RID))
        route["RID"] = maxRID + 1
      }
    }else if(type == "update"){
      route["RID"] = this.state.match.params.RID
    }
    route["routeName"] = this.props.nameLists
    route["departureName"] = this.props.departureLists
    route["destinationName"] = this.props.destinationLists
    route["themeColor"] = this.props.theme_color
    route["stations"] = {}
    route.stations["go"] = []
    route.stations["back"] = []
    route["rules"] = []
    route["marquee"] = [marquee[Math.floor((Math.random() * 8))], marquee[Math.floor((Math.random() * 8))]]
    this.props.stations.go.map(station => {
      route.stations.go.push(station)
      route.stations.back.unshift(station)
    })
    this.props.rules.map(rule => {
      route["rules"].push(rule)
    })
  }

  setRoute(type){
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
      let isFieldsEqual = false
      let invalidStation = []

      this.StoreRoute(route, type)
      isFieldsEqual = this.checkDepartureAndDestinationField(route)
      invalidStation = this.checkStationLanguage(route.stations.go)

      if(isFieldsEqual && invalidStation.length == 0){
        if(type === "update"){
          this.props.UpdateRoute(this.state.match.params.RID, route)
        }else if(type === "create"){
          this.props.onNewRoute(route, this.props.stations, this.props.rules)
        }

        this.props.SetSimulator(route)

        this.setState({
          isRedirect: true
        })

      }
      else if(!isFieldsEqual){
        alert("The departure and destination language fields must be equal")
      }
      /* 列出缺少語言欄位站點 */
      else if(invalidStation.length != 0){
        let alertMsg = ""
        for(var i = 0; i < invalidStation.length; i++){
          alertMsg += invalidStation[i] + ' '
        }
        alertMsg += "language fields must be equal"
        alert(alertMsg)
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
                setRoute={this.setRoute}  
              />
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