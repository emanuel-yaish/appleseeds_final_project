import React from "react";
import CostumInput from "./CostumInput";

function Preferences({ userInput, handleInputChange }) {
  return (
    <div className="preferences">
      <CostumInput
        onInputChangeCallBack={handleInputChange}
        label="Name"
        type="text"
        name="name"
        value={userInput.name}
        id="name"
      />
      <CostumInput
        onInputChangeCallBack={handleInputChange}
        label="Birthday"
        type="date"
        name="birthday"
        value={userInput.birthday}
        id="birthday-input"
      />
      <CostumInput
        onInputChangeCallBack={handleInputChange}
        label="Avatar"
        type="text"
        name="avatar"
        value={userInput.avatar}
        id="avatar-input"
      />
      <CostumInput
        onInputChangeCallBack={handleInputChange}
        label="Height"
        type="number"
        name="height"
        value={userInput.height}
        id="height-input"
      />
      <CostumInput
        onInputChangeCallBack={handleInputChange}
        label="Status"
        type="text"
        name="status"
        value={userInput.status}
        id="status-input"
      />
    </div>
  );
}

export default Preferences;
