import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, DropdownToggle, Container } from 'reactstrap';

const NavbarStyle = {
  position: "fixed",
  width: "100%",
  zIndex: "30",
}

export default class NavgationBar extends React.Component {
  render() {
    return (
      <Navbar color="faded" light className="navbar-dark bg-dark" style={NavbarStyle}>
        <Container fluid >
          <NavbarBrand href="/">Back End</NavbarBrand>
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