import React from "react";
import { faListCheck, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function HomePage() {
  return (
    <div className="hero min-h-screen" style={{ backgroundImage: `url("/images/stock/photo-1507358522600-9f71e620c44e.jpg")` }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <div className="text-5xl font-bold flex justify-around gap-5 mb-11">
      <FontAwesomeIcon icon={faUsers} /> 
        <FontAwesomeIcon icon={faListCheck} /> 
      </div>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
  );
}

export default HomePage;
