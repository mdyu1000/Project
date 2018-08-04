import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'

const sideNavStyle = {
	position: "fixed",
  left: 0,
  height: "100%",
  width: "17rem",
  backgroundColor: "#343a40",
  fontColor: "white",
  paddingTop: "60px"
}

const itemStyle = {
  color: "white",
  marginLeft: "15px",
  display: "block",
  padding: "1.1rem 1rem",
  textDecoration: "none"
}

export default class SideNav extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div id="Sidebar">
        <Nav vertical style={sideNavStyle}>
          <NavItem>
            <Link to="/NewRoute" style={itemStyle}><i className="icon-note" aria-hidden="true"></i> New</Link>
          </NavItem>
          <NavItem>
            <Link to="/" style={itemStyle} ><i className="icon-pencil" aria-hidden="true"></i> All Route</Link>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
