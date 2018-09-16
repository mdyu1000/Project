import React from 'react';
import { Col, Input } from 'reactstrap';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import StationTimeLine from './StationTimeLine';
import InputText from './InputText';
import GMapSearch from "./GoogleMapSearch";
import { ModalItemStyle, ModalListStyle, badgeStyle } from './Global';
import _ from 'lodash';
import StationSpotInput from './StationSpotInput'

const LocationBadge = (props) => {
  return(
    props.location.lat != 0 && props.location.lng != 0 && 
    <div>
      <span className="badge" style={badgeStyle}>lng : {props.location.lat}</span>
      <span className="badge ml-3" style={badgeStyle}>lat : {props.location.lng}</span>
    </div>
  )
}

const StateButton = (props) => {
  return(
    <div className="d-flex justify-content-end mb-0">
      {
        (
          props.isEditMode && 
          <button id="modifyStationBtn" type="button" className="btn btn-secondary btn-sm mr-3" 
            onClick={props.onEditStation}>
            Modify
          </button>
        ) || (
          !props.isEditMode && 
          <button id="modifyStationBtn" type="button" className="btn btn-secondary btn-sm mr-3" disabled >
            Modify
          </button>
        )
      }{
        (
         (props.isEditMode) &&
         <button id="addStationBtn" type="button" className="btn btn-success btn-sm" disabled>
           Add
         </button>
        ) || (
          !props.isEditMode &&
          <button id="addStationBtn" type="button" className="btn btn-success btn-sm" onClick={props.onAddStation}>
            Add
          </button>
        )        
      }
    </div>
  )
}

const ModalHeader = (props) => {
	return (
    <div className="modal-header">
      <h5 className="modal-title my-auto">Edit Stations</h5>
      <button type="button" className="close" data-dismiss="modal" onClick={props.onCloseModal}>
        <span>&times;</span>
      </button>
    </div>
	)
}

const SortableItem = SortableElement((props) => {
  return (
    <li id={"station" + props.SID} style={ModalItemStyle} className="mt-1">
    	{props.value}
    	<i id={"edit" + props.SID} style={{ cursor: "pointer"}} className="icon-note my-auto" 
        onClick={props.handleEditMode}></i>
  	</li>
  )
});

const SortableList = SortableContainer((props) => {
  return (
    <ul style={ ModalListStyle } className="pl-0 pr-2">
      {props.items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} SID={value.SID} value={value.name.ch} 
          onDelStation={props.onDelStation} handleEditMode={props.handleEditMode}/>
      ))}
    </ul>
  );
});

var itemSelected = ""
var edit_SID

const trashcanStyle = (isInTrashcan) => {
  return ({
    border: isInTrashcan ? "dashed 1px gray" : null
  })
}

export default class StationModal extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			items: this.props.stations,
      isInTrashcan: false,
		}
    this.handleAddStation = this.handleAddStation.bind(this)
    this.handleEditStation = this.handleEditStation.bind(this)
    this.handleDelStation = this.handleDelStation.bind(this)

    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.editMode = this.editMode.bind(this)
	}

  componentWillReceiveProps(nextProps){
    if(nextProps.stations != this.state.items){
      this.setState({
        items: nextProps.stations
      })
    }
  }

  handleAddStation(){
    let stationName = _.cloneDeep(this.props.stationName)
    let stationLocation = _.cloneDeep(this.props.stationLocation)
    let stationInfos = _.cloneDeep(this.props.stationInfos)

    console.log(stationLocation)

    if(!stationName.hasOwnProperty("ch") || !stationName.hasOwnProperty("en") || stationName.en == null || stationName.ch == null){
      alert("Station must have Chinese and English name")
    }
    else if(stationLocation.lat == 0 && stationLocation.lat == 0){
      alert("Choose a location marker")
    }
    else{
      document.getElementById("googleMapSearchInput").value = ""
      this.props.onAddStation(stationName, stationLocation, stationInfos)
    }
  }

  handleEditStation(){
    let stationName = _.cloneDeep(this.props.stationName)
    let stationLocation = _.cloneDeep(this.props.stationLocation) 
    let stationInfos = _.cloneDeep(this.props.stationInfos)

    console.log(stationName)

    if(!stationName.hasOwnProperty("ch") || !stationName.hasOwnProperty("en") || stationName.en == null || stationName.ch == null){
      alert("Station must have Chinese and English name")
    }
    else if(stationLocation.lat == 0 && stationLocation.lat == 0){
      alert("Choose a location marker")
    }    
    else{
      document.getElementById("googleMapSearchInput").value = ""
      this.props.onEditStation(edit_SID, stationName, stationLocation, stationInfos)
    }
  }

  handleDelStation(SID){
    this.props.onDelStation(SID)
  }

  handleSortStart = ({node, index, collection}, event) => {
    itemSelected = node
  }

  handleSortMove = (event) => {
    if( event.clientX < document.getElementById("trashcan").getBoundingClientRect().right &&
        event.clientX > document.getElementById("trashcan").getBoundingClientRect().left &&
        event.clientY < document.getElementById("trashcan").getBoundingClientRect().bottom &&
        event.clientY > document.getElementById("trashcan").getBoundingClientRect().top){
          // border: dashed 1px gray;
      this.setState({
        isInTrashcan: true
      })
    }else{
      this.setState({
        isInTrashcan: false
      })
    }
  }

  handleSortEnd = ({oldIndex, newIndex, collection}, e) => {
    if(!this.state.isInTrashcan){
      this.setState({
        items: arrayMove(this.state.items, oldIndex, newIndex),
      });
      this.props.onSortStation(this.state.items)  
    }
  };

  handleMouseUp(ev) {
    if(itemSelected != ""){
      let item = itemSelected.getAttribute("id")
      let SID = item.split("station")[1]
      if(this.state.isInTrashcan && item != undefined){
        this.props.rules.map(rule => {
          if(rule.SID != null && rule.SID == SID)
            this.props.onDelCondition(rule.RID)
        })


        this.props.onDelStation(SID)
      }
    }
  }

  editMode(e) {
    let SID = e.target.getAttribute("id").split("edit")[1]
    edit_SID = SID
    let filterStation = this.state.items.filter(item => item.SID == SID)[0]
    this.props.onEditStationMode(filterStation.SID, filterStation.name, filterStation.location, filterStation.info)
  }

	render() {
		return (
      <div className="modal fade" id="stationModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
          	<ModalHeader onCloseModal={this.props.onCloseStationModal}/>
            <div className="modal-body">
            	<div className="row">
            		<div className="col-6">
                  <div className="mb-3">
                    <span>Google Map</span>
                    <GMapSearch onAddLocation={this.props.onAddStationLocation} 
                      isEditMode={this.props.isEditMode} location={this.props.stationLocation}/>
                    <LocationBadge location={this.props.stationLocation} />
                  </div>									
                  <SortableList items={this.state.items} 
                    distance={10}
                    onSortStart={this.handleSortStart}
                    onSortEnd={this.handleSortEnd}
                    onSortMove={this.handleSortMove}
                    onDelStation={this.handleDelStation}  
                    handleEditMode={this.editMode}
                  />

                </div>
            		<div className="col-6">
                    <div>
                      <InputText title="Station Name" name="stationName" lists={this.props.stationName} 
                        onAdd={this.props.onAddStationName} onDel={this.props.onDelStationName} />
                    </div>

                    <StationSpotInput title="Information"
                      stationInfos={this.props.stationInfos}
                      stationInfo={this.props.stationInfo}

                      SetStationSpotIcon={this.props.SetStationSpotIcon}
                      AddStationSpotName={this.props.AddStationSpotName}
                      AddStationSpot={this.props.AddStationSpot}
                      DelStationSpotName={this.props.DelStationSpotName}
                      DelStationSpot={this.props.DelStationSpot}
                    />

            		</div>
            	</div>
              <div className="row">
                <div className="col-6">
                  <div id="trashcan" className="text-center w-100 py-2" 
                    onMouseUp={this.handleMouseUp}
                    style={trashcanStyle(this.state.isInTrashcan)}
                  >
                    <i className="icon-trash fa-2x" aria-hidden="true"></i>
                  </div>                
                </div>
                <div className="col-6 my-auto">
                  <StateButton onAddStation={this.handleAddStation} 
                    onEditStation={this.handleEditStation}
                    location={this.props.stationLocation}
                    isEditMode={this.props.isEditMode} 
                  />               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
		)
	}
}