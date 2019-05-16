import React, { Component } from "react";

import NavbarItem from "./NavbarItem";

class Navbar extends Component {
  render() {
    return (
      <div>
        <ul className="Lists">
          <li className="logo">CHODE</li>
          <NavbarItem url="/" label="Home" />
          <NavbarItem url="/contact" label="Contact" />
        </ul>
      </div>
    );
  }
}

export default Navbar;
