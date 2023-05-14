import React from "react";

const images = [
    "/img/homepage/img1.webp",
    "/img/homepage/img2.webp",
    "/img/homepage/img3.webp",
    "/img/homepage/img4.webp",
    "/img/homepage/img5.webp",
];

function BackgroundImage({ children }) {
  return (
    <div className="hero min-h-screen" style={{ backgroundImage: `url(${images[0]})` }}>
        {children}
    </div>   
  );
}

export default BackgroundImage;