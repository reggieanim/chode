import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Components/Home";
import Contact from "./Components/Contact";
import NoMatch from "./Components/NoMatch";
import Navbar from "./Components/Navbar";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Navbar />
        <Switch>
          
          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
