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
import socket from "@/socket";
import NeuButton from "@/components/ui/NeuButton";
import TimerModal from "../components/TimerModal";
import WingoResultModal from "../components/WingoResultModal";
import WingoBetModal from "../components/WingoBetModal";
import { motion } from "framer-motion";

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
  const [ballColor, setBallColor] = useState([]);
  const [ballNumber, setBallNumber] = useState(null);

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

  // const period = timers[durations[activeIndex]]?.period;
  // extract all the value in single line of code
  const { number, color, size, period } = timers[durations[activeIndex]] ?? {};

  useEffect(() => {
    const listener = ({ duration, time, period, number, color, size }) => {
      setTimers((prev) => ({
        ...prev,
        [duration]: {
          time,
          period: period ?? prev[duration].period,
          number: number ?? prev[duration]?.number,
          color: color ?? prev[duration]?.color,
          size: size ?? prev[duration]?.size,
        },
      }));
    };

    socket.on("timer_tick", listener);

    return () => {
      socket.off("timer_tick", listener);
    };
  }, []);

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
    if (idx !== ballNumber) setBallNumber(idx);
    if (idx === 0) {
      setBallColor(["#D23838", "#9B48DB"]);
    } else if (idx === 5) {
      setBallColor(["#1AB355", "#9B48DB"]);
    } else if (idx === 1 || idx === 3 || idx === 7 || idx === 9) {
      setBallColor(["#1AB355"]);
    } else if (idx === 2 || idx === 4 || idx === 6 || idx === 8) {
      setBallColor(["#D23838"]);
    }
  };

  const containerRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    const updateItemWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const totalItems = 4;
        setItemWidth(containerWidth / totalItems);
      }
    };

    updateItemWidth();

    window.addEventListener("resize", updateItemWidth);

    return () => {
      window.removeEventListener("resize", updateItemWidth);
    };
  }, []);

  const shadowClass =
    activeIndex === 1 || activeIndex === 2
      ? "drop-shadow-[1px_0px_0_#0e2a47,-0.65px_0px_0_#0e2a47]"
      : activeIndex === 3
      ? "drop-shadow-[-1px_0px_0_#0e2a47]"
      : "drop-shadow-[1px_0px_0_#0e2a47]";

      console.log('Ayan');
      
  return (
    // <div className="w-full-md flex flex-col justify-center items-center mx-auto py-2 border bg-[#22275B]">

    <div className="relative w-full max-w-screen-sm mx-auto p-4 overflow-y-auto bg-[#22275B]">
      <WingoResultModal duration={durations[activeIndex]} />

      <div className="relative flex flex-col justify-center items-center gap-4 mx-2 font-paytone">
        <WingoBetModal
          isOpen={showModal}
          // timer={seconds}
          onClose={() => setShowModal(false)}
          ballColor={ballColor}
          ballNumber={ballNumber}
          size={size}
          period={period}
          duration={durations[activeIndex]}
          setShowModal={setShowModal}
        />
        <div
          className="w-full flex flex-col items-center justify-between gap-4 text-center bg-cover bg-center mb-3 p-4 mt-4 text-white bg-regal-blue  border-[#8BC2FC] rounded-4xl border-[1rem]"
          style={{
            boxShadow:
              "inset 0 2px 0px rgba(0, 255, 255, 0.5), inset 0 -2px 0px rgba(0, 255, 255, 0.5)",

            backgroundImage: `url(${walletBg})`,
          }}
        >
          <div className="flex justify-center items-center mb-2 drop-shadow-[1px_2px_0_#0e2a47]">
            <span className="text-2xl text-white font-paytone mr-2 drop-shadow-[1px_2px_0_grey]">
              ₹ {showBalance}
            </span>
            <Repeat
              size={20}
              className="cursor-pointer drop-shadow-[1px_2px_0_grey]"
            />
          </div>
          <div className="flex justify-center align-items-center mb-2 gap-1 drop-shadow-[1px_2px_0_#0e2a47]">
            <Wallet className="w-8 h-8 drop-shadow-[1px_2px_0_grey]" />

            <span className="text-2xl font-paytone text-white drop-shadow-[1px_2px_0_grey]">
              Main Wallet
            </span>
          </div>
          <div className="min-w-64 flex justify-center items-center gap-6">
            <Link
              to="/withdraw"
              className="bg-red-500 px-4 py-2 font-bold rounded-full text-white w-4/5 transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
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
                  className="absolute w-full h-full px-2 text-xs font-payton rounded-lg text-white flex items-center justify-center"
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

        <div
          ref={containerRef}
          className="relative flex justify-between items-center w-full bg-regal-blue h-32 rounded-4xl shadow-2xl shadow-accent-foreground border-8 drop-shadow-[1px_2px_0_#0e2a47] overflow-clip"
          style={{
            boxShadow:
              "inset 0 2px 0px rgba(0, 255, 255, 0.5), inset 0 -2px 0px rgba(0, 255, 255, 0.5)",
          }}
        >
          <motion.div
            className={`absolute top-0 bottom-0 rounded-3xl z-0 ${shadowClass}`}
            initial={false}
            animate={{ x: activeIndex * itemWidth - 8 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{
              width: itemWidth || 100,
              background: "linear-gradient(to top, #97D7F9, #4F46E5)",
            }}
          />

          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`flex justify-around items-center cursor-pointer transition-all duration-500
              max-w-full max-h-full p-5 rounded-3xl drop-shadow-[1px_1px_0_#0e2a47]`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="flex flex-col justify-center items-center">
                <img
                  className="drop-shadow-lg"
                  src={`${
                    activeIndex === index ? clockLightIcon : clockDeepIcon
                  }`}
                  alt="clock"
                />

                <span className="text-white text-[clamp(0.250rem,2vw,0.750rem)] font-paytone flex flex-col items-center z-10 drop-shadow-[1px_1px_0_grey]">
                  <span className="font-paytone">Win Go</span>
                  <span className="font-paytone">{timeLabels[index]}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* how to play */}
        <div
          className="relative flex justify-between gap-3 w-full bg-regal-blue p-3 rounded-lg text-white shadow-2xl shadow-accent-foreground border-8"
          style={{
            boxShadow:
              "inset 0 2px 0px rgba(0, 255, 255, 0.5), inset 0 -2px 0px rgba(0, 255, 255, 0.5)",
          }}
        >
          <span
            className="absolute -top-[7.85px] rotate-180 left-1/2 -translate-x-1/2 bg-[#0e2a47] z-10 w-10 h-5 rounded-t-full border-t-7 border-l-7 border-r-7"
            style={{
              boxShadow: "0 -1px 0px rgba(0, 255, 255, 0.5)",
            }}
          />

          <span className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 border-dashed border-l-2 border-[#151C3B] h-[70%] m-auto drop-shadow-[1px_1px_0_#0e2a47]" />

          <span
            className="absolute w-10 h-5 rotate-180  left-1/2 -translate-x-1/2 -bottom-2 bg-[#0e2a47] rounded-b-full border-b-8 border-l-8 border-r-8 z-10"
            style={{
              boxShadow: "0 1px 0px rgba(0, 255, 255, 0.5)",
            }}
          />

          {/* Left section */}
          <div className="flex flex-col gap-2 drop-shadow-[1px_2px_0_#0e2a47]">
            {/* How to play badge + timer */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-full border border-white text-xs w-max">
              <PiNewspaperClippingFill className="drop-shadow-[1px_1px_0_grey]" />
              <span className="drop-shadow-[1px_1px_0_grey]">How to play</span>
            </div>

            <span className="text-sm drop-shadow-[1px_2px_0_grey]">
              Win Go {timeLabels[activeIndex]}
            </span>

            {/* Ball icons */}
            <div className="flex gap-1 mt-2">
              {ballIcons.map((icon, index) => (
                <img key={index} src={icon} alt="ball" className="max-w-8" />
              ))}
            </div>
          </div>

          {/* Right section */}
          <div className="flex flex-col items-end text-right gap-1 drop-shadow-[1px_2px_0_#0e2a47]">
            <span className="font-paytone text-[clamp(0.875rem,4.5vw,1.125rem)] drop-shadow-[1px_1px_0_grey]">
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
            <span className="font-paytone text-[clamp(0.875rem,4.5vw,1.125rem)] drop-shadow-[1px_1px_0_grey]">
              {period}
            </span>
          </div>
        </div>

        {/* game control */}
        <div
          className="relative w-full flex flex-col justify-between mb-3 rounded-2xl p-2 border-8 drop-shadow-[1px_2px_0_#0e2a47]"
          style={{
            backgroundColor: "#2B3270",
            boxShadow:
              "inset 0 2px 0px rgba(0, 255, 255, 0.5), inset 0 -2px 0px rgba(0, 255, 255, 0.5)",
          }}
        >
          {Array.from({ length: 4 }).map(
            (_, index) =>
              activeIndex === index && (
                <div key={index}>
                  <TimerModal seconds={seconds} />
                </div>
              )
          )}

          {/* game control btns */}
          <div className="w-full flex justify-between items-center gap-2 mb-3">
            <NeuButton
              className="w-32 bg-green-500 text-md border-0 text-white p-2 rounded-bl-[1rem] rounded-tr-[1rem]"
              name="Green"
              setShowModal={setShowModal}
              setBallColor={setBallColor}
              // onClick={() => {
              //   setShowModal(true);
              //   alert("showModal")
              //   setBallColor(["#1AB355"]);
              //   setBallNumber(null);
              // }}
            />
            <button
              className="w-full rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-md text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 transition-all hover:ring-offset hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70"
              onClick={() => {
                setShowModal(true);
                setBallColor(["#9B48DB"]);
                setBallNumber(null);
              }}
            >
              Violet
            </button>
            <NeuButton
              className="w-32 bg-red-500 text-md border-0 text-white p-2 rounded-tl-[1rem] rounded-br-[1rem]"
              name="Red"
              setShowModal={setShowModal}
              setBallColor={setBallColor}
              // onClick={() => {
              //   setShowModal(true);
              //   setBallColor(["#D23838"]);
              //   setBallNumber(null);
              // }}
            />
          </div>

          {/* numbers balls */}
          <div
            className="mb-3 rounded-xl p-4 bg-regal-blue justify-center border-4"
            style={{
              backgroundColor: "#2B3270",
              boxShadow:
                "inset 0 2px 0px rgba(0, 255, 255, 0.5), inset 0 -2px 0px rgba(0, 255, 255, 0.5)",
            }}
          >
            <div className="grid grid-cols-5 grid-rows-2 gap-2 drop-shadow-[1px_4px_0_#0e2a47] ">
              {numberBallIcons.map((num, idx) => (
                <img
                  role="button"
                  key={`num-${idx}`}
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
              onClick={() => {
                setShowModal(true);
                setBallColor(["#DD9138"]);
              }}
            >
              Big
            </button>
            <button
              className="text-white text-md w-full p-2 border-0 bg-gradient-to-b from-indigo-950 via-indigo-400 to-indigo-950"
              onClick={() => {
                setShowModal(true);
                setBallColor(["#5088D3"]);
              }}
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
