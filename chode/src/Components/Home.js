import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import { createSession } from "../actions/session";


import { isAuthenticated } from "../actions/auth";


class Home extends Component {
  state = {
    redirectUrl: "",
  };

  startSession = (e) => {
    createSession(e).then((response) =>
      this.setState({ redirectUrl: response.data._id }),(err => {
        if(err) {
          alert("an error occured")
        }
      })
    );
  };

  renderHome = () => {
    if (!isAuthenticated()) {
      return <h1>Please Login or Register</h1>;
    }

    if (this.state.redirectUrl) {
      return <Redirect to={`/session/${this.state.redirectUrl}`}/>
    }
    return (
      <button className="button-class" onClick={(e) => this.startSession(e)}>
        Create session
      </button>
    );
  };

  render() {
    return <div className="home">{this.renderHome()}</div>;
  }
}

export default Home;
