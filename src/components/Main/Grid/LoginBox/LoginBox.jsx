import React, { useState, useContext } from "react";
import "./LoginBox.css";
import AuthService from "../../../../services/auth-service";
import { AuthContext } from "../../../../contexts/auth-context";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPaper, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

export default function LoginBox() {
  const context = useContext(AuthContext);
  const [firstScreen, setFirstScreen] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const service = new AuthService();

  const handleLoginFormSubmit = (event) => {
    setWrongPassword(false);
    event.preventDefault();
    context.makeLogin(username, password).then((response) => {
      if (!response.username) {
        setWrongPassword(true);
        setPassword("");
      } else {
        setUsername("");
        setPassword("");
      }
    });
  };

  const handleSignupFormSubmit = (event) => {
    event.preventDefault();
    service
      .signup(username, password)
      .then((response) => {
        setUsername("");
        setPassword("");
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
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="loginbox-form-submit">
              <button type="submit">SIGNUP</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="loginbox-container">
          {firstScreen ? (
            <div className="loginbox-container-prelogin-box">
              <div>
                <span className="loginbox-container-prelogin-icon">
                  <FontAwesomeIcon icon={faHandPaper} />
                </span>
              </div>
              <div className="loginbox-container-prelogin-box-contents">
                <span className="loginbox-container-prelogin-box-contents-header">PLEASE LOG IN</span>
                <p>You are currently not logged in. Please log in to access your patterns.</p>
                <button onClick={(e) => setFirstScreen(false)}>
                  PROCEED
                </button>
              </div>
              <p className="loginbox-container-prelogin-signup" onClick={() => setSignUp(true)}>
                <span>Sign up instead?</span>
              </p>
            </div>
          ) : (
            <div className="loginbox-form">
              <form onSubmit={handleLoginFormSubmit}>
                <div className="loginbox-form-header">
                  <div className="loginbox-form-text">USERNAME</div>
                  {wrongPassword ? (
                    <input
                      className="loginbox-form-error"
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  ) : (
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  )}
                </div>
                <div className="loginbox-form-header">
                  <div className="loginbox-form-text">PASSWORD</div>
                  {wrongPassword ? (
                    <input
                      className="loginbox-form-error"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  ) : (
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  )}
                </div>
                <div className="loginbox-form-passwordreset" onClick={forgotPassword}>
                  FORGOT YOUR PASSWORD?
                </div>
                <div className="loginbox-form-submit">
                  <button type="submit">
                    <FontAwesomeIcon icon={faSignInAlt} />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}
