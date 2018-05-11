import React from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMapKey="AIzaSyDzkV6yiLEXZ_cvst1kBhflXFbATfi8jEY"

const AnyReactComponent = ({ text }) => (
  <i class="fa fa-map-marker fa-2x red-text"></i>
);

export default class GoogleMap extends React.Component {
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
        <div style={{ height: "300px", width: "100%"}} className="mt-2">
          <GoogleMapReact bootstrapURLKeys={{ key: GoogleMapKey}}
            defaultCenter={this.state.center} defaultZoom={this.state.zoom}>
            {
              this.props.stations.map(station =>
                <AnyReactComponent lat={station.lat} lng={station.lng} />
              )
            }       
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}
