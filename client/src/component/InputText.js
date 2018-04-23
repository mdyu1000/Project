import React from 'react';
import { Col, FormGroup, Input } from 'reactstrap';

export default class InputText extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
	  let offset = 0, MT = 0;
	  if(this.props.offset){
	    offset = this.props.offset;
	  }
	  if(this.props.MT){
	    MT = this.props.MT + "rem";
	  }

		return(
		  <Col sm={{ size: "5", offset: offset}} style={{ marginTop: MT }}>
		    <FormGroup>
		      <span>{this.props.title} <i class="fa fa-exchange mx-1"></i></span>
		      <Input type="text" name={this.props.name} style={{ height: "1rem" }} />
		    </FormGroup>
		  </Col>
		)
	}
}