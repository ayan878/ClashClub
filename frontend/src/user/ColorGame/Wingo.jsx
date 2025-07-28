// assets
import walletBg from "../../assets/png/walletbg.png";
import clockLightIcon from "../../assets/png/clock-light.png";
import clockDeepIcon from "../../assets/png/clock-deep.png";

import rvIcon from "../../assets/png/rv0.png";
import gvIcon from "../../assets/png/gv5.png";

import r2Icon from "../../assets/png/r2.png";
import r4Icon from "../../assets/png/r4.png";
import r6Icon from "../../assets/png/r6.png";
import r8Icon from "../../assets/png/r8.png";

import g1Icon from "../../assets/png/g1.png";
import g3Icon from "../../assets/png/g3.png";
import g7Icon from "../../assets/png/g7.png";
import g9Icon from "../../assets/png/g9.png";

import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, Repeat, Wallet } from "lucide-react";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { socket } from "@/socket";

const timeLabels = ["30 Sec", "1 Min", "3 Min", "5 Min"];
const ballIcons = [rvIcon, g3Icon, r4Icon, gvIcon];

function Wingo() {
  const [showBalance, setShowBalance] = useState(35469);
  const [activeIndex, setActiveIndex] = useState(0);

  const durations = [30, 60, 180, 300];
  const [timers, setTimers] = useState({
    30: null,
    60: null,
    180: null,
    300: null,
  });

  const rotateRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (rotateRef.current) {
        rotateRef.current.style.transform = "rotateX(180deg)";
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const formatTimeInDigits = (totalSecounds) => {
    const minutes = Math.floor(totalSecounds / 60);
    const seconds = totalSecounds % 60;

    return {
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  const { minutes, seconds } = formatTimeInDigits(
    timers[durations[activeIndex]] || 0
  );

  useEffect(() => {
    socket.emit("start_timer", {});
    socket.on("timer_tick", ({ duration, time }) => {
      setTimers((prev) => ({ ...prev, [duration]: time }));
    });
  }, []);

  console.log(timers);

  return (
    <div className="max-w-md flex flex-col justify-center items-center mx-auto py-2 border bg-[#22275B]">
      <div className="flex flex-col justify-center items-center gap-4 mx-2 font-paytone">
        <div
          className="w-full flex flex-col gap-4 text-center bg-cover bg-center mb-3 p-4 py-6 text-white bg-regal-blue rounded"
          style={{
            backgroundImage: `url(${walletBg})`,
          }}
        >
          <div className="flex justify-center items-center mb-2">
            <span className="font-bold font-paytone mr-2 text-md">
              ₹ {showBalance}
            </span>
            <Repeat size={20} className="text-white cursor-pointer" />
          </div>
          <div className="flex justify-center align-items-center mb-2 gap-1">
            <Wallet />
            <span className="font-paytone">Main Wallet</span>
          </div>
          <div className="flex justify-between gap-3">
            <Link
              to="/withdraw"
              className="bg-red-500 p-2 font-bold w-1/2 rounded-full text-white text-decoration-none"
            >
              Withdraw
            </Link>
            <Link
              to="/deposit"
              className="bg-green-500 p-2 font-bold w-1/2 rounded-full text-white text-decoration-none"
            >
              Deposit
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p ref={rotateRef} className="text-xs font-paytone">
            Hello, withdrawals typically take 1–2 hours to process. We
            appreciate your patience.
          </p>

          <button>Details</button>
        </div>
        <div className="flex justify-between items-center w-full bg-regal-blue h-24 rounded-lg">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center items-center ${
                activeIndex === index ? "bg-indigo-500 shadow-card" : ""
              } w-24 h-full p-5 rounded-lg`}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={`${
                  activeIndex === index ? clockLightIcon : clockDeepIcon
                }`}
                alt="clock"
              />
              <span className="text-white text-xs font-paytone flex flex-col items-center">
                <span className="font-paytone">Win Go</span>
                <span className="font-paytone">{timeLabels[index]}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="relative flex justify-between gap-3 w-full bg-regal-blue p-3 rounded-lg text-white">
          <span className="absolute w-4 h-4 -top-2  left-1/2 -translate-x-1/2 bg-[#22275B] rounded-full z-10" />

          <span className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 border-dashed border-l-2 border-[#22275B] z-10 h-[80%] m-auto" />

          <span className="absolute w-4 h-4  left-1/2 -translate-x-1/2 -bottom-2 bg-[#22275B] rounded-full z-10" />

          {/* Left section */}
          <div className="flex flex-col gap-2">
            {/* How to play badge + timer */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-full border border-white text-xs w-max">
              <PiNewspaperClippingFill />
              <span>How to play</span>
            </div>

            <span className="text-sm">Win Go {timeLabels[activeIndex]}</span>

            {/* Ball icons */}
            <div className="flex gap-1 mt-2">
              {ballIcons.map((icon, index) => (
                <img key={index} src={icon} alt="ball" className="max-w-10" />
              ))}
            </div>
          </div>

          {/* Right section */}
          <div className="flex flex-col items-end text-right gap-1">
            <span className="font-paytone text-xl">Time remaining</span>
            <div className="flex gap-1 text-3xl font-mono">
              <span className="bg-indigo-500 rounded p-2 text-center text-white">
                {minutes[0]}
              </span>

              <span className="bg-indigo-500 rounded p-2 text-center text-white">
                {minutes[1]}
              </span>
              <span className="text-white flex flex-col justify-center items-center">
                :
              </span>
              <span className="bg-indigo-500 rounded p-2 text-center text-white">
                {seconds[0]}
              </span>
              <span className="bg-indigo-500 rounded p-2 text-center text-white">
                {seconds[1]}
              </span>
            </div>
            <span className="font-paytone text-2xl">202534542545</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between gap-2 mb-3">
            <button
              className="w-24 bg-green-500 text-md border-0 text-white p-2 rounded-bl-[1rem] rounded-tr-[1rem]"
              onClick={() => {
                // setShowModal(true);
                // setColor(["#1AB355"]);
                // setNumber(null);
              }}
            >
              Green
            </button>
            <button
              className="w-24 text-md border-0 bg-violet-500 text-white p-2 rounded-md"
              onClick={() => {
                // setShowModal(true);
                // setColor(["#9B48DB"]);
                // setNumber(null);
              }}
            >
              Violet
            </button>
            <button
              className="w-24 bg-red-500 text-md border-0 text-white p-2 rounded-tl-[1rem] rounded-br-[1rem]"
              onClick={() => {
                // setShowModal(true);
                // setColor(["#D23838"]);
                // setNumber(null);
              }}
            >
              Red
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wingo;
