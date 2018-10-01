import React from 'react';
import { Col, Input } from 'reactstrap';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import StationTimeLine from './StationTimeLine';
import InputText from './InputText';
import GMapSearch from "./GoogleMapSearch";
import { ModalItemStyle, ModalListStyle, badgeStyle } from './Global';
import _ from 'lodash';
import StationSpotInput from './StationSpotInput'
import StationUploadImg from './StationUploadImg'

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
          <button id="modifyStationBtn" type="button" className="btn btn-warning btn-sm mr-3" 
            onClick={props.onEditStation}>
            Update
          </button>
        ) || (
          !props.isEditMode && 
          <button id="modifyStationBtn" type="button" className="btn btn-warning btn-sm mr-3 d-none" >
            Update
          </button>
        )
      }{
        (
         (props.isEditMode) &&
         <button id="addStationBtn" type="button" className="btn btn-success btn-sm d-none">
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
      <span>
        <i id={"edit" + props.SID} style={{ cursor: "pointer"}} className="icon-note my-auto mr-4" 
          onClick={props.handleEditMode}></i>
        <i id={"del" + props.SID} style={{cursor: "pointer"}} className="icon-trash my-auto"
          onClick={props.onDelStation}></i>
      </span>
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
			items: this.props.stations.go,
		}
    this.handleAddStation = this.handleAddStation.bind(this)
    this.handleEditStation = this.handleEditStation.bind(this)
    this.handleDelStation = this.handleDelStation.bind(this)

    this.editMode = this.editMode.bind(this)
	}

  componentWillReceiveProps(nextProps){
    if(nextProps.stations.go != this.state.items){
      this.setState({
        items: nextProps.stations.go
      })
    }
  }

  handleAddStation(){
    let stationName = _.cloneDeep(this.props.stationName)
    let stationLocation = _.cloneDeep(this.props.stationLocation)
    let stationInfos = _.cloneDeep(this.props.stationInfos)

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

  handleDelStation(e){
    let SID = e.target.getAttribute("id").split("del")[1]
    this.props.onDelStation(SID)
  }

  handleSortStart = ({node, index, collection}, event) => {
    itemSelected = node
  }

  handleSortEnd = ({oldIndex, newIndex, collection}, e) => {
    if(!this.state.isInTrashcan){
      this.setState({
        items: arrayMove(this.state.items, oldIndex, newIndex),
      });
      this.props.onSortStation(this.state.items)  
    }
  };

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
                    <StationUploadImg 
                      UploadStationBroadcaseImg={this.props.UploadStationBroadcaseImg}
                    />
            		</div>
            	</div>
              <div className="row">
                <div className="col-6 offset-6 my-auto ">
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