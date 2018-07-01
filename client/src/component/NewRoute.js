import React from 'react';
import $ from 'jquery';
import { 
  Container, Row, Col,
  Button, CardTitle, CardText,
  Form, FormGroup, Input, FormText,  } from 'reactstrap';
import NewStation from '../container/NewStation';
import NewRule from '../container/NewRule';
import { TwitterPicker  } from 'react-color';
import ColorPicker from './ColorPicker';
import InputText from './InputText';
import GMap from './GoogleMap';
import { stations, colors, containerStyle } from './Global';
import { Redirect } from 'react-router-dom';
import { matchPath } from 'react-router'

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
    <Row>
      <Col sm="12">
        <h2 style={titleStyle}>New Route</h2>
      </Col>
    </Row>
  )
}

const CardFooter = props => {
  return (
    <div className="card-footer">
      {
        ( props.match != null &&
          <button style={{ paddingTop: "6px", paddingBottom: "6px"}} type="button" 
          class="btn btn-outline-success btn-block" onClick={props.onUpdateRoute}>Update</button> ) 
        || ( 
          props.match == null && 
          <button style={{ paddingTop: "6px", paddingBottom: "6px"}} type="button" 
          class="btn btn-outline-success btn-block" onClick={props.onNewRoute}>Submit</button> ) 
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
  }

  StoreRoute(route) {
    route["route_name"] = this.props.nameLists
    route["departure_name"] = this.props.departureLists
    route["destination_name"] = this.props.destinationLists
    route["theme_color"] = this.props.theme_color
    route["stations"] = []
    route["rules"] = []
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
    let route = {}
    this.StoreRoute(route)
    this.props.onNewRoute(route, this.props.stations, this.props.rules)
    this.setState({
      isRedirect: true
    })
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
                      <GMap stations={this.props.stations}/>
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
      </Container>
    );
  }
}