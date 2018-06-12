import React from 'react';
import { Col, Input } from 'reactstrap';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import StationTimeLine from './StationTimeLine';
import InputText from './InputText';
import GMapSearch from "./GoogleMapSearch";
import { ModalItemStyle, ModalListStyle, badgeStyle } from './Global';

const StateButton = (props) => {
  return(
    <div className="form-group d-flex justify-content-end mb-0">
      <button id="modifyStationBtn" type="button" className="btn btn-secondary btn-sm" disabled>
        Modify
      </button>
      {
        (
          props.location.lat == 0 && props.location.lng == 0 &&
         <button id="addStationBtn" type="button" className="btn btn-success btn-sm" onClick={props.onAddStation} disabled>
           Add
         </button>
        ) || (
          props.location.lat != 0 && props.location.lng != 0 &&
          <button id="addStationBtn" type="button" className="btn btn-success btn-sm" onClick={props.onAddStation}>
            Add
          </button>
        )        
      }
    </div>
  )
}

const ModalHeader = () => {
	return (
    <div className="modal-header">
      <h5 className="modal-title my-auto">Edit Stations</h5>
      <button type="button" className="close" data-dismiss="modal">
        <span>&times;</span>
      </button>
    </div>
	)
}

const ModalFooter = (props) => {
  return (
    <div className="modal-footer">

    </div>   
  )
}

const SortableItem = SortableElement((props) => {
  return (
    <li style={ModalItemStyle} className="mt-1">
    	{props.value}
    	<i style={{ cursor: "pointer"}} className="fa fa-remove my-auto"
        onClick={() => props.onDelStation(props.SID)}></i>
      
  	</li>
  )
});

const SortableList = SortableContainer((props) => {
  return (
    <ul style={ ModalListStyle } className="pl-0 pr-2">
      {props.items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} SID={value.SID} value={value.name.ch} 
          onDelStation={props.onDelStation} />
      ))}
    </ul>
  );
});

export default class StationModal extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			items: this.props.stations,
		}
	}

  componentWillReceiveProps(nextProps){
    if(nextProps.stations != this.state.items){
      this.setState({
        items: nextProps.stations
      })
    }
  }

  handleAddStation = () => {
    this.props.onAddStation(this.props.stationName, this.props.stationLocation)
  }

  handleDelStation = (SID) => {
    this.props.onDelStation(SID)
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
    this.props.onSortStation(this.state.items)
  };

	render() {
		return (
      <div className="modal fade" id="stationModal" tabindex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
          	<ModalHeader />
            <div className="modal-body">
            	<div className="row">
            		<Col sm="5">
									<SortableList items={this.state.items} onSortEnd={this.onSortEnd} 
                    onDelStation={this.handleDelStation} distance="10"/>
            		  <div className="text-center" style={{ width: "100%"}} >
                    <i class="fa fa-trash fa-2x" aria-hidden="true"></i>
                  </div>
                </Col>
            		<Col sm="7">
                  <form>
                    <div className="form-group">
                      <InputText title="Station Name" name="stationName" 
                        lists={this.props.stationName} onAdd={this.props.onAddStationName} onDel={this.props.onDelStationName}/>
                    </div>
                    <div className="form-group">
                      <span>Google Map</span>
                      <GMapSearch onAddLocation={this.props.onAddStationLocation} />
                    </div>
                    { 
                      this.props.stationLocation.lat != 0 && this.props.stationLocation.lng != 0 &&
                      <div className="form-group">
                        <span className="badge" style={badgeStyle}>lat : {this.props.stationLocation.lat}</span>
                        <span className="badge ml-3" style={badgeStyle}>lng : {this.props.stationLocation.lng}</span>
                      </div>
                    }
                    <StateButton onAddStation={this.handleAddStation} location={this.props.stationLocation}/>
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