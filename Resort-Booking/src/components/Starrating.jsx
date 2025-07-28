import React from "react";
import { assets } from "../assets/assets";

const Starrating = ({ rating = 4 }) => {
  return (
    <div className="flex flex-row gap-1">
      {Array(5)
        .fill("")
        .map((_, index) => (
          <img
            key={index}
            src={
              rating > index ? assets.starIconFilled : assets.starIconOutlined
            }
            alt="star"
            className="h-4.5 w-4.5"
          />
        ))}
    </div>
  );
};

export default Starrating;
