import React from "react";
import { Link, withRouter } from "react-router-dom";


const NavbarItem = (props) => {
  const isActive = (history, path) => {
    if (history.location.pathname === path) {
    return {color: "red"}
    }
  }


 
  return (
    <li className="list-item">
      <Link to={props.url}style={isActive(props.history, props.url)}>{props.label} </Link>
    </li>
  );

}

export default withRouter(NavbarItem);
