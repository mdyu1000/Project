import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const sideNavStyle = {
	position: "fixed",
  left: 0,
  height: "100%",
  width: "17rem",
  backgroundColor: "#343a40",
  fontColor: "white",
}

const itemStyle = {
  color: "white",
  marginLeft: "15px",
  paddingTop: "1.1rem",
  paddingBottom: "1.1rem",
}

export default class SideNav extends React.Component {
  render() {
    return (
      <div id="Sidebar">
        <Nav vertical style={sideNavStyle}>
          <NavItem>
            <NavLink href="#" style={itemStyle}><i className="fa fa-file-text-o" aria-hidden="true"></i> New</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" style={itemStyle}><i className="fa fa-pencil" aria-hidden="true"></i> Layout</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}