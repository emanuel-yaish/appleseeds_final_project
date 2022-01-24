import React from "react";
import { NavLink } from "react-router-dom";
import select from "../assets/images/decision.svg";
import chatDate from "../assets/images/hello.svg";
import voiceDate from "../assets/images/microphone-voice.svg";
import videoDate from "../assets/images/conference-video-call.svg";
import events from "../assets/images/schedule-calendar.svg";
import speedDate from "../assets/images/time-limit.svg";
import tripDate from "../assets/images/road-map.svg";
import partyDate from "../assets/images/concert.svg";
import "./HowItWorks.css";

function HowItWorks(props) {
  console.log(props);
  return (
    <div className="how-it-works">
      <h2 className="how-it-works-title">How It Works</h2>
      <h3 className="how-it-works-sub-title">you choose</h3>
      <div className="how-it-works-container">
        <div className="how-it-works-live">
          <NavLink className="how-it-works-link" to="/signpage">
            Live
          </NavLink>
          <div className="how-it-works-select">
            <h3 className="how-it-works-select-title">1. Select Match</h3>
            <img className="decision-image" src={select} alt="decision" />
          </div>
          <h3 className="how-it-works-select-title">2. Start Dating</h3>
          <div className="header-link-container select-background">
            <NavLink className="header-link" to="/signpage">
              <img
                className="header-link-image"
                src={chatDate}
                alt="My Happy SVG"
              />
              <div className="header-link-text">Chat Date</div>
            </NavLink>
            <NavLink className="header-link" to="/signpage">
              <img
                className="header-link-image"
                src={voiceDate}
                alt="My Happy SVG"
              />
              <div className="header-link-text">Voice Date</div>
            </NavLink>
            <NavLink className="header-link" to="/signpage">
              <img
                className="header-link-image"
                src={videoDate}
                alt="My Happy SVG"
              />
              <div className="header-link-text">Viedo Date</div>
            </NavLink>
          </div>
        </div>
        <div className="how-it-works-or">
          <div className="how-it-works-seperator"></div>
          <h3 className="how-it-works-sub-title">OR</h3>
          <div className="how-it-works-seperator"></div>
        </div>
        <div className="how-it-works-date">
          <NavLink className="how-it-works-link" to="/events">
            Date
          </NavLink>
          <div className="how-it-works-select">
            <h3 className="how-it-works-select-title">1. Select Event</h3>
            <img className="decision-image" src={events} alt="events" />
          </div>
          <h3 className="how-it-works-select-title">2. Start Dating</h3>
          <div className="header-link-container select-background">
            <NavLink className="header-link" to="/events">
              <img
                className="header-link-image"
                src={speedDate}
                alt="My Happy SVG"
              />
              <div className="header-link-text">Speed Date</div>
            </NavLink>
            <NavLink className="header-link" to="/events">
              <img
                className="header-link-image"
                src={tripDate}
                alt="My Happy SVG"
              />
              <div className="header-link-text">Trip Date</div>
            </NavLink>
            <NavLink className="header-link" to="/events">
              <img
                className="header-link-image"
                src={partyDate}
                alt="My Happy SVG"
              />
              <div className="header-link-text">Party Date</div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
