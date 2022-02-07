import React from "react";
import "./RadioButtons.css";

function RadioButtons(props) {
  const { mainLabel, options, onInputChangeCallBack } = props;

  return (
    <div className="radio-buttons">
      <label className="radio-buttons-main-label">{mainLabel}</label>
      <div className="radio-buttons-container">
        {options.map((option) => (
          <React.Fragment key={option}>
            <input
              onChange={onInputChangeCallBack}
              className="radio-buttons-input"
              type="radio"
              id={option}
              name={mainLabel.toLowerCase()}
              value={option}
            />
            <label className="radio-buttons-label" htmlFor={option}>
              {option}
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default RadioButtons;
