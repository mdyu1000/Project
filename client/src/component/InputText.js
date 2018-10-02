import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import { badgeStyle } from './Global'


const languageSeleteStyle = {
  background: "#808080",
  opacity: ".3",
  color: "white",
  paddingLeft: ".5rem",
  paddingRight: ".5rem",
}

const NameBadge = (props) => {
  let editModeBadge
  let badge
  try{
    badge = Object.entries(props.lists).map(([key, value]) => {
      if(value != null){
        return(
          <span key={key + '-' + value} className="badge mt-2 ml-2 rounded" style={ badgeStyle }>
            {key.toString() + " | "}
            {value.toString()}
            <i language={key} style={{ cursor: "pointer", color: "rgba(0, 0, 0, .2)"}} 
              className="icon-trash my-auto ml-1" onClick={props.onDel}></i>
          </span>
        )
      } 
    })
  }catch(error){}


  if(props.editModeStation != undefined) {
    editModeBadge = Object.entries(props.editModeStation.name).map(([key, value]) => {
      return (
        // <span key={value} className="badge mt-2 ml-2" style={ badgeStyle }>
        <span className="badge mt-2 ml-2" style={ badgeStyle }>
          {key.toString() + " | "}
          {value.toString()}
          <i language={key} style={{ cursor: "pointer", color: "rgba(0, 0, 0, .2)"}} 
            className="icon-trash my-auto ml-1" onClick={props.onDel}></i>
        </span>
      )
    })
  }
  return(
    (props.editModeStation == undefined && <div>{badge}</div>) ||
    (props.editModeStation != undefined && <div>{editModeBadge}</div>)
  )
}

export default class InputText extends React.Component {
	constructor(props){
		super(props);
    this.editStation = this.editStation.bind(this)
	}

  handleClickAdd = () => {
    let e = document.getElementById(this.props.name + "Language") //取得該語言選單
    let language = e.options[e.selectedIndex].value               //取得該語言
    let name = document.getElementById(this.props.name + "Name")  //取得該輸入框
    if(language == ''){
      alert("Choose a language")
    }
    else if(name.value == ''){
      alert("Name is empty")
    }
    else{
      this.props.onAdd(language, name.value)
      name.value = ''
    }
  }

  handleClickDel = (e) => {
    let language = e.target.getAttribute("language")
    this.props.onDel(language)
  }

  editStation = () => {
    let e = document.getElementById(this.props.name + "Language") //取得該語言選單
    let language = e.options[e.selectedIndex].value               //取得該語言
    let name = document.getElementById(this.props.name + "Name")  //取得該輸入框
  }

  componentDidMount() {
    document.getElementById(this.props.name + "Name").onkeyup = (e) => {
      if(e.keyCode == 13) this.handleClickAdd()
    }
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
	      <div className="input-group mt-2" style={{height: "2rem"}}>
	      	<div className="input-group-prepend">
	      		<select style={ languageSeleteStyle } id={this.props.name + "Language"} 
              className="browser-default py-1 rounded">
      				<option disabled selected value='' className="d-none p-3"></option>
	      			<option value="ch" className="m-5">Chinese</option>
	      			<option value="en" className="m-3">English</option>
              <option value="kr" className="m-3">Korea</option>
              <option value="jp" className="m-3">Japan</option>
            </select>
	      	</div>
	      	<Input type="text" id={this.props.name + "Name"} name={this.props.name} className="pb-2 rounded" />
      		<div className="input-group-append">
						<i className="icon-plus my-auto ml-1" style={{ cursor: "pointer"}} 
              onClick={ this.props.isEditMode ? this.editStation : this.handleClickAdd}></i>
	      	</div>
	      </div>
        <NameBadge lists={this.props.lists} onDel={this.handleClickDel} />
	    </FormGroup>
		)
	}
}