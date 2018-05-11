import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapWithAMarker = withGoogleMap(props =>
  <GoogleMap defaultZoom={13} defaultCenter={{ lat: props.lat, lng: props.lng }} >
    {
      props.stations.map(station => 
        <Marker position={{ lat: station.lat, lng: station.lng }} />   
      )
    }
  </GoogleMap>
);

export default class GMap extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      center: {
        lat: this.props.stations[this.props.stations.length / 2].lat,
        lng: this.props.stations[this.props.stations.length / 2].lng
      },
      zoom: 13
    }
  }

  render() {
    return (
      <div className="form-group">
        <span>Google Map</span>
        <MapWithAMarker
          stations={this.props.stations}
          lat={this.state.center.lat}
          lng={this.state.center.lng}
          containerElement={<div className="mt-2" style={{ height: "300px" }} />}
          mapElement={<div style={{ height: `100%` }} />} 
        />
      </div>
    );
  }
}