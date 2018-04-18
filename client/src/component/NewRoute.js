import React from 'react';
import { 
  Container, Row, Col,
  Card, Button, CardHeader, CardBody, CardTitle, CardText,
  Form, FormGroup, Input, FormText,  } from 'reactstrap';
import '../JS/jscolor.min.js';
import '../CSS/NewRouter.css';

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

const inputStyle = {
  height: "1rem",
}

const colorPickerStyle = {
  border: "none",
  marginTop: "0.65rem",
  paddingLeft: "0.5rem",
}

const stationStyle = {
  listStyleType: "none",
  width: "100%",
  height: "200px",
  paddingLeft: "20%",
  marginTop: "0.65rem",
  border: "1px solid #ced4da",
  overflowY: "scroll",
  overflowX: "hidden",
}

const timeLineStyle = {
  position: "relative",
  width: "6px",
  backgroundColor: "#a1662c",
  paddingTop: "3rem",
}

const stationTextStyle = {
  width: "400px",
  marginLeft: "2rem",
}

export default class NewRoute extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
    this.testChange = this.testChange.bind(this);
  }

  testChange(){

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
                    <Col sm={{ size: "5", offset: "1"}}>
                      <FormGroup>
                        <span>Color</span><br/>
                        <input className="jscolor" name="color" value="07DBF3" style={colorPickerStyle} />
                      </FormGroup>
                    </Col>
                    <InputText title="Departure" name="departure" MT="1"/>
                    <InputText title="Destination" name="destination" offset="1" MT="1"/>
                    <Col sm={{ size: "5"}} style={{marginTop: "1rem"}}>
                      <FormGroup>
                        <span>Station</span>
                        <ul id="station" style={stationStyle}>
                          <li style={timeLineStyle}><div style={stationTextStyle}>西門站</div></li>
                          <li style={timeLineStyle}><div style={stationTextStyle}>台北車站</div></li>
                          <li style={timeLineStyle}><div style={stationTextStyle}>善導寺站</div></li>
                          <li style={timeLineStyle}><div style={stationTextStyle}>忠孝新生站</div></li>
                          <li style={timeLineStyle}><div style={stationTextStyle}>忠孝復興站</div></li>
                          <li style={timeLineStyle}><div style={stationTextStyle}>忠孝敦化站</div></li>
                          <li style={timeLineStyle}><div style={stationTextStyle}>國父紀念館站</div></li>
                        </ul>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}