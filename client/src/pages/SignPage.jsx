import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import liveOrDateApi from "../api/liveOrDateApi";
import StepsNav from "../components/StepsNav";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import "./SignPage.css";

function SignPage(props) {
  let navigate = useNavigate();

  const steps = ["SignIn", "SignUp"];

  const [currentFormType, setCurrentFormType] = useState(steps[0]);
  const [userInput, setuserInput] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleFormTypeChange = (formType) => {
    setCurrentFormType(formType);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setuserInput({ ...userInput, [name]: value });
  };

  const sign = async (e) => {
    try {
      e.preventDefault();
      const path =
        currentFormType === steps[0] ? "/users/signin" : "/users/signup";

      console.log(userInput);
      const response = await liveOrDateApi.post(path, userInput);
      if (response.data.status === "success") {
        currentFormType === steps[0]
          ? navigate("/profiles")
          : navigate("/newprofile");
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="sign-page">
      <div className="form-container">
        <div className="new-user-header">
          <h2 className="form-title">
            <span className="form-title-black">Welcome To</span> Live Or Date
          </h2>
          <p className="form-intro">
            Let's {currentFormType === steps[0] ? "Sign In." : "Sign Up."}
          </p>
        </div>
        <StepsNav
          formTypeChangeCallback={handleFormTypeChange}
          steps={steps}
          currentFormType={currentFormType}
        />

        <form className="new-user-form">
          <div className="form-instruction-container">
            <p className="form-instruction">Enter your details below.</p>
          </div>

          {currentFormType === steps[0] ? (
            <SignIn
              userInput={userInput}
              handleInputChange={handleInputChange}
            />
          ) : (
            <SignUp
              userInput={userInput}
              handleInputChange={handleInputChange}
            />
          )}

          <div className="form-button-container">
            <button onClick={sign} className="form-button">
              {currentFormType === steps[0] ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>
        {currentFormType === steps[0] ? (
          <div className="forgot-password-container">
            <NavLink to="/newprofile" className="forgot-password">
              forgot password
            </NavLink>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SignPage;
