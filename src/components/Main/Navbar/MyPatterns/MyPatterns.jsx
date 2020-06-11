import React, { useState, useContext } from "react";
import "./MyPatterns.css";
import UserService from "../../../../services/user-service";
import { AuthContext } from "../../../../contexts/auth-context";
import { GridContext } from "../../../../contexts/grid-context";
import LoginBox from "../../Grid/LoginBox/LoginBox";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAudio } from "@fortawesome/free-solid-svg-icons";

export default function MyPatterns() {
  const [service] = useState(new UserService());
  const context = useContext(AuthContext);
  const gridContext = useContext(GridContext);
  const [showPatterns, setShowPatterns] = useState(false);
  const [currentPatterns, setCurrentPatterns] = useState();

  const showPatternFrame = () => {
    console.log("show pattern frame");
    setShowPatterns(!showPatterns);
    service.getPatterns().then((result) => {
      setCurrentPatterns(result);
    });
  };

  const loadPattern = (patternId) => {
    console.log(`Load pattern with id: ${patternId}`);
    gridContext.updateGrid(patternId);
  };

  return (
    <>
      <span className="navbar-mypatterns-text">
        <button onClick={() => showPatternFrame()}>my patterns</button>
        {showPatterns && (
          <div className="navbar-mypatterns-showcontentbox">
            <div className="navbar-mypatterns-showcontentbox-content-inside">
              {!context.appUser ? (
                <LoginBox />
              ) : (
                <span>
                  {currentPatterns.map((elem, key) => {
                    return <div key={key} className="">
                      <FontAwesomeIcon icon={faFileAudio} />
                      <span>{elem.name}</span>
                      <button onClick={() => loadPattern(elem.id)}>LOAD</button>
                    </div>;
                  })}
                  <button onClick={() => showPatternFrame()}>close</button>
                </span>
              )}
            </div>
          </div>
        )}
      </span>
    </>
  );
}
