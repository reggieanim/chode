import React, { Component } from "react";
import Loader from "./Loader";
import NavbarItem from "./NavbarItem";
import { connect } from "react-redux";

class Navbar extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div>
          <Loader />
          <ul className="Lists">
            <li className="logo">CHODE</li>
            <NavbarItem url="/" label="Home" />
            <NavbarItem url="/contact" label="Contact" />
          </ul>
        </div>
      );
    }
    return (
      <div>
        
        <ul className="Lists">
          <li className="logo">CHODE</li>
          <NavbarItem url="/" label="Home" />
          <NavbarItem url="/contact" label="Contact" />
          <NavbarItem url ="/login" label="Login" />
          <NavbarItem url ="/signup" label="Register" />
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.mailReducer.loading,
    loading: state.signUpReducer.loading,
    loading: state.loginReducer.loading
  };
};

export default connect(
  mapStateToProps,
  null
)(Navbar);
