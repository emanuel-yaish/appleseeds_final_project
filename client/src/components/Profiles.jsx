import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import liveOrDateApi from "../api/liveOrDateApi";
import Profile from "./Profile";
import "./Profiles.css";

function Profiles(props) {
  let navigate = useNavigate();
  const { user, setUser } = props;
  // const [likedProfiles, setLikedProfiles] = useState("");
  // const [dislikedProfiles, setDislikedProfiles] = useState("");
  const [profiles, setProfiles] = useState();
  useEffect(() => {
    const getProfiles = async () => {
      try {
        const { data } = await liveOrDateApi.get("users");
        const users = data.data.users;
        setProfiles(users);
      } catch (err) {
        console.log(err);
      }
    };
    getProfiles();
  }, []);

  const updateServerAndUser = async (updatedField) => {
    console.log("updatedField", updatedField);
    const { data } = await liveOrDateApi.put(`users/${user._id}`, updatedField);
    const updatedUser = data.data.updatedUser;
    return updatedUser;
  };

  const handleLike = async (id) => {
    let updatedUser = { ...user };
    updatedUser.likedUsers.push(id);
    updatedUser = await updateServerAndUser({
      likedUsers: updatedUser.likedUsers,
    });
    console.log("updatedUser***", updatedUser);
    console.log("updatedUser.match***", updatedUser.match);
    setUser(updatedUser);
    console.log("before  match!!!!");
    if (updatedUser.match.matchid !== "") {
      console.log("match!!!!");
      console.log(updatedUser.match);
      navigate("/datepage");
    }
  };
  const handleUnlike = async (id) => {
    let updatedUser = { ...user };
    updatedUser.dislikedUsers.push(id);
    updatedUser = await updateServerAndUser({
      dislikedUsers: updatedUser.dislikedUsers,
    });
    setUser(updatedUser);
  };

  if (!profiles)
    return (
      <div className="loding-profiles">
        <h2>Loading Profiles</h2>
        <div className="lds-heart">
          <div></div>
        </div>
      </div>
    );
  return (
    <div className="profiles">
      {profiles
        .filter((profile) => {
          if (
            user.likedUsers.includes(profile._id) ||
            user.dislikedUsers.includes(profile._id) ||
            user._id === profile._id
          ) {
            console.log("contain");
            return false;
          }
          return true;
        })
        .map((profile) => (
          <Profile
            key={profile._id}
            id={profile._id}
            profile={profile.personalInfo}
            like={handleLike}
            dislike={handleUnlike}
          />
        ))}
    </div>
  );
}

export default Profiles;
