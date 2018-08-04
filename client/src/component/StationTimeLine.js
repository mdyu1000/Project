import React from 'react';

const stationStyle = {
  listStyleType: "none",
  width: "100%",
  height: "300px",
  paddingLeft: "40%",
  marginTop: "0.65rem",
  border: "none",
  overflowY: "scroll",
  overflowX: "hidden",
  position: "relative",
}

const stationTextStyle = {
  width: "400px",
  marginLeft: "2rem",
}

const timeLineStyle = (color) => {
	return ({
	  position: "relative",
		width: "6px",
		backgroundColor: color,
    borderColor: color,
		paddingTop: "1rem",	
	})
}

export default class StationTimeLine extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
      <ul id="station" style={stationStyle} className="bordered-black scrollbar scrollbar-black thin">
        {
          this.props.stations.map((station, index) => 
            <li key={station + index} style={timeLineStyle(this.props.color)}>
              <div style={stationTextStyle}>{station.name.ch}</div>
            </li>
          )
        }
      </ul>
		)
	}
}

StationTimeLine.defaultProps = {
  color: "#c48c31",
};