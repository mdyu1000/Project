import React from 'react';
import { Col, FormGroup, } from 'reactstrap';
import '../CSS/station.css';
import '../CSS/scrollbar.css'

const stationStyle = {
  listStyleType: "none",
  width: "100%",
  height: "250px",
  paddingLeft: "40%",
  marginTop: "0.65rem",
  border: "none",
  overflowY: "scroll",
  overflowX: "hidden",
}

const timeLineStyle = (color) => {
	return ({
	  position: "relative",
		width: "6px",
		backgroundColor: color,
    borderColor: color,
		paddingTop: "3rem",	
	})
}

const stationTextStyle = {
  width: "400px",
  marginLeft: "2rem",
}

export default class Station extends React.Component {
	constructor(props){
		super(props);
		// console.log(props);
	}

  render() {
    return (
      <Col sm={{ size: "5"}} style={{marginTop: "1rem"}}>
        <FormGroup>
          <span>Station</span>
          <ul id="station" style={stationStyle} className="bordered-black scrollbar scrollbar-black thin">
            <li style={timeLineStyle(this.props.color)}><div style={stationTextStyle}>忠孝復興</div></li>
            <li style={timeLineStyle(this.props.color)}><div style={stationTextStyle}>南京復興</div></li>
            <li style={timeLineStyle(this.props.color)}><div style={stationTextStyle}>中山國中</div></li>
            <li style={timeLineStyle(this.props.color)}><div style={stationTextStyle}>松山機場</div></li>
            <li style={timeLineStyle(this.props.color)}><div style={stationTextStyle}>大直</div></li>
            <li style={timeLineStyle(this.props.color)}><div style={stationTextStyle}>劍南路</div></li>
            <li style={timeLineStyle(this.props.color)}><div style={stationTextStyle}>西湖</div></li>
          </ul>
        </FormGroup>
      </Col>
    );
  }
}