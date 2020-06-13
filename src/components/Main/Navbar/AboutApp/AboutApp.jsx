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
          <div className="navbar-aboutapp-showcontentbox-content navbar-aboutapp-showcontentbox-content-scrollbar">
            <p className="navbar-aboutapp-showcontentbox-content-textcenter">
              <img src="/images/logo.png" className="navbar-aboutapp-showcontentbox-content-logo" alt="logo" />
              DRUMGRID
            </p>
            <br />
            <p>
              This app is a graduation project for the web development bootcamp from IronHack.
              {/* <img
                  className="navbar-aboutapp-showcontentbox-content-ih"
                  src="/images/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png"
                  alt="ironhack"
                /> */}
            </p>
            <br />
            <p className="navbar-aboutapp-showcontentbox-content-textborder">MANUAL</p>
            <br />
            <p>
              Click on the sound names to hear an example of the sound you want to program. Then just click on a square
              within the lane of the sound you want, and it will program the sound to play at that spot.
            </p>
            <br />
            <p>
              If you want to save your pattern, click on the SAVE button. You will need to login (or create an account)
              to save your pattern. The app will allow you to do that from there as well.
            </p>
            <p>You can store up to 5 patterns in your account.</p>
            <br />
            <p>
              You can manage your saved patterns through MY PATTERNS, where you can load your saved pattern or delete
              one.
            </p>
            <br />
            <p>You can manage your profile via PROFILE where you can rename your account or change your password.</p>
            <br />
            <p className="navbar-aboutapp-showcontentbox-content-textborder">THANKS</p>
            <br />
            <p>
              I would like to thank everyone who was involved in making this little app. This includes the fantastic
              teachers of the bootcamp (Thanks Jorg, Lloyd & Rana!), my classmates who are all amazing people, my
              friends who helped me break this app enough times for it to work, and my wife who had to endure me and
              code-speak during this period 🙈 Te quiero ❤️
            </p>
            <br />

            <button onClick={() => showAboutFrame()}>CLOSE WINDOW</button>
            <br />
            <br />
          </div>
        </div>
      )}
    </span>
  );
}
