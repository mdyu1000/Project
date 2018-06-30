import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, DropdownToggle, Container } from 'reactstrap';
import { Link } from 'react-router-dom'

const NavbarStyle = {
  position: "fixed",
  width: "100%",
  zIndex: "30",
}

const tmp = {
  display: "inline-block",
  paddingTop: ".3125rem",
  paddingBottom: ".3125rem",
  marginRight: "1rem",
  fontSize: "1.25rem",
  lineHeight: "inherit",
  whiteSpace: "nowrap",
  color: "white"
}

export default class NavgationBar extends React.Component {
  render() {
    return (
      <Navbar color="faded" light className="navbar-dark bg-dark" style={NavbarStyle}>
        <Container fluid >
          <Link to="/" style={tmp}>Back End </Link>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink> <i className="fa fa-sign-out" aria-hidden="true"></i>SignOut</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}