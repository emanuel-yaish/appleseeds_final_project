import React from "react";
import "./TextArea.css";

function TextArea({
  label,
  name,
  id,
  value,
  rows,
  cols,
  onInputChangeCallBack,
}) {
  return (
    <div className="text-area-container">
      <label className="text-area-label" htmlFor={name}>
        {label}
      </label>

      <textarea
        className="text-area"
        id={id}
        name={name}
        onChange={onInputChangeCallBack}
        rows={rows}
        cols={cols}
        value={value}
      />
    </div>
  );
}

export default TextArea;
