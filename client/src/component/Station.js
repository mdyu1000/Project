import React from 'react';
import { Col, FormGroup, Button} from 'reactstrap';
import '../CSS/station.css';
import '../CSS/scrollbar.css';
import StationModal from './StationModal';
import StationTimeLine from './StationTimeLine';

export default class Station extends React.Component {
	constructor(props){
		super(props);

	}

  render() {
    return (
      <div>
        <FormGroup>
          <span>Station 
            <i type="button" data-toggle="modal" data-target="#stationModal" className="fa fa-edit ml-2" style={{ cursor: "pointer" }}></i>
          </span> 
          <StationTimeLine color={this.props.color} stations={this.props.stations} />
        </FormGroup> 
        <StationModal stations={this.props.stations} 
          stationName={this.props.stationName}
          stationLocation={this.props.stationLocation}
          isEditMode={this.props.isEditMode}
          onAddStation={this.props.onAddStation}
          onAddStationName={this.props.onAddStationName} 
          onAddStationLocation={this.props.onAddStationLocation} 
          onDelStation={this.props.onDelStation}
          onDelStationName={this.props.onDelStationName}
          onSortStation={this.props.onSortStation} 
          onEditStationMode={this.props.onEditStationMode} 
          onEditStation={this.props.onEditStation} 
          onCloseStationModal={this.props.onCloseStationModal}/>
      </div>
    );
  }
}