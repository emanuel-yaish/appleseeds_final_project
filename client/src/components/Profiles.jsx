import React, { useEffect, useState } from "react";
import ProfilesApi from "../api/ProfilesApi";
import Profile from "./Profile";
import "./Profiles.css";

function Profiles(props) {
  const [likedProfiles, setLikedProfiles] = useState("");
  const [dislikedProfiles, setDislikedProfiles] = useState("");
  const [profiles, setProfiles] = useState();
  useEffect(() => {
    const getProfiles = async () => {
      try {
        const response = await ProfilesApi.get("/profiles");
        setProfiles(response.data);
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
          if (
            likedProfiles.includes(profile.id) ||
            dislikedProfiles.includes(profile.id)
          ) {
            console.log("contain");
            return false;
          }
          return true;
        })
        .map((profile) => (
          <Profile
            key={profile.id}
            profile={profile}
            like={handleLike}
            dislike={handleUnlike}
          />
        ))}
    </div>
  );
}

export default Profiles;
