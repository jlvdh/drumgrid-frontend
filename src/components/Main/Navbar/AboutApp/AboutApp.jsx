import React, {useState} from "react";
import "./AboutApp.css"

export default function AboutApp() {
  const [showAbout, setShowAbout] = useState(false)

  const showAboutFrame = () => {
    console.log('show about')
    setShowAbout(!showAbout);
  }

  return (
    <span className="navbar-aboutapp-text">
      <button onClick={() => showAboutFrame()}>about app</button>
      {showAbout && (
        <div className="navbar-aboutapp-showcontentbox">
          <div className="navbar-aboutapp-showcontentbox-content">
            <div className="navbar-aboutapp-showcontentbox-content-inside">
              About my app
              <button onClick={() => showAboutFrame()}>close</button>
            </div>
          </div>
        </div>
      )}
    </span>
  );
}
