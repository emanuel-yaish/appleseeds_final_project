import React from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import HowItWorks from "../components/HowItWorks";

const HomePage = () => {
  return (
    <div className="home-page">
      <Nav />
      <Header />
      <HowItWorks />
    </div>
  );
};

export default HomePage;
