import React, { useState, useContext } from "react";
import "./Profile.css";
import { AuthContext } from "../../../../contexts/auth-context";
import LoginBox from "../../Grid/LoginBox/LoginBox";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const [showProfile, setShowProfile] = useState(false);
  const context = useContext(AuthContext);

  const showProfileFrame = () => {
    console.log("show profile frame");
    setShowProfile(!showProfile);
  };

  const signOut = () => {
    console.log("sign out");
    context.logout();
  };

  return (
    <span className="navbar-profile-text">
      {!context.appUser && <button onClick={() => showProfileFrame()}>login</button>}
      {context.appUser && <button onClick={() => showProfileFrame()}>profile</button>}
      {showProfile && (
        <div className="navbar-profile-showcontentbox">
          <div className="navbar-profile-showcontentbox-content-inside">
            {!context.appUser ? (
              <LoginBox />
            ) : (
              <span className="navbar-profile-showcontentbox-content-inside-pads">
                <div className="navbar-profile-showcontentbox-content-inside-close">
                  <button onClick={() => showProfileFrame()}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <div className="navbar-profile-showcontentbox-content-inside-fat">
                  <p>USERNAME</p>
                  <span className="navbar-profile-showcontentbox-content-inside-normal">
                    {context.appUser.username}
                  </span>
                  <span className="navbar-profile-showcontentbox-content-inside-button">
                    <button>UPDATE</button>
                  </span>
                </div>
                <div className="navbar-profile-showcontentbox-content-inside-fat">
                  <p>PASSWORD</p>
                  <span className="navbar-profile-showcontentbox-content-inside-normal">●●●●●●●●●●</span>
                  <span className="navbar-profile-showcontentbox-content-inside-button">
                    <button>UPDATE</button>
                  </span>
                </div>
                <button onClick={() => signOut()}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </span>
  );
}
