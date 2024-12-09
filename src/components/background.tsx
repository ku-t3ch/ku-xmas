"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Background() {
  const [bgImage, setBgImage] = useState("/image/bg_full.png");

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth <= 400) {
        setBgImage("/image/bg_respon.png");
      } else {
        setBgImage("/image/bg_full.png");
      }
    };

    // Initial check
    updateBackground();

    // Listen for resize events
    window.addEventListener("resize", updateBackground);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", updateBackground);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src={bgImage}
        fill
        alt="background"
        className="object-cover opacity-70"
     
      />
    </div>
  );
}
