import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import liveOrDateApi from "../api/liveOrDateApi";
import PersonalInfo from "../components/PersonalInfo";
import Preferences from "../components/Preferences";
import StepsNav from "../components/StepsNav";
import "./EditProfilePage.css";

function EditProfilePage(props) {
  let navigate = useNavigate();
  console.log(props);
  const params = useParams();
  const steps = ["PersonalInfo", "Preferences"];
  const [currentFormType, setCurrentFormType] = useState(steps[0]);
  const [selected, setSelected] = useState([]);
  const [userInput, setuserInput] = useState({
    avatar: "",
    name: "",
    gender: "",
    birthday: "",
    location: "",
    height: "",
    status: "",
    hobbies: "",
    about: "",
  });

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await liveOrDateApi.get(`/users/${params.userID}`);
        setuserInput(response.data);
        setSelected(response.data.hobbies);
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, [params.userID]);

  const handleFormTypeChange = (formType) => {
    setCurrentFormType(formType);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setuserInput({ ...userInput, [name]: value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const userData = { ...userInput };
      userData.hobbies = selected;
      const resp = await liveOrDateApi.put(`users/${params.userID}`, userData);
      console.log(resp.data);
      navigate("/profiles");
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  return (
    <div className="edit-profile-page">
      <div className="form-container">
        <div className="new-user-header">
          <h2 className="form-title">
            <span className="form-title-black">Welcome To</span> Live Or Date
          </h2>
          <p className="form-intro">Let's create your profile.</p>
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
            <PersonalInfo
              userInput={userInput}
              handleInputChange={handleInputChange}
              selected={selected}
              setSelected={setSelected}
            />
          ) : (
            <Preferences
              userInput={userInput}
              handleInputChange={handleInputChange}
            />
          )}

          <div className="form-button-container">
            <button onClick={updateProfile} className="form-button">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
