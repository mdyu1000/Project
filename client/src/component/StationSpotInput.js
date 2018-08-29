import React from 'react'
import { FormGroup, Input } from 'reactstrap'
import { badgeStyle } from './Global'
import FontAwesomeList from './FontAwesomeList'


const languageSeleteStyle = {
  background: "#808080",
  opacity: ".3",
  color: "white",
  paddingLeft: ".5rem",
  paddingRight: ".5rem",
}

export default class StationSpotInput extends React.Component {
	constructor(props){
		super(props);
    this.handleAddSpotName = this.handleAddSpotName.bind(this)
	}

  handleAddSpotName(){

  }

  componentDidUpdate(prevProps){
    if(prevProps.stationInfo.icon != this.props.stationInfo.icon){
      alert("icon is change")
    }
  }

	render(){
		return(
	    <FormGroup>
	      <span>{this.props.title}</span>
        <div className="mt-1" style={{ height: "100px", overflowY: "scroll"}}>
          {
            this.props.stationInfos.spot.map((info, index) => 
              <div key={"spot" + index} className="border rounded px-2 py-1 mt-1 mr-1 d-flex justify-content-between">
                <span>{info.name.ch + '  /  ' + info.name.en}</span>
                <i className="fas fa-trash my-auto" style={{cursor: "pointer"}}></i>
              </div>
            )
          }
        </div>
	      <div className="input-group mt-2" style={{height: "2rem"}}>
	      	<div className="input-group-prepend">
	      		<select style={ languageSeleteStyle } id={this.props.name + "Language"} 
              className="browser-default py-1 rounded">
      				<option disabled selected value='' className="d-none p-3"></option>
	      			<option value="ch" className="m-5">Chinese</option>
	      			<option value="en" className="m-3">English</option>
            </select>
	      	</div>
          <button type="button" className="btn input-group-prepend my-auto border-0 mx-1" 
            style={{cursor: "pointer", background: "none"}}
            data-toggle="collapse"
            data-target="#iconList"
          >
            <i id="icon" className={"fas fa-" + this.props.stationInfo.icon}></i>
          </button>
	      	<Input type="text" id={this.props.name + "Name"} name={this.props.name} className="pb-2 rounded" />
      		<div className="input-group-append">
						<i className="icon-plus my-auto ml-1" style={{ cursor: "pointer"}} 
              onClick={this.handleAddSpotName}></i>
	      	</div>
          <div className="w-100">
            {
              this.props.stationInfo.hasOwnProperty("ch") &&
              <span className="badge badge-secondary">{ this.props.stationInfo.ch }</span>
            }
            {
              this.props.stationInfo.hasOwnProperty("en") &&
              <span className="badge badge-secondary ml-1">{this.props.stationInfo.en}</span>
            }
          </div>
          <div className="collapse" id="iconList">
            <FontAwesomeList SetStationSpotIcon={this.props.SetStationSpotIcon} />
          </div>
	      </div>
	    </FormGroup>
		)
	}
}