import React from 'react';
import { Col, FormGroup, Input } from 'reactstrap';

const nameBadge = (props) =>{

}

export default class InputText extends React.Component {
	constructor(props){
		super(props);
    console.log("123123123")
    console.log(props)
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
	    <FormGroup>
	      <span>{this.props.title}</span>
	      <div className="input-group mt-2">
	      	<div class="input-group-prepend">
	      		<select className="browser-default">
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
	    </FormGroup>
		)
	}
}
        // {
        //   this.props.lists.map(list=>(
        //     <span class="badge badge-primary mt-2 ml-2">{list.name}</span>
        //   ))
        // }