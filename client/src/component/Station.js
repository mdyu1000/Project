import React from 'react';
import { Col, FormGroup, Button} from 'reactstrap';
import '../CSS/station.css';
import '../CSS/scrollbar.css';
import StationModal from './StationModal';
import StationTimeLine from './StationTimeLine';

export default class Station extends React.Component {
	constructor(props){
		super(props);
		this.state = {
      stations: ["忠孝復興", "南京復興", "中山國中", "松山機場", "大直", "劍南路", "西湖"],
    }
    this.handleSortStation = this.handleSortStation.bind(this);
	}

  handleSortStation(NewSort){
    this.setState({
      stations: NewSort
    })
  }

  render() {
    return (
      <Col sm={{ size: "5"}} style={{marginTop: "1rem"}}>
        <FormGroup>
          <span>Station 
            <i type="button" data-toggle="modal" data-target="#exampleModal" class="fa fa-edit ml-2" style={{ fontSize: "1.1rem", cursor: "pointer" }}></i>
          </span> 
          <StationTimeLine color={this.props.color} stations={this.state.stations} />
        </FormGroup> 
        <StationModal stations={this.state.stations} onSortStation={this.handleSortStation} />
      </Col>
    );
  }
}