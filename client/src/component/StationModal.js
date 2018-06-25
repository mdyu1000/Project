import React from 'react';
import { Col, Input } from 'reactstrap';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import StationTimeLine from './StationTimeLine';
import InputText from './InputText';
import GMapSearch from "./GoogleMapSearch";
import { ModalItemStyle, ModalListStyle, badgeStyle } from './Global';
import _ from 'lodash';

const LocationBadge = (props) => {
  return(
    props.location.lat != 0 && props.location.lng != 0 && 
    <div className="form-group">
      <span className="badge" style={badgeStyle}>lat : {props.location.lat}</span>
      <span className="badge ml-3" style={badgeStyle}>lng : {props.location.lng}</span>
    </div>
  )
}

const StateButton = (props) => {
  return(
    <div className="form-group d-flex justify-content-end mb-0">
      {
        (
          props.isEditMode && 
          <button id="modifyStationBtn" type="button" className="btn btn-secondary btn-sm" onClick={props.onEditStation}>
            Modify
          </button>
        ) || (
          !props.isEditMode && 
          <button id="modifyStationBtn" type="button" className="btn btn-secondary btn-sm" disabled >
            Modify
          </button>
        )
      }{
        (
         (props.isEditMode || (props.location.lat == 0 && props.location.lng == 0)) &&
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
    	<i id={"edit" + props.SID} style={{ cursor: "pointer"}} className="fa fa-edit my-auto" 
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

var isInTrashcan = false
var itemSelected = ""
var edit_SID

export default class StationModal extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			items: this.props.stations,
		}
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

  handleAddStation = () => {
    let stationName = _.cloneDeep(this.props.stationName)
    let stationLocation = _.cloneDeep(this.props.stationLocation)
    document.getElementById("googleMapSearchInput").value = ""
    this.props.onAddStation(stationName, stationLocation)
  }

  handleEditStation = () => {
    let stationName = _.cloneDeep(this.props.stationName)
    let stationLocation = _.cloneDeep(this.props.stationLocation) 
    this.props.onEditStation(edit_SID, stationName, stationLocation)
  }

  handleDelStation = (SID) => {
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
      isInTrashcan = true
    }else{
      isInTrashcan = false
    }
  }

  handleSortEnd = ({oldIndex, newIndex, collection}, e) => {
    if(!isInTrashcan){
      this.setState({
        items: arrayMove(this.state.items, oldIndex, newIndex),
      });
      this.props.onSortStation(this.state.items)  
    }
  };

  handleMouseUp(ev) {
    let SID = itemSelected.getAttribute("id").split("station")[1]
    if(isInTrashcan){
      this.props.onDelStation(SID)
    }
  }

  editMode(e) {
    let SID = e.target.getAttribute("id").split("edit")[1]
    edit_SID = SID
    let filterStation = this.state.items.filter(item => item.SID == SID)[0]
    this.props.onEditStationMode(filterStation.SID, filterStation.name, filterStation.location)
  }

	render() {
		return (
      <div className="modal fade" id="stationModal" tabindex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
          	<ModalHeader onCloseModal={this.props.onCloseStationModal}/>
            <div className="modal-body">
            	<div className="row">
            		<Col sm="5">
									<SortableList items={this.state.items} distance="10" 
                    onSortStart={this.handleSortStart}
                    onSortEnd={this.handleSortEnd}
                    onSortMove={this.handleSortMove}
                    onDelStation={this.handleDelStation}  
                    handleEditMode={this.editMode}/>
            		  <div id="trashcan" className="text-center" style={{ width: "100%"}} onMouseUp={this.handleMouseUp}>
                    <i class="fa fa-trash fa-2x" aria-hidden="true"></i>
                  </div>
                </Col>
            		<Col sm="7">
                  <form>
                    <div className="form-group">
                      <InputText title="Station Name" name="stationName" lists={this.props.stationName} 
                        onAdd={this.props.onAddStationName} onDel={this.props.onDelStationName} />
                    </div>
                    <div className="form-group">
                      <span>Google Map</span>
                      <GMapSearch onAddLocation={this.props.onAddStationLocation} 
                        isEditMode={this.props.isEditMode} location={this.props.stationLocation}/>
                    </div>
                    <LocationBadge location={this.props.stationLocation} />
                    <StateButton onAddStation={this.handleAddStation} 
                      onEditStation={this.handleEditStation}
                      location={this.props.stationLocation}
                      isEditMode={this.props.isEditMode} />
                  </form>
            		</Col>
            	</div>
            </div>
          </div>
        </div>
      </div>
		)
	}
}