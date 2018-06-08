import React from 'react';
import { Col, FormGroup, Input } from 'reactstrap';

const NameBadge = (props) => {
  const badge = Object.entries(props.lists).map(([key, value]) => {
    return(
      <span className="badge badge-primary mt-2 ml-2">{value.toString()}</span>
    )
  })

  return(
    <div>{badge}</div>
  )
}

export default class InputText extends React.Component {
	constructor(props){
		super(props);
    console.log(this.props.lists)
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
	      	<div className="input-group-prepend">
	      		<select className="browser-default">
      				<option disabled selected value className="d-none"></option>
	      			<option value="ch">ch</option>
	      			<option value="en">en</option>
	      		</select>
	      	</div>
	      	<Input type="text" name={this.props.name} style={{ height: "1rem" }} />
      		<div className="input-group-append">
						<i className="fa fa-plus my-auto" style={{ cursor: "pointer"}}></i>
	      	</div>
	      </div>
        <NameBadge lists={this.props.lists} />
	    </FormGroup>
		)
	}
}
        // {
        //   this.props.lists.map(list=>(
        //     <span class="badge badge-primary mt-2 ml-2">{list.name}</span>
        //   ))
        // }