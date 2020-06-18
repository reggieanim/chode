import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import "./style.css"
// ('dotenv').config()
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import NoMatch from "./Components/NoMatch";
import Navbar from "./Components/Navbar";
import Auth from "./Components/Auth"
import SignUp from "./Components/SignUp"
import Session from "./Components/Session"

class App extends Component {
  render() {
  
    return (
      <BrowserRouter>
      <Navbar />
        <Switch>
          
          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Auth} />
          <Route path="/signup" component={SignUp} />
          <Route path="/session/:id" component={Session} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
