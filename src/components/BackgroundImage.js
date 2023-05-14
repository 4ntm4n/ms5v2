import React, { useEffect, useState } from "react";

const images = [
  "/img/homepage/img1.webp",
  "/img/homepage/img2.webp",
  "/img/homepage/img3.webp",
  "/img/homepage/img4.webp",
  "/img/homepage/img5.webp",
];

function BackgroundImage({ children }) {
  const [bgImage, setBgImage] = useState(images[Math.floor(Math.random() * 5)]);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFadingOut(true);
    }, 6500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (isFadingOut) {
      setTimeout(() => {
        setBgImage((prevImg) => {
          const idx = images.indexOf(prevImg);
          const nextIdx = (idx + 1) % 5;
          return images[nextIdx];
        });
        setIsFadingOut(false);
      }, 600);
    }
  }, [isFadingOut]);

  return (
    <div className="hero min-h-screen relative bg-[#000]">
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isFadingOut ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      {children}
    </div>
  );
}

export default BackgroundImage;

/*  ${} */
