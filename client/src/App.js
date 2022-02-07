import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignPage from "./pages/SignPage";
import NewProfilePage from "./pages/NewProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import DeleteUserPage from "./pages/DeleteUserPage";
import ProfilesPage from "./pages/ProfilesPage";
import MatchPage from "./pages/MatchPage";
import EventsPage from "./pages/EventsPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signpage" element={<SignPage />} />
        <Route path="/newprofile/:userid" element={<NewProfilePage />} />
        <Route path="/editprofile/:userid" element={<EditProfilePage />} />
        <Route path="/deleteuser" element={<DeleteUserPage />} />
        <Route path="/profiles/:userid" element={<ProfilesPage />} />
        <Route path="/datepage" element={<MatchPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </div>
  );
}

export default App;
