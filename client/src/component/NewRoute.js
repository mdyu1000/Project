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

const Title = () => {
  return (
    <Row>
      <Col sm="12">
        <h2 style={titleStyle}>New Route</h2>
      </Col>
    </Row>
  )
}

const InputText = (props) => {
  var offset = 0, MT = 0;
  if(props.offset){
    offset = props.offset;
  }
  if(props.MT){
    MT = props.MT + "rem";
  }

  return (
    <Col sm={{ size: "5", offset: offset}} style={{ marginTop: MT }}>
      <FormGroup>
        <span>{props.title}</span>
        <Input type="text" name={props.route} style={{ height: "1rem" }} />
      </FormGroup>
    </Col>
  )
}

const fontSize = 16;
const sidebarWidthREM = 18;
const paddingLeft = fontSize * sidebarWidthREM;
const rowMargin = 30;

const containerStyle = {
  paddingLeft: paddingLeft + rowMargin + "px",
  paddingRight: "30px",
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
                    <InputText title="Name" name="route" />
                    <ColorPicker onColorChange={this.handleColorChange}/>
                    <InputText title="Departure" name="departure" MT="1"/>
                    <InputText title="Destination" name="destination" offset="1" MT="1"/>
                    <Station color={this.state.color}/>
                    <InputText title="Google Map" name="destination" offset="1" MT="1"/>
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