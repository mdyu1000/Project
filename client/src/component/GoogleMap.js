/* global google */
import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

const MapWithAMarker = withGoogleMap(props =>
  <GoogleMap defaultZoom={13} center={{ lat: props.lat, lng: props.lng }}     
    options={{ mapTypeControl: false }}
  >
    {
      props.stations.map((station, index) => 
        <Marker key={ "marker" + index } 
          position={{ lat: Number(station.location.lat), lng: Number(station.location.lng) }} 
          animation={ props.SIDOnGMap == index + 1 ? google.maps.Animation.BOUNCE : null }
        />

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
          lat={ this.props.stations.length == 0 ? 25.033262 : Number(this.props.stations[0].location.lat) }
          lng={ this.props.stations.length == 0 ? 121.5632 : Number(this.props.stations[0].location.lng) }
          containerElement={<div className="mt-2" style={{ height: "300px" }} />}
          mapElement={<div style={{ height: `100%` }} />} 
          SIDOnGMap={this.props.SIDOnGMap}
        />
      </div>
    );
  }
}