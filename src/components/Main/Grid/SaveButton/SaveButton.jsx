import React, { useState, useContext } from "react";
import "./SaveButton.css";

// External imports
import UserService from "../../../../services/user-service";
import { AuthContext } from "../../../../contexts/auth-context";
import LoginBox from "../LoginBox/LoginBox";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function SaveButton(props) {
  const [showFloatingBoxSave, setshowFloatingBoxSave] = useState(false);
  const [patternName, setPatternName] = useState("");
  const [saveSuccessful, setSaveSuccessful] = useState(false);
  const [service] = useState(new UserService());
  const [appUser] = useContext(AuthContext);

  const saveButton = (e) => {
    e.preventDefault();
    setshowFloatingBoxSave(!showFloatingBoxSave);
  };

  const closeFloatingSaveBox = () => setshowFloatingBoxSave(false);
  const closeFloatingSaveBoxCompleted = () => {
    setshowFloatingBoxSave(false);
    setSaveSuccessful(false);
  };

  const sendData = () => {
    if (patternName) {
      // console.log(patternName.replace(/^\s+/g, "").replace(/[^A-Za-z0-9_\-!\s]+/g, "_"));
      // console.log(props.gridData);
      service.savePattern(patternName, props.gridData).then((result) => {
        console.log(result);
        if (result.message === "OK") {
          setSaveSuccessful(true);
        }
      });
    }
  };

  return (
    <>
      {console.log(appUser)}
      {!appUser ? (
        <div className="grid-block-transport grid-block-save">
          <button onClick={(e) => saveButton(e)}>SAVE</button>
          {showFloatingBoxSave && (
            <div className="floating-save-box floating-save-box-container">
              <LoginBox />
            </div>
          )}
        </div>
      ) : (
        <div className="grid-block-transport grid-block-save">
          <button onClick={(e) => saveButton(e)}>SAVE</button>
          {showFloatingBoxSave && (
            <div className="floating-save-box floating-save-box-container">
              {!saveSuccessful && (
                <span onClick={closeFloatingSaveBox} className="floating-save-box-close">
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              )}
              {!saveSuccessful ? (
                <div className="floating-save-box-container-fields">
                  <p>
                    Enter a name for the pattern you
                    <br />
                    want to save:
                  </p>
                  <p>
                    <input
                      type="text"
                      value={patternName}
                      onChange={(e) => setPatternName(e.target.value)}
                      name="patternname"
                      placeholder="Please provide a name"
                    />
                  </p>
                  <button onClick={sendData}>STORE</button>
                </div>
              ) : (
                <div className="floating-save-box-container-saved">
                  <span className="floating-save-box-container-saved-icon">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span>Pattern saved successfully!</span>
                  <button onClick={closeFloatingSaveBoxCompleted}>CLOSE</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
