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
      <button type="button" class="btn btn-success btn-sm mr-3" onClick={props.onAdd}>
        Add
      </button>
      <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" onClick={props.onSave}>
        Save
      </button>
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
        <SortableItem key={`item-${index}`} index={index} value={value.name} />
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
      newName: "",
      newLatLng: {
        lat: 0,
        lng: 0
      },
		}
		this.handleSave = this.handleSave.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
	}

  componentWillReceiveProps(nextProps){
    if(nextProps.stations != this.state.items){
      this.setState({
        items: [...this.state.items, nextProps.stations[nextProps.stations.length - 1]]
      })
    }
  }

	handleSave(){
  	this.props.onSortStation(this.state.items);
	};

  handleSearch(latLng){
    this.setState({
      newLatLng: latLng,
    })
  }

  handleAdd(){
    this.props.onAdd({ name: "test", center: { lat: this.state.newLatLng.lat, lng: this.state.newLatLng.lng }});
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
                      <GMapSearch onSearch={this.handleSearch} />
                    </div>
                    { 
                      this.state.newLatLng.lat != 0 && this.state.newLatLng.lng != 0 &&
                      <div className="form-group">
                        <span class="badge badge-success">lat : {this.state.newLatLng.lat}</span>
                        <span class="badge badge-success ml-3">lng : {this.state.newLatLng.lng}</span>
                      </div>
                    }
                  </form>
            		</Col>
            	</Row>
            </div>
            <ModalFooter onSave={this.handleSave} onAdd={this.handleAdd}/>
          </div>
        </div>
      </div>
		)
	}
}