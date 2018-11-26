import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import NotFound from "./components/NotFound/NotFound";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={List} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
