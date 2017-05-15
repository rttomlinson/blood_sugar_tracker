import React from 'react';
import {
    Link, NavLink
}
from 'react-router-dom';

import { Nav, NavItem, NavDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

class DashboardHeader extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <Link className="nav-link" to="/dashboard/home">Home</Link>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/dashboard/statistics">Stats</NavLink>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/dashboard/profile">Profile</Link>
          </NavItem>
          <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret>
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
}

export default DashboardHeader;
