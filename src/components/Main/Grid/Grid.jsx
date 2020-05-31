import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Tone from "tone";
import "./Grid.css";
import { gridInitData } from "./GridInitData/GridInitData";

// Samples
import C1 from "./Samples/kick.mp3";
import D1 from "./Samples/clap.mp3";
import E1 from "./Samples/closedhh.mp3";
import F1 from "./Samples/openhh.mp3";

// Font Awesome Icons
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default class Grid extends Component {
  state = {
    playButtonDisabled: true,
    showPlayIcon: true,
    yellowGridBlock: false,
    musicTransport: true,
    samplerLoaded: false,
    transport: "",
    gridData: gridInitData,
  };

  componentDidMount() {
    // Tone.context.latencyHint = "balanced";
    Tone.context.latencyHint = "fastest";
    this.loadSampler();
    this.refreshData();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  refreshData = () => {
    const transportpos = Tone.Transport.position;
    console.log(Tone.Transport.progress);
    this.setState({ transport: transportpos });
    this.setState({ gridData: this.state.gridData });
  };

  loadSampler = () => {
    // const drumSamples = new Tone.Buffers({
    //   C1, D1, E1, F1
    // })

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
          Tone.start();
          console.log("audio is ready");
          this.setState({playButtonDisabled: false})
        },
      }
    ).toMaster();
  };

  playButton = (e) => {
    console.log("click");
    e.preventDefault();
    this.setState({ showPlayIcon: !this.state.showPlayIcon, musicTransport: !this.state.musicTransport });
    this.synthTestLoop();
  };

  playSample = (e, sample) => {
    // if (e) {
    //   e.preventDefault();
    // }
    // this.sampler.get(sample).start(0, 0, "128m", 0, 0.8);
    this.sampler.get(sample).start();
  };

  scheduleTimelineBlock = (position, sound, gridSoundPosition, gridStepPosition) => {
    const gridArray = this.state.gridData[0].grid;

    const scheduleID = Tone.Transport.schedule((time) => {
      this.playSample("", sound);
    }, position);

    gridArray[gridSoundPosition].steps[gridStepPosition].id = scheduleID;
  };

  clearTimelineBlock = (scheduleId, gridSoundPosition, gridStepPosition) => {
    const gridArray = this.state.gridData[0].grid;
    let gridId = gridArray[gridSoundPosition].steps[gridStepPosition].id;

    if (gridId >= 0) {
      Tone.Transport.clear(scheduleId);
      gridId = null;
    } else {
      console.log("GridID was empty");
    }
  };

  changeGridBlock = (stepValue, elemSound, elemMuted) => {
    const gridArray = this.state.gridData[0].grid;
    //console.log(`${stepValue.time}, elemSound: ${elemSound}, elemMuted: ${elemMuted}`);

    const findSoundNumber = gridArray.findIndex((x) => x.sound === elemSound);
    const findStepNumber = gridArray[findSoundNumber].steps.findIndex((y) => y.time === stepValue.time);
    gridArray[findSoundNumber].steps[findStepNumber].active = !gridArray[findSoundNumber].steps[findStepNumber].active;
    let gridActive = gridArray[findSoundNumber].steps[findStepNumber].active;
    let gridId = gridArray[findSoundNumber].steps[findStepNumber].id;

    if (gridActive) {
      this.scheduleTimelineBlock(stepValue.time, elemSound, findSoundNumber, findStepNumber);
    } else {
      this.clearTimelineBlock(gridId, findSoundNumber, findStepNumber);
    }
    this.refreshData();
  };

  synthTestLoop = () => {
    console.log("loop");

    Tone.Transport.bpm.value = 120;

    // Check for start/stop
    if (this.state.musicTransport) {
      Tone.Transport.position = "0";
      Tone.Transport.setLoopPoints(0, "1m");
      Tone.Transport.loop = true;
      Tone.Transport.start();

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
      Tone.Transport.stop();
      Tone.Transport.position = "0";
      clearInterval(this.intervalId);
      this.refreshData();
    }
  };

  render() {
    return (
      <>
        <div className="grid-container noselect">
          <div className="grid-line">
            <div className="grid-block-transport grid-icons-play">
              {this.state.playButtonDisabled && (
                <button>
                  <FontAwesomeIcon id="grid-icons-play-button" icon={faClock} />
                </button>
              )}
              {!this.state.playButtonDisabled && this.state.showPlayIcon ? (
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
          {/* Start of grid system */}
          {/* -------------------- */}
          {this.state.gridData[0].grid.map((elem, key) => (
            <div key={key} className="grid-line">
              <div
                className="grid-block-instrument grid-block-instrument-name"
                onClick={(e) => this.playSample(e, elem.sound)}
              >
                {elem.name}
              </div>
              {elem.steps.map((value, key) => {
                if (!value.active) {
                  return (
                    <div
                      key={key}
                      className="grid-block-instrument grid-block-sequence"
                      onClick={(e) => this.changeGridBlock(value, elem.sound, elem.muted)}
                    />
                  );
                } else {
                  return (
                    <div
                      key={key}
                      className="grid-block-instrument grid-block-sequence-yellow"
                      onClick={(e) => this.changeGridBlock(value, elem.sound, elem.muted)}
                    />
                  );
                }
              })}
            </div>
          ))}
        </div>
      </>
    );
  }
}
