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
import NeuButton from "@/components/ui/NeuButton";

const timeLabels = ["30 Sec", "1 Min", "3 Min", "5 Min"];
const ballIcons = [rvIcon, g3Icon, r4Icon, gvIcon];

const messages = [
  "Hello, withdrawals typically take 1–2 hours to process.",
  "We appreciate your patience.",
  "Please contact support if delays persist.",
  "We appreciate your patience.",
];

const numberBallIcons = [
  g1Icon, // 1
  r2Icon, // 2
  g3Icon, // 3
  r4Icon, // 4
  gvIcon, // 5
  r6Icon, // 6
  g7Icon, // 7
  r8Icon, // 8
  g9Icon, // 9
  rvIcon, // 0 (treated as 10th position)
];

const labels = ["x1", "x5", "x10", "x100"];

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

  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAngle((prev) => prev + 90);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (rotateRef.current) {
      rotateRef.current.style.transform = `rotateX(${angle}deg)`;
      rotateRef.current.style.transition = "transform 1s ease-in-out";
      rotateRef.current.style.transformStyle = "preserve-3d";
    }
  }, [angle]);

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
    // <div className="w-full-md flex flex-col justify-center items-center mx-auto py-2 border bg-[#22275B]">
    <div className="w-full max-w-screen-sm mx-auto p-4 overflow-y-auto bg-[#22275B]">
      <div className="flex flex-col justify-center items-center gap-4 mx-2 font-paytone">
        {/* balance section */}
        <div
          className="w-full
    flex flex-col 
    items-center justify-between
    gap-4 
    text-center
    bg-cover bg-center 
    mb-3 p-4 mt-4
    text-white 
    bg-regal-blue 
    rounded shadow-2xl shadow-accent-foreground
  "
          style={{
            backgroundImage: `url(${walletBg})`,
          }}
        >
          <div className="flex justify-center items-center mb-2">
            <span className="text-2xl text-white font-paytone mr-2">
              ₹ {showBalance}
            </span>
            <Repeat size={20} className="cursor-pointer" />
          </div>
          <div className="flex justify-center align-items-center mb-2 gap-1">
            <Wallet className="w-8 h-8" />

            <span className="text-2xl font-paytone text-white">
              Main Wallet
            </span>
          </div>
          <div className="min-w-64 flex justify-center items-center gap-6">
            <Link
              to="/withdraw"
              className="bg-red-500 px-4 py-2 font-bold rounded-full text-decoration-none text-white w-4/5 transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              Withdraw
            </Link>
            <Link
              to="/deposit"
              className="bg-green-500 px-4 py-2 font-bold rounded-full text-decoration-none text-white w-4/5 transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              Deposit
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-between items-center text-white">
          <div
            className="w-64 h-10 overflow-hidden relative"
            style={{ perspective: "1000px" }}
          >
            <div
              ref={rotateRef}
              className="absolute inset-0 transform-style-preserve-3d"
              style={{
                transformOrigin: "center center",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className="absolute w-full h-full px-2 text-xs font-paytone bg-regal-blue rounded-lg text-white flex items-center justify-center"
                  style={{
                    transform: `rotateX(${i * 90}deg) translateZ(20px)`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {msg}
                </div>
              ))}
            </div>
          </div>

          <button className="rounded-full bg-fuchsia-700 py-2 px-4">
            Details
          </button>
        </div>

        {/* timer */}
        <div className="flex justify-between items-center w-full bg-regal-blue h-24 rounded-lg shadow-2xl shadow-accent-foreground">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center items-center ${
                activeIndex === index
                  ? "bg-gradient-to-b to-[#97D7F9] from-indigo-500 shadow-card"
                  : ""
              } max-w-24 max-h-full p-5 rounded-lg`}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={`${
                  activeIndex === index ? clockLightIcon : clockDeepIcon
                }`}
                alt="clock"
              />
              <span className="text-white text-[clamp(0.650rem,3vw,0.850rem)] font-paytone flex flex-col items-center">
                <span className="font-paytone">Win Go</span>
                <span className="font-paytone">{timeLabels[index]}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="relative flex justify-between gap-3 w-full bg-regal-blue p-3 rounded-lg text-white shadow-2xl shadow-accent-foreground">
          <span className="absolute w-4 h-4 -top-2  left-1/2 -translate-x-1/2 bg-[#151C3B] rounded-full z-10" />

          <span className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 border-dashed border-l-2 border-[#151C3B] z-10 h-[80%] m-auto" />

          <span className="absolute w-4 h-4  left-1/2 -translate-x-1/2 -bottom-2 bg-[#151C3B] rounded-full z-10" />

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
                <img key={index} src={icon} alt="ball" className="max-w-8" />
              ))}
            </div>
          </div>

          {/* Right section */}
          <div className="flex flex-col items-end text-right gap-1">
            <span className="font-paytone text-[clamp(0.875rem,4.5vw,1.125rem)]">
              Time remaining
            </span>
            <div className="flex gap-1 font-mono">
              <span className="bg-indigo-500 flex flex-col items-center justify-center rounded w-6 h-10 p-2 text-center text-white text-3xl">
                {minutes[0]}
              </span>

              <span className="bg-indigo-500 flex flex-col items-center justify-center rounded w-6 h-10 p-2 text-center text-white text-3xl">
                {minutes[1]}
              </span>
              <span className="text-white flex flex-col justify-center items-center text-3xl">
                :
              </span>
              <span className="bg-indigo-500 flex flex-col items-center justify-center rounded w-6 h-10 p-2 text-center text-white text-3xl">
                {seconds[0]}
              </span>
              <span className="bg-indigo-500 flex flex-col items-center justify-center rounded w-6 h-10 p-2 text-center text-white text-3xl">
                {seconds[1]}
              </span>
            </div>
            <span className="font-paytone text-[clamp(0.875rem,4.5vw,1.125rem)]">
              202534542545
            </span>
          </div>
        </div>

        <div
          className="relative w-full flex flex-col justify-between mb-3 rounded-2xl p-2"
          style={{ backgroundColor: "#2B3270" }}
        >
          {/* game control btns */}
          <div className="w-full flex justify-between items-center gap-2 mb-3">
            <NeuButton
              className="w-32 bg-green-500 text-md border-0 text-white p-2 rounded-bl-[1rem] rounded-tr-[1rem]"
              name="Green"
              onClick={() => {
                // setShowModal(true);
                // setColor(["#1AB355"]);
                // setNumber(null);
              }}
            />
            <button
              className="w-full rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-md text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 transition-all hover:ring-offset hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70"
              onClick={() => {
                // setShowModal(true);
                // setColor(["#9B48DB"]);
                // setNumber(null);
              }}
            >
              Violet
            </button>
            <NeuButton
              className="w-32 bg-red-500 text-md border-0 text-white p-2 rounded-tl-[1rem] rounded-br-[1rem]"
              name="Red"
              onClick={() => {
                // setShowModal(true);
                // setColor(["#D23838"]);
                // setNumber(null);
              }}
            />
          </div>

          {/* numbers balls */}
          {/* <div className="grid [grid-template-columns:repeat(5,3.5rem)] gap-1 mb-3 rounded-xl p-4 bg-regal-blue justify-center shadow-accent-foreground">
            {numberBallIcons.map((num, idx) => (
              <img
                key={num}
                src={num}
                alt={`num-${idx}`}
                className="w-[clamp(6.75rem,6.5vw,5.125rem)] h-16"
                // className={`rounded-circle border ${
                //   randomNumber === idx ? "animate-scale" : ""
                // }`}
                // style={{ width: "3rem", height: "3rem" }}
                // onClick={() => handleNumberBalls(idx)}
              />
            ))}
          </div> */}
          <div className="grid [grid-template-columns:repeat(5,clamp(4.5rem,6.5vw,5rem))] gap-2 mb-3 rounded-xl p-4 bg-regal-blue justify-center shadow-accent-foreground">
            {numberBallIcons.map((num, idx) => (
              <img
                key={num}
                src={num}
                alt={`num-${idx}`}
                className="w-full h-18"
              />
            ))}
          </div>

          <div className="flex justify-between items-center mb-3 flex-wrap">
            <button
              // className="m-1 border border-red-500 rounded-md p-2 text-white text-danger bg-transparent"
              className="rounded-md h-10 bg-gradient-to-br from-blue-400 to-blue-700 px-3 py-1 text-md text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-red-700 transition-all hover:ring-offset hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70"
              onClick={() => setStartToGenrateRandomNumber(true)}
            >
              Random
            </button>
            <div>
              {labels.map((label, index) => (
                <button
                  key={index}
                  className={`m-1 p-2 text-white rounded-md border-0 ${
                    activeIndex === index
                      ? "bg-green-500 outline-2 outline-regal-blue"
                      : "outline-2"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex border-0 rounded-full overflow-hidden">
            <button
              className="text-white text-md w-full p-2 border-0 bg-gradient-to-b from-yellow-700 via-yellow-400 to-yellow-700"
              // onClick={() => {
              //   setShowModal(true);
              //   setColor(["#DD9138"]);
              // }}
            >
              Big
            </button>
            <button
              className="text-white text-md w-full p-2 border-0 bg-gradient-to-b from-indigo-950 via-indigo-400 to-indigo-950"
              // onClick={() => {
              //   setShowModal(true);
              //   setColor(["#5088D3"]);
              // }}
            >
              Small
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wingo;
