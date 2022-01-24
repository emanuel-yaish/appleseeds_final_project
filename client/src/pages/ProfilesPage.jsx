import React from "react";
// import Nav from "../components/Nav";
import Profiles from "../components/Profiles";
import "./ProfilesPage.css";

function ProfilesPage(props) {
  return (
    <div className="profiles-page">
      <h2 className="profiles-page-header">Live Or Date</h2>
      <Profiles />
    </div>
  );
}

export default ProfilesPage;
