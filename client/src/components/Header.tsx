import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/actions";
import { MainState } from "../redux/types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

interface Props {
  logout: typeof logout;
}

interface States {
  isOpen: boolean;
}

class Header extends React.Component<Props, States> {
  readonly state: States = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  doLogout = () => {
    this.props.logout();
  };

  render() {
    const { isOpen } = this.state;
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Task Board</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
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
                to="/boards"
                className="nav-link"
                activeClassName="active"
              >
                Boards
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={this.doLogout}
                exact
                to="#"
                className="nav-link"
                activeClassName="logout"
              >
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = ({ auth }: MainState) => {
  const { loggedIn } = auth;
  return { loggedIn };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
