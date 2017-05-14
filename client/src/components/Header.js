import React from 'react';
import {
    connect
}
from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


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
    
    console.log('check if access to history obj', this.props);
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
          <NavbarBrand href="/">Blood Glucose Tracker</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            <NavItem>
                <NavLink href="/register">Register</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/rttomlinson/blood_sugar_tracker">Github</NavLink>
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
