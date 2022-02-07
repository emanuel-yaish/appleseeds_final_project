import React, { useEffect, useState } from "react";
import liveOrDateApi from "../api/liveOrDateApi";
import Profile from "./Profile";
import "./Profiles.css";

function Profiles(props) {
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
    console.log(data.data.updatedUser);
    setUser(data.data.updatedUser);
  };

  const handleLike = (id) => {
    const updatedUser = { ...user };
    updatedUser.likedUsers.push(id);
    updateServerAndUser({ likedUsers: updatedUser.likedUsers });
  };
  const handleUnlike = (id) => {
    const updatedUser = { ...user };
    updatedUser.dislikedUsers.push(id);
    updateServerAndUser({ dislikedUsers: updatedUser.dislikedUsers });
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
          console.log(profile);
          if (
            user.likedUsers.includes(profile._id) ||
            user.dislikedUsers.includes(profile._id)
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
