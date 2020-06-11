import React, { Component } from "react";
import "./Main.css";
import Navbar from "./Navbar/Navbar";
import Grid from "./Grid/Grid";
// import AuthService from "../../services/auth-service";

export default class Main extends Component {
  // state = {
  //   user: null,
  // };

  // service = new AuthService();

  // checkAuthenticated = () => {
  //   if (this.state.user === null) {
  //     this.service
  //       .isAuthenticated()
  //       .then((response) => {
  //         this.setState({
  //           user: response
  //         });
  //       })
  //       .catch((err) => {
  //         this.setState({
  //           user: false
  //         });
  //       });
  //   }
  // };

  // setUser = (user) => {
  //   this.setState({ user });
  // };

  render() {
    //this.checkAuthenticated();

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
