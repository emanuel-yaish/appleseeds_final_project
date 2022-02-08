import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import liveOrDateApi from "../api/liveOrDateApi";
// import Nav from "../components/Nav";
import Profiles from "../components/Profiles";
import "./ProfilesPage.css";

function ProfilesPage(props) {
  const params = useParams();
  const [user, setUser] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log(params.userid);
        const { data } = await liveOrDateApi.get(`/users/${params.userid}`);
        console.log(data);
        setUser(data.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [params.userid]);

  if (!user)
    return (
      <div className="loding-profiles">
        <h2>Loading user</h2>
        <div className="lds-heart">
          <div></div>
        </div>
      </div>
    );
  return (
    <div className="profiles-page">
      <h2 className="profiles-page-header">Live Or Date</h2>
      {console.log(user)}
      <Profiles user={user} setUser={setUser} />
    </div>
  );
}

export default ProfilesPage;
