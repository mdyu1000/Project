import React from 'react';
import { Col, FormGroup, Input } from 'reactstrap';

const Bages = (props) => {
	return(
		<div>
			{ props.lists }
		</div>
	)
}

export default class InputText extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
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
		      <span>{this.props.title}</span>
		      <div className="input-group mt-2">
		      	<div class="input-group-prepend">
		      		<select className="browser-default" id="languageType">
	      				<option disabled selected value className="d-none"></option>
		      			<option value="ch">ch</option>
		      			<option value="en">en</option>
		      		</select>
		      	</div>
		      	<Input type="text" name={this.props.name} style={{ height: "1rem" }} />
	      		<div class="input-group-append">
							<i class="fa fa-plus my-auto" style={{ cursor: "pointer"}}></i>
		      	</div>
		      </div>
		      {
		      	this.props.lists.map(list=>(
		      		<span class="badge badge-primary mt-2 ml-2">{list.value}</span>
	      		))
		      }
		    </FormGroup>
		  </Col>
		)
	}
}