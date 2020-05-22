import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/actions";
import { AppState } from "../redux/reducers";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

interface Props {
  logout: typeof logout;
  username: string;
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

  render() {
    const { isOpen } = this.state;
    const { username, logout } = this.props;
    return (
      <Navbar color="dark" dark expand="md" fixed="top">
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
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {username}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={logout}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = ({ auth }: AppState) => {
  const { loggedIn, username } = auth;
  return { loggedIn, username };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
