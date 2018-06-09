import React from 'react';
import { Col, Input } from 'reactstrap';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import StationTimeLine from './StationTimeLine';
import InputText from './InputText';
import GMapSearch from "./GoogleMapSearch";
import { ModalItemStyle, ModalListStyle } from './Global';

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
      <button type="button" className="btn btn-success btn-sm mr-3" onClick={props.onAddStation}>
        Add
      </button>
    </div>   
  )
}

const SortableItem = SortableElement(({value}) =>
  <li style={ModalItemStyle}  className="mt-1">
  	{value}
  	<i style={{ cursor: "pointer"}} className="fa fa-remove my-auto"></i>
	</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul style={ ModalListStyle } className="pl-0 pr-2">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value.name.ch} />
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
    this.handleAddStation = this.handleAddStation.bind(this)
	}

  componentWillReceiveProps(nextProps){
    if(nextProps.stations != this.state.items){
      this.setState({
        items: [...this.state.items, nextProps.stations[nextProps.stations.length - 1]]
      })
    }
  }

	// handleSave(){
 //  	this.props.onSortStation(this.state.items);
	// };

  handleAddStation(){
    this.props.onAddStation(this.props.stationName, this.props.stationLocation)
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
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
									<SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
            		</Col>
            		<Col sm="7">
                  <form>
                    <div className="form-group">
                      <InputText title="Station Name" name="stationName" 
                        lists={this.props.stationName} onAdd={this.props.onAddStationName}/>
                    </div>
                    <div className="form-group">
                      <span>Google Map</span>
                      <GMapSearch onAddLocation={this.props.onAddStationLocation} />
                    </div>
                    { 
                      this.props.stationLocation.lat != 0 && this.props.stationLocation.lns != 0 &&
                      <div className="form-group">
                        <span className="badge badge-success">lat : {this.props.stationLocation.lat}</span>
                        <span className="badge badge-success ml-3">lns : {this.props.stationLocation.lns}</span>
                      </div>
                    }
                  </form>
            		</Col>
            	</div>
            </div>
            <ModalFooter onAddStation={this.handleAddStation}/>
          </div>
        </div>
      </div>
		)
	}
}