import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

const MapWithAMarker = withGoogleMap(props =>
  <GoogleMap defaultZoom={13} defaultCenter={{ lat: props.lat, lng: props.lng }} >
    {
      props.stations.map((station, index) => 
        station != undefined &&
        <Marker key={ "marker" + index } position={{ lat: station.location.lat, lng: station.location.lng }} />   
      )
    }
  </GoogleMap>
);

export default class GMap extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="form-group">
        <span>Google Map</span>
        <MapWithAMarker
          stations={this.props.stations}
          lat={ this.props.stations[Math.floor(this.props.stations.length / 2)].location.lat }
          lng={ this.props.stations[Math.floor(this.props.stations.length / 2)].location.lng }
          containerElement={<div className="mt-2" style={{ height: "300px" }} />}
          mapElement={<div style={{ height: `100%` }} />} 
        />
      </div>
    );
  }
}