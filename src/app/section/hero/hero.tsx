"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
const Hero = () => {
  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    setIsIOS(/iPhone|iPad|iPod/i.test(navigator.userAgent));
  });
  const showvideo = () => {
    if (!isIOS) {
      return (
        <video
          src="/main.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto rounded md:hidden"
        ></video>
      );
    } else {
      return (
        <video
          src="/main.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto rounded md:hidden"
        ></video>
      );
    }
  };
  return (
    <div className="">
      <div className="md:hidden fit bg-[#131313]">
        <div className="bg-[#131313] h-[40px]"></div>
        {showvideo()}
      </div>
      <div className="sm:block hidden">
        <div className="relative w-full aspect-video">
          <Image
            src="/mainposter.png"
            alt="poster"
            fill
            className="object-cover" // หรือ object-contain ตามต้องการ
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
