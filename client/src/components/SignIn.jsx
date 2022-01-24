import React from "react";
import CostumInput from "./CostumInput";

function SignIn({ userInput, handleInputChange }) {
  return (
    <div className="sign-in">
      <CostumInput
        onInputChangeCallBack={handleInputChange}
        label="Email"
        type="text"
        name="email"
        value={userInput.email}
        id="email-input"
      />
      <CostumInput
        onInputChangeCallBack={handleInputChange}
        label="Password"
        type="password"
        name="password"
        value={userInput.password}
        id="password-input"
      />
    </div>
  );
}

export default SignIn;
