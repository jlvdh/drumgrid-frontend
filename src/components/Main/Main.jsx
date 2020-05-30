import React, { Component } from "react";
import "./Main.css";
import Navbar from "./Navbar/Navbar";
import Grid from "./Grid/Grid";

export default class Main extends Component {
  render() {
    return (
      <>
        <div className="main-container">
          <div className="main-box">
            <header>
              <Navbar />
            </header>
            <section className="main-section">
              <Grid />
            </section>
          </div>
        </div>
        <footer className="main-footer" />
      </>
    );
  }
}
