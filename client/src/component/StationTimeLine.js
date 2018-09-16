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
    cursor: "pointer"
	})
}

export default class StationTimeLine extends React.Component {
	constructor(props){
		super(props);
    this.handleGetSIDOnGMap = this.handleGetSIDOnGMap.bind(this)
	}

  handleGetSIDOnGMap(e){
    let SID = e.target.dataset.sid
    this.props.GetSIDOnGMap(SID)
  }

	render() {
		return (
      <ul id="station" style={stationStyle} className="bordered-black scrollbar scrollbar-black thin">
        {
          this.props.stations.map((station, index) => 
            <li key={station.SID} 
              data-sid={station.SID}
              style={timeLineStyle(this.props.color)}
              onClick={this.handleGetSIDOnGMap}
            >
              <div style={stationTextStyle} data-sid={station.SID}>{station.name.ch}</div>
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