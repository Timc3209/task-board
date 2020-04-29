import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

const Header = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Task Board</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar className="justify-content-end">
        <Nav navbar>
          <NavItem>
            <NavLink
              to="/taskBoard"
              className="nav-link"
              activeClassName="active"
            >
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/settings"
              className="nav-link"
              activeClassName="active"
            >
              Settings
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
