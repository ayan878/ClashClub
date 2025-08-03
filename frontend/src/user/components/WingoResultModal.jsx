import { useEffect, useState } from "react";
import resultImg from "../../assets/png/resultBg.png";
import resultCup from "../../assets/png/winner-cup.png";
import socket from "@/socket";

const WingoResultModal = ({ duration }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [number, setNumber] = useState(null);
  const [color, setColor] = useState(null);
  const [period, setPeriod] = useState(null);
  const [size, setSize] = useState(null);

  useEffect(() => {
    const listener = (result) => {
      console.log("result:", result);
      setNumber(result.number);
      setColor(result.color);
      setSize(result.size);
      setPeriod(result.period);
      setIsOpen(result.game === duration);
    };

    socket.on("wingo-result", listener);

    if (!isOpen) return;
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      socket.off('wingo-result',listener)
    };
  }, [isOpen]);

  if (!isOpen) return null;

  //   const colorText = color.length > 1 ? color.join(" & ") : color[0];

  return (
    <div
      className="absolute left-0 top-0 w-full h-full flex justify-center items-center font-paytone"
      style={{
        // backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: 50,
        // top: "30%",
      }}
    >
      <img
        src={resultImg}
        alt="result"
        className="absolute"
        style={{ objectFit: "cover", zIndex: 30 }}
      />
      <div
        className="absolute text-center flex flex-col justify-center items-center"
        style={{ zIndex: 30, color: "#fff" }}
      >
        <img
          src={resultCup}
          alt="result cup"
          className="inline-block"
          style={{
            height: "14rem",
            width: "14rem",
            marginBottom: "2rem",
            marginTop: "6rem",
          }}
        />
        <h1 className="text-5xl font-paytone text-indigo-500">Round Result</h1>
        <div className="mt-4 flex justify-between gap-3 items-center">
          <p className="text-2xl f0nt-bold m-0 text-indigo-500">{size}</p>
          <h1
            className={`display-1 text-7xl ${
              number % 2 === 0 ? "text-green-800" : "text-red-800"
            } animate-out m-0`}
            style={{
              fontWeight: "900",
              textShadow: "2px 5px 0px #000000",
            }}
          >
            {number}
          </h1>
          {/* <p className="fs-2 fw-bold m-0 text-primary">{colorText}</p> */}
          <p className="text-xl font-bold m-0 text-indigo-500">
            {/* {color.length === 2 ? (
              <>
                {color[0]} <br /> {color[1]}
              </>
            ) : (
              <>{color[0]}</>
            )} */}
            {color}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WingoResultModal;
