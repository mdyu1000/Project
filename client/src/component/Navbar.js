import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container } from 'reactstrap';

export default class NavgationBar extends React.Component {
  render() {
    return (
      <div id="Navbar">
        <Navbar color="faded" light className="navbar-dark bg-dark">
          <Container fluid >
            <NavbarBrand href="/">Back</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink> <i class="fa fa-sign-out" aria-hidden="true"></i>SignOut</NavLink>
              </NavItem>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}