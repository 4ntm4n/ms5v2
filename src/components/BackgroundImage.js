import React, { useState } from "react";

const images = [
    "/img/homepage/img1.webp",
    "/img/homepage/img2.webp",
    "/img/homepage/img3.webp",
    "/img/homepage/img4.webp",
    "/img/homepage/img5.webp",
];

function BackgroundImage({ children }) {
    const [bgImage, setBgImage] = useState(
        images[Math.floor(Math.random() * 5)]
    );

  return (
    <div className="hero min-h-screen" style={{ backgroundImage: `url(${bgImage})` }}>
        {children}
    </div>   
  );
}

export default BackgroundImage;