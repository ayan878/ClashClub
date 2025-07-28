import React from "react";
import { useAnimate } from "framer-motion";


const NeuButton = ({ name,className }) => {
  const [scope, animate] = useAnimate();

  const handleClick = () => {
    animate([
      [".button", { scale: 1, boxShadow: "none" }, { duration: 0.1 }],
      [".button", { rotate: 0 }, { duration: 0.1, at: "<" }],
      [".button", { rotate: 0 }, { duration: 0.1 }],
      [
        "button",
        { scale: 1, boxShadow: "3px 5px 0px black" },
        { duration: 0.1 },
      ],
    ]);
  };

  return (
    <div className="flex items-center justify-between w-fit">
      <div ref={scope}>
        <button
          onClick={handleClick}
          className={`button transition-all shadow-[3px_5px_0px_black] ${className}`}
        >
          {name}
        </button>
      </div>
    </div>
  );
};

export default NeuButton;
