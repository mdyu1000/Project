import React from 'react';
import { Col, FormGroup } from 'reactstrap';
import { TwitterPicker  } from 'react-color';

export default class ColorPicker extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	render() {
		return(
      <Col sm={{ size: "5", offset: "1"}}>
        <FormGroup>
          <span>Color</span><br/>
          <TwitterPicker triangle="hide" className="mx-auto mt-2" onChange={this.handleColorChange}/>
        </FormGroup>
      </Col>
		)
	}
}