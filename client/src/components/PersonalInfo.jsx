import React from "react";
import CostumInput from "../components/CostumInput";
import RadioButtons from "./RadioButtons";
import { MultiSelect } from "react-multi-select-component";
import TextArea from "../components/TextArea";

function PersonalInfo({ userInput, handleInputChange, selected, setSelected }) {
  const gender = ["Male", "Female"];
  // const status = ["Single", "Divorced"];
  // const yesNoQuestion = ["Yes", "No"];
  const options = [
    { label: "Surfing 🏄‍♂️", value: "surfing" },
    { label: "Reading 📚", value: "reading" },
    { label: "Hiking 🚶‍♂️", value: "hiking" },
    { label: "Acting 🎭", value: "acting" },
    { label: "Singing 🎙", value: "singing" },
  ];
  return (
    <div className="personal-info">
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
        name="birthDay"
        value={userInput.birthDay}
        id="birthday-input"
      />
      <RadioButtons
        onInputChangeCallBack={handleInputChange}
        mainLabel="Gender"
        options={gender}
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
        label="Location"
        type="text"
        name="location"
        value={userInput.location}
        id="location-input"
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
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      <TextArea
        label="About"
        name="about"
        id="about-input"
        value={userInput.about}
        onInputChangeCallBack={handleInputChange}
        cols={40}
        rows={5}
      />
    </div>
  );
}

export default PersonalInfo;
