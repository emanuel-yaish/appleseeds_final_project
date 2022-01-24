import React from "react";
import { NavLink } from "react-router-dom";
import chatDate from "../assets/images/hello.svg";
import voiceDate from "../assets/images/microphone-voice.svg";
import videoDate from "../assets/images/conference-video-call.svg";
import "./Header.css";

function Header(props) {
  return (
    <div className="header">
      <div className="header-intro">
        <h1 className="header-intro-title">
          <span className="flicker">Live</span> or Date
        </h1>
        <p className="header-intro-slogan">Why wait while you can Date</p>
        <div className="header-link-container">
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
    </div>
  );
}

export default Header;
