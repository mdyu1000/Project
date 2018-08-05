import React from 'react';
import { containerStyle } from './Global';
import { Redirect } from 'react-router-dom';

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
          <tr key={index} id={ "route" + route.RID} onClick={props.onClick} style={{ cursor: "pointer"}}>
            <th>{index + 1}</th>
            <th>{route.routeName.ch == null ? route.routeName.en : route.routeName.ch}</th>
            <th>{route.departureName.ch == null ? route.departureName.en : route.departureName.ch}</th>
            <th>{route.destinationName.ch == null? route.destinationName.en: route.destinationName.ch}</th>
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
        <RouteItem routes={props.routes} onClick={props.onClick}/>
      </table>
    </div>
  )
}

export default class RouteList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isRedirect: false
    }    
    this.GetRID = this.GetRID.bind(this)
  }

  GetRID = (e) => {
    let RouteID = e.target.parentNode.getAttribute("ID").split("route")[1]
    this.props.GetRouteRID(RouteID)
    this.props.FetchOneRoute(RouteID)
    this.setState({
      isRedirect: true
    })
  }

  render() {
    if (this.state.isRedirect) {
      return <Redirect push to={"/UpdateRoute/" + this.props.edit_RID} />; //or <Redirect push to="/?a=xxx&b=yyy" /> 传递更多参数
    }

    return (
      <div className="container-fluid" style={containerStyle}>
        <Title />
        {
          (
            this.props.allRoute.length != 0 &&
            <RouteTable routes={this.props.allRoute} onClick={this.GetRID}/>
          ) || (
            this.props.allRoute.length == 0 &&
            <span className="d-block text-center font-italic font-weight-bold"> Route list is empty...</span>
          )
        }
      </div>
    );
  }
}