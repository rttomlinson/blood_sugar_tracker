import React from 'react';
import {
    connect
}
from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';


    // const loggedIn = () => {
    //     return (
    //     <ul className="nav navbar-nav navbar-right">
    //         <li><a href="{{ statsPath }}">Stats</a></li>
    //         <li><a href="{{ profilePath }}">Profile</a></li>
    //         <li><a href="{{ logoutPath }}">Logout</a></li>
    //     </ul>
    //     );
    // };
    // const notLoggedIn = () => {
    //     return (
    //     <ul className="nav navbar-nav navbar-right">
    //         <li><a href="{{ loginPath }}">Login</a></li>
    //         <li><a href="{{ newUserPath }}">Register</a></li> 
    //     </ul>
    //     );
    // };

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
    return (
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavLink className="navbar-brand" to="dashboard">Blood Glucose Tracker</NavLink>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="header-nav-item" to="/login">Login</NavLink>
              </NavItem>
            <NavItem>
                <NavLink className="header-nav-item" to="/register">Register</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Header);
