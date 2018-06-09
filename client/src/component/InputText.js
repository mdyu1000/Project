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
    
	}

  handleClickAdd = () => {
    var e = document.getElementById(this.props.name + "Language")
    var language = e.options[e.selectedIndex].value
    var name = document.getElementById(this.props.name + "Name").value
    this.props.onAdd(language, name)
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
	      		<select id={this.props.name + "Language"} className="browser-default">
      				<option disabled selected value className="d-none"></option>
	      			<option value="ch">ch</option>
	      			<option value="en">en</option>
	      		</select>
	      	</div>
	      	<Input type="text" id={this.props.name + "Name"} name={this.props.name} style={{ height: "1rem" }} />
      		<div className="input-group-append">
						<i className="fa fa-plus my-auto" style={{ cursor: "pointer"}} onClick={this.handleClickAdd}></i>
	      	</div>
	      </div>
        <NameBadge lists={this.props.lists} />
	    </FormGroup>
		)
	}
}