import React, { useState, useContext, useEffect } from "react";
import "./MyPatterns.css";
import UserService from "../../../../services/user-service";
import { AuthContext } from "../../../../contexts/auth-context";
import { GridContext } from "../../../../contexts/grid-context";
import LoginBox from "../../Grid/LoginBox/LoginBox";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAudio } from "@fortawesome/free-solid-svg-icons";

export default function MyPatterns() {
  const context = useContext(AuthContext);
  const gridContext = useContext(GridContext);
  const [service] = useState(new UserService());
  const [showPatterns, setShowPatterns] = useState(false);
  const [currentPatterns, setCurrentPatterns] = useState();
  const userUpdated = context.appUser;

  useEffect(() => {
    if (context.appUser) {
      getPatternsFromApi();
    }
  }, [userUpdated]);

  const showPatternFrame = () => {
    console.log("show pattern frame");
    setShowPatterns(!showPatterns);
  };

  const getPatternsFromApi = () => {
    service.getPatterns().then((result) => {
      if (context.appUser) {
        setCurrentPatterns(result);
      }
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
                  {currentPatterns ? (
                    currentPatterns.map((elem, key) => {
                      return (
                        <div key={key} className="">
                          <FontAwesomeIcon icon={faFileAudio} />
                          <span>{elem.name}</span>
                          <button onClick={() => loadPattern(elem.id)}>LOAD</button>
                        </div>
                      );
                    })
                  ) : (
                    <div>Loading patterns..</div>
                  )}
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
