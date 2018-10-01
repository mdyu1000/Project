import React from 'react'
import { FormGroup, Input } from 'reactstrap'
import { badgeStyle } from './Global'
import FontAwesomeList from './FontAwesomeList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const languageSeleteStyle = {
  background: "#808080",
  opacity: ".3",
  color: "white",
  paddingLeft: ".5rem",
  paddingRight: ".5rem",
}

const DemoIcon = props => {
  if(props.icon == "mrt"){
    return(
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/c/c3/The_seal_of_Department_of_Rapid_Transit_Systems%2C_Taipei_City_Government_20140108.svg" 
        style={{height: "25px", width: "25px"}} 
      />
    )
  }else{
    return(
      <FontAwesomeIcon icon={props.icon} />             
    )
  }  
}

export default class StationSpotInput extends React.Component {
	constructor(props){
		super(props);
    this.handleAddSpotName = this.handleAddSpotName.bind(this)
    this.handleDelSpotName = this.handleDelSpotName.bind(this)
    this.handleDelSpot = this.handleDelSpot.bind(this)
	}

  handleAddSpotName(){
    let e = document.getElementById("spotLanguage")
    let spotLanguage = e.options[e.selectedIndex].value 
    let spotName = document.getElementById("spotName").value

    if(spotLanguage == ''){
      alert("Choose a language")
    }
    else if(spotName == ''){
      alert("Name is empty")
    }
    else{
      this.props.AddStationSpotName(spotLanguage, spotName)
      document.getElementById("spotName").value = ''
    }
  }

  handleDelSpotName(e){
    let language = e.target.dataset.language
    this.props.DelStationSpotName(language)
  }

  handleDelSpot(e){
    let spot = e.target.dataset.spotid
    this.props.DelStationSpot(spot)
  }

  componentDidMount(){
    document.getElementById("spotName").onkeyup = (e) => {
      if(e.keyCode == 13) this.handleAddSpotName()
    }  
    document.addEventListener('click', e => {
      if(e.target.getAttribute("id") != "iconToggle" && document.getElementById("iconList") != null){
        document.getElementById("iconList").classList.remove("show")    
      }
    })
  }

  componentDidUpdate(prevProps){
    if(prevProps.stationInfo != this.props.stationInfo){
      if(this.props.stationInfo.hasOwnProperty('en') && this.props.stationInfo.hasOwnProperty('ch')){
        document.getElementById("spotName").value = ''
        this.props.AddStationSpot(
          this.props.stationInfo.icon, 
          {
            ch: this.props.stationInfo.ch,
            en: this.props.stationInfo.en,
          }
        )
      }      
    }
  }

	render(){
		return(
	    <FormGroup>
	      <span>{this.props.title}</span>
	      <div className="input-group mt-2" style={{height: "2rem"}}>
	      	<div className="input-group-prepend">
	      		<select style={ languageSeleteStyle } id="spotLanguage" 
              className="browser-default py-1 rounded">
      				<option disabled selected value='' className="d-none p-3"></option>
	      			<option value="ch" className="m-5">Chinese</option>
	      			<option value="en" className="m-3">English</option>
            </select>
	      	</div>
          <button id="iconToggle" type="button" className="btn input-group-prepend my-auto border-0 mx-1" 
            style={{cursor: "pointer", background: "none"}}
            data-toggle="collapse"
            data-target="#iconList"
          >
            <DemoIcon icon={this.props.stationInfo.icon} />
          </button>
	      	<Input type="text" id="spotName" name={this.props.name} className="pb-2 rounded" />
      		<div className="input-group-append">
						<i className="icon-plus my-auto ml-1" style={{ cursor: "pointer"}} 
              onClick={this.handleAddSpotName}></i>
	      	</div>
          <div className="w-100">
            {
              this.props.stationInfo.hasOwnProperty("ch") &&
              <span className="badge badge-secondary mt-2 ml-2">
                { this.props.stationInfo.ch }
                <i className="icon-trash ml-1" style={{cursor: "pointer"}} 
                  data-language="ch" onClick={this.handleDelSpotName}></i>
              </span>
            }
            {
              this.props.stationInfo.hasOwnProperty("en") &&
              <span className="badge badge-secondary mt-2 ml-2">
                {this.props.stationInfo.en}
                <i className="icon-trash ml-1" style={{cursor: "pointer"}} 
                  data-language="en" onClick={this.handleDelSpotName}></i>
              </span>
            }
          </div>
          <div className="collapse" id="iconList">
            <FontAwesomeList SetStationSpotIcon={this.props.SetStationSpotIcon} />
          </div>
	      </div>
        <div className="mt-5" style={{ height: "160px", overflowY: "scroll"}}>
          {
            this.props.stationInfos.hasOwnProperty("spot") &&
            this.props.stationInfos.spot.map((info, index) => 
              <div key={"spot" + index} className="border rounded px-2 py-1 mt-1 mr-1 d-flex justify-content-between">
                <span>
                  <DemoIcon icon={info.icon}/>
                  {info.name.ch + '  /  ' + info.name.en}
                </span>
                <i className="icon-trash my-auto" style={{cursor: "pointer"}} 
                  data-spotid={info.spotId} onClick={this.handleDelSpot}></i>
              </div>
            )
          }
        </div>	    
      </FormGroup>
		)
	}
}