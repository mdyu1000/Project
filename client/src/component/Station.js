import React from 'react';
import { Col, FormGroup, Button} from 'reactstrap';
import '../CSS/station.css';
import '../CSS/scrollbar.css';
import StationModal from './StationModal';
import StationTimeLine from './StationTimeLine';

export default class Station extends React.Component {
	constructor(props){
		super(props);
    console.log("Station.js");
    console.log(props)
	}

  render() {
    return (
      <div>
        <FormGroup>
          <span>Station 
            <i type="button" data-toggle="modal" data-target="#stationModal" class="fa fa-edit ml-2" style={{ cursor: "pointer" }}></i>
          </span> 
          <StationTimeLine color={this.props.color} stations={this.props.stations} />
        </FormGroup> 
        <StationModal stations={this.props.stations} onSortStation={this.props.onSortStation} 
          onAdd={this.props.onAdd}/>
      </div>
    );
  }
}