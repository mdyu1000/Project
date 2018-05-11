import React from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMapKey="AIzaSyDzkV6yiLEXZ_cvst1kBhflXFbATfi8jEY"

const AnyReactComponent = ({ text }) => (
  <div style={{
    position: 'relative', color: 'white', background: 'red',
    height: 40, width: 60, top: -20, left: -30}}>
    {text}
  </div>
);

export default class GoogleMap extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }


  render() {
    return (
      <div className="form-group">
        <span>Google Map</span>
        <div style={{ height: "300px", width: "100%"}} className="mt-2">
          <GoogleMapReact bootstrapURLKeys={{GoogleMapKey}} 
            defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
            <AnyReactComponent 
              lat={25.031720} 
              lng={121.428978} 
              text={'Home'} 
            />
            <AnyReactComponent 
              lat={25.032720} 
              lng={121.428978} 
              text={'School'} 
            />          
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

GoogleMap.defaultProps = {
  center: {
    lat: 25.031720, 
    lng: 121.428978
  },
  zoom: 17
}