import React from 'react';
import { Col, Row, Input } from 'reactstrap';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import StationTimeLine from './StationTimeLine';
import InputText from './InputText';
import GMapSearch from "./GoogleMapSearch";

const AnyReactComponent = ({ text }) => (
  <div style={{
    position: 'relative', color: 'white', background: 'red',
    height: 40, width: 60, top: -20, left: -30,    
  }}>
    {text}
  </div>
);

const ModalHeader = () => {
	return (
    <div class="modal-header">
      <h5 class="modal-title my-auto">Edit Stations</h5>
      <button type="button" class="close" data-dismiss="modal">
        <span>&times;</span>
      </button>
    </div>
	)
}

const ModalFooter = (props) => {
	return (
  	<div class="modal-footer">
      <button type="button" class="btn btn-success btn-sm mr-3" data-dismiss="modal">Add</button>
      <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" onClick={props.onSave}>Save</button>
    </div>
	)
}

const stationStyle = {
  listStyleType: "none",
  border: "none",
  overflowY: "scroll",
  overflowX: "hidden",
}

const stationItemStyle = {
	borderRadius: "5px",
	border: "1px solid rgb(161, 102, 44)",
  display: "flex",
  justifyContent: "space-between",
  padding: "0.75rem 1.25rem",
  backgroundColor: "rgba(255,255,255,0.2)",
  zIndex: "10000",
}

const SortableItem = SortableElement(({value}) =>
  <li style={ stationItemStyle } className="mt-1">
  	{value}
  	<i style={{ cursor: "pointer"}} class="fa fa-remove my-auto"></i>
	</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul style={stationStyle} className="pl-0 pr-2">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

export default class StationModal extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			items: this.props.stations,
      stationNameList: [ { type: "ch", value: "忠孝復興" } ],
      newLocation: {
        lat: 0,
        lng: 0
      }
		}
		this.handleSave = this.handleSave.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
	}

	handleSave(){
  	this.props.onSortStation(this.state.items);
	};

  handleSearch(newLat, newLng){
    this.setState({
      newLocation: {
        lat: newLat,
        lng: newLng
      }
    })
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };

	render() {
		return (
      <div class="modal fade" id="exampleModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
          	<ModalHeader />
            <div class="modal-body">
            	<Row>
            		<Col sm="5">
									<SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
            		</Col>
            		<Col sm="7">
                  <form>
                    <div className="form-group">
                      <InputText title="Station Name" name="stationName" lists={this.state.stationNameList}/>
                    </div>
                    <div className="form-group">
                      <span>Google Map</span>
                      <GMapSearch onSearch={this.handleSearch}/>
                    </div>
                  </form>
            		</Col>
            	</Row>
            </div>
            <ModalFooter onSave={this.handleSave}/>
          </div>
        </div>
      </div>
		)
	}
}