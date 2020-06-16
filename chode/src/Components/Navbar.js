import React, { Component } from "react";
// import Loader from "./Loader";
import NavbarItem from "./NavbarItem";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { isAuthenticated } from "../actions/auth";

class Navbar extends Component {
  signout = (next) => {
    if (typeof window != "undefined") localStorage.removeItem("jwt");
    next();
    return axios.get("http://localhost:8080/signout").then(
      (response) => {
        console.log("signout", response);
      },
      (err) => console.log(err)
    );
  };

  navbarRender = () => {
    if (isAuthenticated()) {
      // console.log(isAuthenticated());
      return (
        <div>
          <ul className="Lists">
            <li className="logo">CHODE</li>
            <NavbarItem url="/" label="Home" />
            <NavbarItem url="/contact" label="Contact" />
            <NavbarItem url="/" label={isAuthenticated().user.name} />
            <button
              className="button-class"
              onClick={() => this.signout(() => this.props.history.push("/"))}
            >
              Sign Out
            </button>
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <ul className="Lists">
            <li className="logo">CHODE</li>
            <NavbarItem url="/" label="Home" />
            <NavbarItem url="/contact" label="Contact" />
            <NavbarItem url="/login" label="Login" />
            <NavbarItem url="/signup" label="Register" />
            {/* <button className="button-class" onClick={() => this.signout(() => this.props.history.push("/"))}>Sign Out</button>
             */}
            <Link to="github.com/reggieanim">Github</Link>
          </ul>
        </div>
      );
    }
  };
  render() {
    return <div>{this.navbarRender()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    mailloading: state.mailReducer.loading,
    // signUploading: state.signUpReducer.loading,
    // // loginloading: state.loginReducer.loading
  };
};

export default withRouter(connect(mapStateToProps, null)(Navbar));
