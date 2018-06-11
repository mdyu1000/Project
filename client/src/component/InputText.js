import React from 'react';
import { Col, FormGroup, Input } from 'reactstrap';

const languageSeleteStyle = {
  background: "#6c757d",
  opacity: ".3",
  color: "white",
  borderRadius: "5px",
  paddingLeft: ".5rem",
  paddingRight: ".5rem",
}

const badgeStyle = {
  boxShadow: "none",
  backgroundColor: "#e8e8e8"
}

const NameBadge = (props) => {
  const badge = Object.entries(props.lists).map(([key, value]) => {
    return(
      <span className="badge mt-2 ml-2" style={ badgeStyle }>
        {key.toString() + " | "}
        {value.toString()}
        <i language={key} style={{ cursor: "pointer", color: "rgba(0, 0, 0, .2)"}} 
          class="fa fa-remove my-auto ml-1" onClick={props.onDel}></i>
      </span>
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

  handleClickDel = (e) => {
    var language = e.target.getAttribute("language")
    this.props.onDel(language)
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
	      		<select style={ languageSeleteStyle } id={this.props.name + "Language"} className="browser-default mt-2">
      				<option disabled selected value className="d-none p-3"></option>
	      			<option value="ch" className="m-5">Chinese</option>
	      			<option value="en" className="m-3">English</option>
              <option value="kr" className="m-3">Korea</option>
              <option value="jp" className="m-3">Japan</option>
            </select>
	      	</div>
	      	<Input type="text" id={this.props.name + "Name"} name={this.props.name} style={{ height: "1rem" }} />
      		<div className="input-group-append">
						<i className="fa fa-plus my-auto" style={{ cursor: "pointer"}} onClick={this.handleClickAdd}></i>
	      	</div>
	      </div>
        <NameBadge lists={this.props.lists} onDel={this.handleClickDel}/>
	    </FormGroup>
		)
	}
}