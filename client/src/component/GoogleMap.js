/* global google */
import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

const MapWithAMarker = withGoogleMap(props =>
  <GoogleMap defaultZoom={13} defaultCenter={{ lat: props.lat, lng: props.lng }} >
    {
      props.stations.map((station, index) => 
        <Marker key={ "marker" + index } 
          position={{ lat: station.location.lat, lng: station.location.lng }} 
          animation={ props.SIDOnGMap == index + 1 ? google.maps.Animation.BOUNCE : null }
        />

      )
    }
  </GoogleMap>
);

const CalculateMedium = (stations) => {
  const medium = Math.floor(stations.length / 2) 
  if(medium != 0)
    return stations[medium].location
  else
    return {lat: 25.033262, lng: 121.563201}
}

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
          lat={ CalculateMedium(this.props.stations).lat }
          lng={ CalculateMedium(this.props.stations).lng }
          containerElement={<div className="mt-2" style={{ height: "300px" }} />}
          mapElement={<div style={{ height: `100%` }} />} 
          SIDOnGMap={this.props.SIDOnGMap}
        />
      </div>
    );
  }
}