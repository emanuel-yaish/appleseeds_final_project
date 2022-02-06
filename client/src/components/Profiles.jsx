import React, { useEffect, useState } from "react";
import liveOrDateApi from "../api/liveOrDateApi";
import Profile from "./Profile";
import "./Profiles.css";

function Profiles(props) {
  const [likedProfiles, setLikedProfiles] = useState("");
  const [dislikedProfiles, setDislikedProfiles] = useState("");
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
  }, [likedProfiles, dislikedProfiles]);

  const handleLike = (id) => {
    console.log("likedProfiles", likedProfiles);
    setDislikedProfiles([...likedProfiles, id]);
  };
  const handleUnlike = (id) => {
    console.log("dislikedProfiles", dislikedProfiles);
    setLikedProfiles([...dislikedProfiles, id]);
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
            likedProfiles.includes(profile._id) ||
            dislikedProfiles.includes(profile._id)
          ) {
            console.log("contain");
            return false;
          }
          return true;
        })
        .map((profile) => (
          <Profile
            key={profile._id}
            profile={profile}
            like={handleLike}
            dislike={handleUnlike}
          />
        ))}
    </div>
  );
}

export default Profiles;
