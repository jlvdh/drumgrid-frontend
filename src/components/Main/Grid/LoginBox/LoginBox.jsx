import React, { useState, useContext } from "react";
import "./LoginBox.css";
import AuthService from "../../../../services/auth-service";
import { AuthContext } from "../../../../contexts/auth-context";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPaper } from "@fortawesome/free-solid-svg-icons";

export default function LoginBox() {

  const [setAppUser] = useContext(AuthContext);
  const [firstScreen, setFirstScreen] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const service = new AuthService();

//   const handleClick = (e) => {
//     if (this.state.firstScreen) {
//       this.setState({ firstScreen: false });
//       return;
//     }
//   };

//   const handleInput = (e) => {
//     let { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    service
      .login(username, password)
      .then((response) => {
        setUsername("");
        setPassword("");
        setAppUser(response)
      })
      .catch((error) => console.log(error));
  };

  const handleSignupFormSubmit = (event) => {
    event.preventDefault();
    service
      .signup(username, password)
      .then((response) => {
                setUsername("");
                setPassword("");
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const forgotPassword = () => {
    console.log("reset password");
  };


  return (
    <>
      {signUp ? (
        <div className="loginbox-form">
          <form onSubmit={handleSignupFormSubmit}>
            <div className="loginbox-form-header">
              <div className="loginbox-form-text">USERNAME</div>
              <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="loginbox-form-header">
              <div className="loginbox-form-text">PASSWORD</div>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="loginbox-form-submit">
              <button type="submit">SIGNUP</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="loginbox-container">
          {firstScreen ? (
            <span className="loginbox-container-prelogin">
              <span className="loginbox-container-prelogin-icon">
                <FontAwesomeIcon icon={faHandPaper} />
              </span>
              <span className="loginbox-container-prelogin-text">PLEASE LOG IN</span>
              <button onClick={(e) => setFirstScreen(false)}>PROCEED</button>
              <p className="loginbox-container-prelogin-signup" onClick={() => setSignUp(true)}>
                Sign up instead?
              </p>
            </span>
          ) : (
            <div className="loginbox-form">
              <form onSubmit={handleLoginFormSubmit}>
                <div className="loginbox-form-header">
                  <div className="loginbox-form-text">USERNAME</div>
                  <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="loginbox-form-header">
                  <div className="loginbox-form-text">PASSWORD</div>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginbox-form-passwordreset" onClick={forgotPassword}>
                  FORGOT YOUR PASSWORD?
                </div>
                <div className="loginbox-form-submit">
                  <button type="submit">LOGIN</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}
