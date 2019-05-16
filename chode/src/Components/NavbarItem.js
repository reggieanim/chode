import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavbarItem extends Component {
  render() {
    return (
      <li className="list-item">
        <Link to={this.props.url}>{this.props.label}</Link>
      </li>
    );
  }
}

export default NavbarItem;
