/*global google*/
import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import _ from 'lodash';
import { compose, withState, withProps, lifecycle, withHandlers } from 'recompose';

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="mt-2" style={{ height: `250px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      this.setState({
        bounds: null,
        center: {
          lat: 25.063130, 
          lng: 121.551962
        },
        markers: [],

        onClickMarker: (e) => {
          this.props.onSearch({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        },
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
          
          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search..."
        style={inputStyle}
      />
    </SearchBox>
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} onClick={props.onClickMarker}/>
    )}
  </GoogleMap>
);

const inputStyle = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `29.33px`,
  marginTop: `10px`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
}

export default class GMapSearch extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        <MapWithASearchBox onSearch={this.props.onSearch}/>
      </div>
    )
  }
}
