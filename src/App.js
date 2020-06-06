import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Main from "./components/Main/Main";

export default class App extends Component {
  render() {
    return (
      <>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
        </div>
      </>
    );
  }
}
