import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Tone from "tone";
import "./Grid.css";

// Samples
import C1 from "./Samples/kick.mp3";
import D1 from "./Samples/clap.mp3";
import E1 from "./Samples/closedhh.mp3";
import F1 from "./Samples/openhh.mp3";

// Font Awesome Icons
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";

export default class Grid extends Component {
  state = {
    initializedAudio: false,
    showPlayIcon: true,
    yellowGridBlock: false,
    musicTransport: true,
    samplerLoaded: false,
    transport: "",
    gridData: []
  };

  componentDidMount() {
    // Tone.start();
    Tone.context.latencyHint = "balanced";
    console.log("audio is ready");
    this.loadSampler();
    this.refreshData();
    const gridDataInit = [
      {
        pattern: "MyFirstPattern",
        options: {
          tempo: 120,
          swing: 0,
          mainvol: 80,
        },
        grid: [
          {
            name: "kick",
            sound: "C1",
            vol: 1,
            muted: 0,
            steps: [
              { time: "0:0:0", active: 0, id: 0 },
              { time: "0:0:2", active: 0, id: 0 },
              { time: "0:1:0", active: 0, id: 0 },
              { time: "0:1:2", active: 1, id: 0 },
              { time: "0:2:0", active: 0, id: 0 },
              { time: "0:2:2", active: 0, id: 0 },
              { time: "0:3:0", active: 0, id: 0 },
              { time: "0:3:2", active: 0, id: 0 },
              { time: "1:0:0", active: 1, id: 0 },
              { time: "1:0:2", active: 0, id: 0 },
              { time: "1:1:0", active: 0, id: 0 },
              { time: "1:1:2", active: 0, id: 0 },
              { time: "1:2:0", active: 0, id: 0 },
              { time: "1:2:2", active: 1, id: 0 },
              { time: "1:3:0", active: 0, id: 0 },
              { time: "1:3:2", active: 0, id: 0 },
            ],
          },
          {
            name: "clap",
            sound: "D1",
            vol: 1,
            muted: 0,
            steps: [
              { time: "0:0:0", active: 0, id: 0 },
              { time: "0:0:2", active: 1, id: 0 },
              { time: "0:1:0", active: 0, id: 0 },
              { time: "0:1:2", active: 0, id: 0 },
              { time: "0:2:0", active: 0, id: 0 },
              { time: "0:2:2", active: 0, id: 0 },
              { time: "0:3:0", active: 1, id: 0 },
              { time: "0:3:2", active: 0, id: 0 },
              { time: "1:0:0", active: 0, id: 0 },
              { time: "1:0:2", active: 0, id: 0 },
              { time: "1:1:0", active: 0, id: 0 },
              { time: "1:1:2", active: 1, id: 0 },
              { time: "1:2:0", active: 1, id: 0 },
              { time: "1:2:2", active: 0, id: 0 },
              { time: "1:3:0", active: 0, id: 0 },
              { time: "1:3:2", active: 1, id: 0 },
            ],
          },
          {
            name: "closed hihat",
            sound: "E1",
            vol: 1,
            muted: 0,
            steps: [
              { time: "0:0:0", active: 0, id: 0 },
              { time: "0:0:2", active: 0, id: 0 },
              { time: "0:1:0", active: 0, id: 0 },
              { time: "0:1:2", active: 0, id: 0 },
              { time: "0:2:0", active: 1, id: 0 },
              { time: "0:2:2", active: 0, id: 0 },
              { time: "0:3:0", active: 0, id: 0 },
              { time: "0:3:2", active: 1, id: 0 },
              { time: "1:0:0", active: 1, id: 0 },
              { time: "1:0:2", active: 0, id: 0 },
              { time: "1:1:0", active: 0, id: 0 },
              { time: "1:1:2", active: 0, id: 0 },
              { time: "1:2:0", active: 0, id: 0 },
              { time: "1:2:2", active: 0, id: 0 },
              { time: "1:3:0", active: 0, id: 0 },
              { time: "1:3:2", active: 1, id: 0 },
            ],
          },
          {
            name: "open hihat",
            sound: "F1",
            vol: 1,
            muted: 0,
            steps: [
              { time: "0:0:0", active: 0, id: 0 },
              { time: "0:0:2", active: 0, id: 0 },
              { time: "0:1:0", active: 1, id: 0 },
              { time: "0:1:2", active: 1, id: 0 },
              { time: "0:2:0", active: 0, id: 0 },
              { time: "0:2:2", active: 0, id: 0 },
              { time: "0:3:0", active: 0, id: 0 },
              { time: "0:3:2", active: 0, id: 0 },
              { time: "1:0:0", active: 1, id: 0 },
              { time: "1:0:2", active: 0, id: 0 },
              { time: "1:1:0", active: 0, id: 0 },
              { time: "1:1:2", active: 1, id: 0 },
              { time: "1:2:0", active: 0, id: 0 },
              { time: "1:2:2", active: 0, id: 0 },
              { time: "1:3:0", active: 1, id: 0 },
              { time: "1:3:2", active: 0, id: 0 },
            ],
          },
        ],
      },
    ];
    this.setState({gridData: gridDataInit})
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  refreshData = () => {
    const transportpos = Tone.Transport.position;
    // console.log(Tone.Transport.progress)
    this.setState({ transport: transportpos });
  };

  loadSampler = () => {
      this.sampler = new Tone.Players(
        {
          C1,
          D1,
          E1,
          F1,
        },
        {
          volume: -1,
          fadeOut: "64n",
          onload: () => {
            this.setState({ samplerLoaded: true });
          },
        }
      ).toMaster();

  };

  playButton = (e) => {
    console.log("click");
    e.preventDefault();
    // this.setState({ initializedAudio: true });
    this.setState({ showPlayIcon: !this.state.showPlayIcon, musicTransport: !this.state.musicTransport });
    this.synthTestLoop();
  };

  playSample = (e, sample) => {
    if (e) {e.preventDefault();}
    // if (!time) {time = 0}
    this.sampler.get(sample).start(0, 0, "128m", 0, 0.8);
    console.log("playsample");
  };

  changeGridBlock = () => {
    
  }


  synthTestLoop = () => {
    console.log("loop");


    Tone.Transport.bpm.value = 180;

    // Check for start/stop
    if (this.state.musicTransport) {
      Tone.Transport.position = "0";
      Tone.Transport.setLoopPoints(0, "2m");
      Tone.Transport.loop = true;
      Tone.Transport.start("+0.1");

      
      // Tone.Transport.schedule(this.playme, '3,9m')
      // Tone.Transport.schedule((time) => {
      //   console.log('DING')
      //   this.playSample("", "F1");
      // }, "0:0");
      // Tone.Transport.schedule((time) => {
      //   console.log('DING')
      //   this.playSample("", "C1");
      // }, "0:0");
      // Tone.Transport.schedule((time) => {
      //         console.log("DING");
      //         this.playSample("", "D1");
      //       }, "0:1");
      // Tone.Transport.schedule((time) => {
      //   console.log('DING')
      //   this.playSample("", "E1");
      // }, "0:0:2");
      //       Tone.Transport.schedule((time) => {
      //         console.log("DING");
      //         this.playSample("", "C1");
      //       }, "0:1");

      // Tone.Transport.schedule((time) => {
      //   console.log('DING')
      //   this.playSample("", "F1");
      // }, "1:0");

      // Tone.Transport.schedule((time) => {
      //   console.log("DING");
      //   this.playSample("", "F1");
      // }, "1:1");
      // Tone.Transport.schedule((time) => {
      //   console.log("DING");
      //   this.playSample("", "F1");
      // }, "1:2");
      // Tone.Transport.schedule((time) => {
      //   console.log("DING");
      //   this.playSample("", "F1");
      // }, "1:3");
      //       Tone.Transport.schedule((time) => {
      //   console.log("DING");
      //   this.playSample("", "F1");
      // }, "1:3:2");

      // normalised timeline
      //console.log(Tone.Timeline)

      this.intervalId = setInterval(this.refreshData.bind(this), 50);
    } else {
      Tone.Transport.position = "0:0:0";
      Tone.Transport.stop();
      clearInterval(this.intervalId);
      this.refreshData();
    }
  };

  render() {
    // const gridLevel = [
    //   "0:0",
    //   "0:0:2",
    //   "0:1",
    //   "0:1:2",
    //   "0:2",
    //   "0:2:2",
    //   "0:3",
    //   "0:3:2",
    //   "1:0",
    //   "1:0:2",
    //   "1:1",
    //   "1:1:2",
    //   "1:2",
    //   "1:2:2",
    //   "1:3",
    //   "1:3:2",
    // ];

    return (
      <>
        <div className="grid-container noselect">
          <div className="grid-line">
            <div className="grid-block-transport grid-icons-play">
              {this.state.showPlayIcon ? (
                <button>
                  <FontAwesomeIcon id="grid-icons-play-button" icon={faPlay} onClick={this.playButton} />
                </button>
              ) : (
                <button>
                  <FontAwesomeIcon id="grid-icons-play-button" icon={faPause} onClick={this.playButton} />
                </button>
              )}
            </div>
            <div className="grid-block-transport grid-block-pattern ">
              PATTERN
              <span className="grid-block-pattern-line" />
              <span className="grid-block-pattern-name">{this.state.transport}</span>
            </div>
          </div>
          <div className="grid-line">
            <div className="grid-block-instrument grid-block-instrument-name" onClick={(e) => this.playSample(e, "C1")}>
              kick
            </div>
            {gridLevel.map((element, key) => (
              <div
                key={key}
                className="grid-block-instrument grid-block-sequence"
                onClick={() => console.log("gridclick")}
              />
            ))}
          </div>
          <div className="grid-line">
            <div className="grid-block-instrument grid-block-instrument-name" onClick={(e) => this.playSample(e, "D1")}>
              clap
            </div>
            {gridLevel.map((element, key) => (
              <div
                key={key}
                className="grid-block-instrument grid-block-sequence"
                onClick={() => console.log("gridclick")}
              />
            ))}
          </div>
          <div className="grid-line">
            <div className="grid-block-instrument grid-block-instrument-name" onClick={(e) => this.playSample(e, "E1")}>
              closed hihat
            </div>
            {gridLevel.map((element, key) => (
              <div
                key={key}
                className="grid-block-instrument grid-block-sequence"
                onClick={() => console.log("gridclick")}
              />
            ))}
          </div>
          <div className="grid-line">
            <div className="grid-block-instrument grid-block-instrument-name-button" onClick={(e) => this.playSample(e, "F1")}>
              open hihat
            </div>
            {gridLevel.map((element, key) => (
              <div
                key={key}
                className="grid-block-instrument grid-block-sequence"
                onClick={() => console.log("gridclick")}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}
