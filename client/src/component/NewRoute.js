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
import { stations, colors } from './Global';

const Title = () => {
  return (
    <Row>
      <Col sm="12">
        <h2 style={titleStyle}>New Route</h2>
      </Col>
    </Row>
  )
}

const fontSize = 16;
const sidebarWidthREM = 18;
const paddingLeft = fontSize * sidebarWidthREM;
const rowMargin = 30;

const containerStyle = {
  paddingLeft: paddingLeft + rowMargin + "px",
  paddingRight: "30px",
  paddingTop: "56px",
}

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

export default class NewRoute extends React.Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(){
    let route = {}
    route["route_name"] = this.props.nameLists
    route["departure_name"] = this.props.departureLists
    route["destinationLists"] = this.props.destinationLists
    route["theme_color"] = this.props.theme_color
    route["stations"] = []
    route["rules"] = []
    this.props.stations.map(station => {
      route["stations"].push(station.SID)
    })
    this.props.rules.map(rule => {
      route["rules"].push(rule.RID)
    })
    this.props.onNewRoute(route, this.props.stations, this.props.rules)
  }

  render() {
    return (
      <Container fluid style={ containerStyle }>
        <Title />
        <Row>
          <Col sm="12">
            <div className="card">
              <div className="card-header">Route Form</div>
              <div className="card-body">
                <Form>
                  <Row>
                    <div className="col-5">
                      <InputText title="Name" name="route" lists={this.props.nameLists} 
                        onAdd={this.props.onAddName} onDel={this.props.onDelName} />
                    </div>
                    <div className="col-5 offset-1">
                      <ColorPicker colors={this.props.colors} 
                        onColorChange={this.props.onChangeDemoColor} 
                        onAddColor={this.props.onAddColor}  
                        onDelColor={this.props.onDelColor} />
                    </div>
                    <div className="col-5 mt-3">
                      <InputText title="Departure" name="departure" MT="1" lists={this.props.departureLists} 
                        onAdd={this.props.onAddDeparture} onDel={this.props.onDelDeparture} />
                    </div>
                    <div className="col-5 offset-1 mt-3">
                      <InputText title="Destination" name="destination" offset="1" MT="1" lists={this.props.destinationLists} 
                        onAdd={this.props.onAddDestination} onDel={this.props.onDelDestination}/>
                    </div>
                    <div className="col-5 mt-4">
                      <NewStation />
                    </div>
                    <div className="col-5 offset-1 mt-4">                    
                      <GMap stations={this.props.stations}/>
                    </div>
                  </Row>
                  <NewRule />
                </Form>
              </div>
              <div className="card-footer">
                <button style={{ paddingTop: "6px", paddingBottom: "6px"}} type="button" 
                  class="btn btn-outline-success btn-block" onClick={this.handleSubmit}>Submit</button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}