import React, { useState, useContext } from "react";
import "./Profile.css";
import AuthService from "../../../../services/auth-service";
import { AuthContext } from "../../../../contexts/auth-context";
import LoginBox from "../../Grid/LoginBox/LoginBox";

export default function Profile() {
  const [showProfile, setShowProfile] = useState(false);
  const [service] = useState(new AuthService());
  const context = useContext(AuthContext);

  const showProfileFrame = () => {
    console.log("show profile frame");
    setShowProfile(!showProfile);
  };

  return (
    <span className="navbar-profile-text">
      <button onClick={() => showProfileFrame()}>profile</button>
      {showProfile && (
        <div className="navbar-profile-showcontentbox">
          <div className="navbar-profile-showcontentbox-content-inside">
            {!context.appUser ? (
              <LoginBox />
            ) : (
              <span>
                <p>prrrofile</p>
                <button onClick={() => showProfileFrame()}>close</button>
              </span>
            )}
          </div>
        </div>
      )}
    </span>
  );
}
