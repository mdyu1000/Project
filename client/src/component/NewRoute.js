import React from 'react';
import { 
  Container, Row, Col,
  Card, Button, CardHeader, CardBody, CardTitle, CardText,
  Form, FormGroup, Label, Input, FormText,  } from 'reactstrap';

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

const containerStyle={
  paddingLeft: paddingLeft + rowMargin + "px",
  paddingRight: "30px",
}

const titleStyle={
  marginTop: "2rem",
  marginBottom: "1.5rem",
  borderBottom: "1px solid #eee",
  paddingBottom: "1rem",
}

const inputStyle={
  height: "1rem",
}

export default class NewRoute extends React.Component {
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
                        <span>Color</span>
                        <Input type="select" name="color">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <InputText title="Departure" name="departure" MT="1"/>
                    <InputText title="Destination" name="destination" offset="1" MT="1"/>
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