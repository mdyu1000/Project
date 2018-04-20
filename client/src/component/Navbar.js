import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, DropdownToggle, Container } from 'reactstrap';

export default class NavgationBar extends React.Component {
  render() {
    return (
      <div id="Navbar">
        <Navbar color="faded" light className="navbar-dark bg-dark">
          <Container fluid >
            <NavbarBrand href="/">Back End</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink> <i className="fa fa-sign-out" aria-hidden="true"></i>SignOut</NavLink>
              </NavItem>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}