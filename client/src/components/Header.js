import React from 'react';
import {
  connect
}
from 'react-redux';
import {
  NavLink
}
from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
}
from 'reactstrap';
import {
  clearTokenAndUnauth
}
from '../actions/';

const loggedIn = (onClick) => {
  return (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink onClick={onClick} className="header-nav-item" to="/login">Logout</NavLink>
      </NavItem>
    </Nav>
)};

const notLoggedIn = (
  <Nav className="ml-auto" navbar>
    <NavItem>
      <NavLink className="header-nav-item" to="/login">Login</NavLink>
    </NavItem>
    <NavItem>
      <NavLink className="header-nav-item" to="/register">Register</NavLink>
    </NavItem>
  </Nav>
);


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const {
      isAuthenticated,
      clearTokenAndUnauth
    } = this.props;
    let navButtons = isAuthenticated ? loggedIn(clearTokenAndUnauth) : notLoggedIn;



    return (
      <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavLink className="navbar-brand" to="dashboard">Blood Glucose Tracker</NavLink>
          <Collapse isOpen={this.state.isOpen} navbar>
            {navButtons}
          </Collapse>
        </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearTokenAndUnauth: () => {
      dispatch(clearTokenAndUnauth());
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
