'use client'
import Image from "next/image";
import { useState } from "react";
type RenderImageProps = {
  color: string;
  number: string;
};
const RenderImage: React.FC<RenderImageProps> = ({ color, number }) => {
  const [hover, setHover] = useState(false);
  let url = "";
  if (color === "white") {
    if (number === "GGEZ") url = hover ? "/whiteB.png" : "/whiteF.png";
    else url = hover ? "/whiteBN.png" : "/whiteF.png";
  } else {
    if (number === "GGEZ") url = hover ? "/blackB.png" : "/blackF.png";
    else url = hover ? "/blackBN.png" : "/blackF.png";
  }

  return (
    <div
      className="relative w-[105px] h-[105px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image
        src={url}
        alt="shirt"
        fill
        style={{ objectFit: "contain", transition: "opacity 0.3s ease" }}
        className={`${hover ? "opacity-100" : "opacity-80"}`}
      />
    </div>
  );
};
export default RenderImage;