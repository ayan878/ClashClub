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
import { Repeat, Wallet } from "lucide-react";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { socket } from "@/socket";
import NeuButton from "@/components/ui/NeuButton";
import WingoGameModal from "../components/WingoGameModal";
import TimerModal from "../components/TimerModal";

const timeLabels = ["30 Sec", "1 Min", "3 Min", "5 Min"];
const ballIcons = [rvIcon, g3Icon, r4Icon, gvIcon];

const messages = [
  "Hello, withdrawals typically take 1–2 hours to process.",
  "We appreciate your patience.",
  "Please contact support if delays persist.",
  "We appreciate your patience.",
];

const numberBallIcons = [
  rvIcon, // 0
  g1Icon, // 1
  r2Icon, // 2
  g3Icon, // 3
  r4Icon, // 4
  gvIcon, // 5
  r6Icon, // 6
  g7Icon, // 7
  r8Icon, // 8
  g9Icon, // 9
];

const labels = ["x1", "x5", "x10", "x100"];

function Wingo() {
  const [showBalance, setShowBalance] = useState(35469);
  const [activeIndex, setActiveIndex] = useState(0);
  const [startToGenerateNumber, setStartToGenrateRandomNumber] =
    useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [color, setColor] = useState([]);
  const [number, setNumber] = useState(null);

  const durations = [30, 60, 180, 300];

  const [timers, setTimers] = useState({
    30: { time: null, period: null },
    60: { time: null, period: null },
    180: { time: null, period: null },
    300: { time: null, period: null },
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
    timers[durations[activeIndex]]?.time || 0
  );

  const period = timers[durations[activeIndex]].period;
  console.log("period", period);

  useEffect(() => {
    socket.on("timer_tick", ({ duration, time, period }) => {
      setTimers((prev) => ({
        ...prev,
        [duration]: {
          time,
          period: period ?? prev[duration].period,
        },
      }));
    });
  }, []);

  console.log(timers);

  useEffect(() => {
    if (!startToGenerateNumber) return;

    const generateRandomNumber = () => Math.floor(Math.random() * 10);

    // Start generating every 200ms
    const interval = setInterval(() => {
      const number = generateRandomNumber();
      setRandomNumber(number);
    }, 200);

    // Stop after 3 seconds
    const stopTimeout = setTimeout(() => {
      clearInterval(interval);
      setStartToGenrateRandomNumber(false);
      setShowModal(true);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(stopTimeout);
    };
  }, [startToGenerateNumber]);

  useEffect(() => {
    if (seconds <= 5) setShowModal(false);
  }, [seconds]);

  const handleNumberBalls = (idx) => {
    setShowModal(true);
    if (idx !== number) setNumber(idx);
    if (idx === 0) {
      setColor(["#D23838", "#9B48DB"]);
    } else if (idx === 5) {
      setColor(["#1AB355", "#9B48DB"]);
    } else if (idx === 1 || idx === 3 || idx === 7 || idx === 9) {
      setColor(["#1AB355"]);
    } else if (idx === 2 || idx === 4 || idx === 6 || idx === 8) {
      setColor(["#D23838"]);
    }
  };

  return (
    // <div className="w-full-md flex flex-col justify-center items-center mx-auto py-2 border bg-[#22275B]">
    <div className="w-full max-w-screen-sm mx-auto p-4 overflow-y-auto bg-[#22275B]">
      <div className="relative flex flex-col justify-center items-center gap-4 mx-2 font-paytone">
        <WingoGameModal
          isOpen={showModal}
          timer={seconds}
          onClose={() => setShowModal(false)}
          color={color}
          number={number}
          // title={winGo[activeGoIndex].title}
          // gameTime={winGo[activeGoIndex].duration}
          // period={periodNumber}
          setShowModal={setShowModal}
        />
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
              } max-w-24 max-h-full p-6 rounded-lg`}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={`${
                  activeIndex === index ? clockLightIcon : clockDeepIcon
                }`}
                alt="clock"
              />
              <span className="text-white text-[clamp(0.650rem,2vw,0.750rem)] font-paytone flex flex-col items-center">
                <span className="font-paytone">Win Go</span>
                <span className="font-paytone">{timeLabels[index]}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="relative flex justify-between gap-3 w-full bg-regal-blue p-3 rounded-lg text-white shadow-2xl shadow-accent-foreground">
          <span className="absolute w-4 h-4 -top-2  left-1/2 -translate-x-1/2 bg-[#151C3B] rounded-full z-10" />

          <span className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 border-dashed border-l-2 border-[#151C3B] h-[80%] m-auto" />

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
              {period}
            </span>
          </div>
        </div>

        <div
          className="relative w-full flex flex-col justify-between mb-3 rounded-2xl p-2"
          style={{ backgroundColor: "#2B3270" }}
        >
          <TimerModal seconds={seconds} />
          {/* game control btns */}
          <div className="w-full flex justify-between items-center gap-2 mb-3">
            <NeuButton
              className="w-32 bg-green-500 text-md border-0 text-white p-2 rounded-bl-[1rem] rounded-tr-[1rem]"
              name="Green"
              setShowModal={setShowModal}
              setColor={setColor}
              // onClick={() => {
              //   setShowModal(true);
              //   alert("showModal")
              //   setColor(["#1AB355"]);
              //   setNumber(null);
              // }}
            />
            <button
              className="w-full rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-md text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 transition-all hover:ring-offset hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70"
              onClick={() => {
                setShowModal(true);
                setColor(["#9B48DB"]);
                // setNumber(null);
              }}
            >
              Violet
            </button>
            <NeuButton
              className="w-32 bg-red-500 text-md border-0 text-white p-2 rounded-tl-[1rem] rounded-br-[1rem]"
              name="Red"
              setShowModal={setShowModal}
              setColor={setColor}
              // onClick={() => {
              //   setShowModal(true);
              //   setColor(["#D23838"]);
              //   setNumber(null);
              // }}
            />
          </div>

          {/* numbers balls */}
          <div className="grid grid-cols-5 grid-rows-2 gap-2 mb-3 rounded-xl p-4 bg-regal-blue justify-center shadow-accent-foreground">
            {numberBallIcons.map((num, idx) => (
              <img
                key={num}
                src={num}
                alt={`num-${idx}`}
                className={`h-auto min-w-8 transition-transform duration-300 ease-in-out 
  ${idx === randomNumber ? "scale-125" : "scale-100"}`}
                onClick={() => {
                  handleNumberBalls(idx);
                }}
              />
            ))}
          </div>

          <div className="flex justify-between gap-3 items-center mb-3 flex-wrap">
            <button
              className="rounded-md flex-1 h-10 bg-gradient-to-br from-blue-400 to-blue-700 ml-1.5 px-3 py-1 text-md text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-red-700 transition-all hover:ring-offset hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70"
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

        {/* Tabs */}
        <div className="w-full flex justify-between items-center">
          <button
            className="bg-blue-600 text-white text-lg border-none px-3 py-2 rounded-md"
            // onClick={() => setActiveTab("history")}
          >
            Game History
          </button>
          <button
            className="text-white text-lg px-3 py-2 border-none w-1/2 rounded-md"
            style={{ backgroundColor: "rgba(29, 24, 97, 0.67)" }}
            // onClick={() => setActiveTab("bets")}
          >
            My Bets
          </button>
        </div>
      </div>
    </div>
  );
}

export default Wingo;
