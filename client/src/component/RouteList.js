import React from 'react';
import { containerStyle } from './Global';

const titleStyle = {
  marginTop: "2rem",
  marginBottom: "1.5rem",
  borderBottom: "1px solid #eee",
  paddingBottom: "1rem",
}

const Title = () => {
  return (
    <div className="row">
      <div className="col">
        <h2 style={titleStyle}>All Route</h2>
      </div>
    </div>
  )
}

const RouteItem = props => {
  return(
    <tbody>
      {
        props.routes.map((route, index) => 
          <tr>
            <th>{index + 1}</th>
            <th>{route.route_name.ch == null ? route.route_name.en : route.route_name.ch}</th>
            <th>{route.departure_name.ch == null ? route.departure_name.en : route.departure_name.ch}</th>
            <th>{route.destination_name.ch == null? route.destination_name.en: route.destination_name.ch}</th>
          </tr>
        )
      }
    </tbody>
  )
}

const RouteTable = props => {
  return (
    <div className="row">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Route Name</th>
            <th>Departure</th>
            <th>Destination</th>
          </tr>
        </thead>
        <RouteItem routes={props.routes} />
      </table>
    </div>
  )
}

export default class RouteList extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="container-fluid" style={containerStyle}>
        <Title />
        <RouteTable routes={this.props.allRoute}/>
      </div>
    );
  }
}