import React from "react";
import { faListCheck, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackgroundImage from "../components/BackgroundImage";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <BackgroundImage>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
       <div className="flex flex-col ">
       <div className="text-5xl font-bold flex justify-center gap-5 mb-11">
          <FontAwesomeIcon icon={faUsers} />
          <FontAwesomeIcon icon={faListCheck} />
        </div>

        <div className="flex gap-5">
          <Link to="/login" className="btn btn-secondary">Log in</Link>
          <Link to="/signup" className="btn btn-primary">Sign up</Link>
        </div>
       </div>
      </div>
    </BackgroundImage>
  );
}

export default HomePage;
