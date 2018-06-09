import React from 'react';
import $ from 'jquery';
import { 
  Container, Row, Col,
  Card, Button, CardHeader, CardBody, CardTitle, CardText,
  Form, FormGroup, Input, FormText,  } from 'reactstrap';
import Station from './Station';
import { TwitterPicker  } from 'react-color';
import ColorPicker from './ColorPicker';
import Condition from './Condition';
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
    this.state = {
      color: "#a1662c",
    }
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleAddStation = this.handleAddStation.bind(this);
    this.handleSortStation = this.handleSortStation.bind(this);
  }

  handleSortStation(NewSort){
    this.setState({
      stations: NewSort
    })
  }

  handleAddStation(NewStation){
    this.setState({
      stations: [...this.props.stations, NewStation],
    })
  }

  handleColorChange(NewColor){
    this.setState({
      color: NewColor,
    })
  }


  render() {
    return (
      <Container fluid style={ containerStyle }>
        <Title />
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>Route Form</CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <div className="col-5">
                      <InputText title="Name" name="route" lists={this.props.nameLists} onAdd={this.props.onAddName} />
                    </div>
                    <div className="col-5 offset-1">
                      <ColorPicker colors={this.props.colors} onColorChange={this.handleColorChange} onAddColor={this.props.onAddColor}/>
                    </div>
                    <div className="col-5 mt-3">
                      <InputText title="Departure" name="departure" MT="1" 
                        lists={this.props.departureLists} onAdd={this.props.onAddDeparture} />
                    </div>
                    <div className="col-5 offset-1 mt-3">
                      <InputText title="Destination" name="destination" offset="1" MT="1" 
                        lists={this.props.destinationLists} onAdd={this.props.onAddDestination}/>
                    </div>
                    <div className="col-5 mt-4">
                      <Station color={this.state.color} onAdd={this.handleAddStation} stations={this.props.stations}
                        onSortStation={this.handleSortStation}/>
                    </div>
                    <div className="col-5 offset-1 mt-4">                    
                      <GMap stations={this.props.stations}/>
                    </div>
                  </Row>
                  <Condition color={this.state.color}/>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}