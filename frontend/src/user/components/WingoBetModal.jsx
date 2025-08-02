import { socket } from "@/socket";
import { useState } from "react";
import { toast } from "react-toastify";
// import axios from "axios";
// import { toast } from "react-toastify";
// const base_url = process.env.REACT_APP_API_URL;

const WingoBetModal = ({
  isOpen,
  onClose,
  ballColor,
  ballNumber,
  title,
  gameType,
  period,
  // size,
  setShowModal,
}) => {
  const [balance, setBalance] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [multiplier, setMultiplier] = useState(1);
  const [agreed, setAgreed] = useState(true);

  const balanceOptions = [1, 10, 100, 1000];
  const multipliers = [1, 5, 10, 20, 50, 100];
  const totalAmount = balance * quantity * multiplier;

  const size =
    ballColor === "#5088D3" ? "Small" : ballColor === "#DD9138" ? "Big" : "";

  let definedColor = "";
  if (!ballNumber) {
    definedColor =
      ballColor === "#1AB355"
        ? "Green"
        : ballColor === "#9B48DB"
        ? "Voilet"
        : ballColor === "#D23838"
        ? "Red"
        : "";
  }

  if (!isOpen) return null;

  const handleBetSubmit = async (
    gameType,
    definedColor,
    number,
    size,
    totalAmount,
    period
  ) => {
    if (totalAmount <= 0) {
      return alert("Please enter a valid amount");
    }

    console.log("Sending bet:", {
      period,
      gameType,
      number: number || null,
      color: definedColor || null,
      size: size || null,
      totalAmount,
    });


    if (!number && !definedColor && !size) {
      return alert("Please bet on at least one: Number, Color, or Size");
    }

    try {
      const response = await fetch("http://localhost:3000/api/wingoGameBet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          period,
          gameType,
          number: number || null,
          color: definedColor || null,
          size: size || null,
          totalAmount,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Bet placed successfully!");
        setShowModal(false);
      } else {
        toast.error(data?.message || "Bet submission failed");
      }
    } catch (error) {
      console.error("❌ Error submitting bet:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-end bg-transparent  z-10 rounded-md drop-shadow-[1px_4px_0_#0e2a47]"
      style={{
        borderRadius: "inherit",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={onClose}
    >
      <div
        className="relative z-50 border-t-[1.5rem] border-r-8 border-l-8 w-full max-w-lg mx-3 text-white rounded-t-[5rem] overflow-hidden"
        style={{
          maxHeight: "90%",
          backgroundColor: "#1e1b2e",
          boxShadow:
            "inset 0 2px 2px rgba(0, 255, 255, 0.5), inset 0 -2px 2px rgba(0, 255, 255, 0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative" style={{ backgroundColor: "#2B3270" }}>
          <div
            className="flex flex-col items-center justify-center h-20 p-1 text-center"
            style={{
              clipPath: "polygon(100% 0, 100% 67%, 50% 95%, 0 67%, 0 0)",
              background:
                ballColor.length === 1
                  ? ballColor[0]
                  : ballColor.length === 2 && ballColor[0] === "#1AB355"
                  ? `linear-gradient(45deg, ${ballColor[0]}, #9B48DB)`
                  : `linear-gradient(45deg, ${ballColor[0]}, #9B48DB)`,
            }}
          >
            <h3 className="text-lg font-semibold drop-shadow-[1px_4px_0_#0e2a47]">
              {title}
            </h3>
            <p className="text-sm drop-shadow-[1px_1px_0_#0e2a47]">
              Select{" "}
              {ballNumber || ballNumber === 0
                ? ballNumber
                : ballColor === "#1AB355"
                ? "Green"
                : ballColor === "#9B48DB"
                ? "Voilet"
                : ballColor === "#5088D3"
                ? "Small"
                : ballColor === "#DD9138"
                ? "Big"
                : "Red"}
            </p>
          </div>
        </div>

        {/* Balance */}
        <div className="p-3">
          <div className="flex justify-between items-center flex-wrap drop-shadow-[1px_1px_0_#0e2a47]">
            <p className="mb-2 text-xs">Balance</p>
            <div className="flex gap-1 flex-wrap justify-end">
              {balanceOptions.map((val) => (
                <button
                  key={val}
                  onClick={() => setBalance(val)}
                  className={`rounded px-2 py-1 text-xs min-w-[2.5rem] ${
                    balance === val ? "text-white" : "text-gray-300"
                  }`}
                  style={{
                    backgroundColor: balance === val ? ballColor[0] : "#2B3270",
                    borderRadius: "6px",
                  }}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quantity */}
        <div className="p-3 flex justify-between items-center flex-wrap drop-shadow-[1px_1px_0_#0e2a47]">
          <p className="mb-2 text-xs">Quantity</p>
          <div className="flex items-center gap-1">
            <button
              className="border-0 rounded text-white w-8 h-8 text-lg bg-[#2B3270]"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              −
            </button>
            <span className="flex items-center justify-center w-16 h-8 bg-[#374992] rounded text-sm drop-shadow-[1px_2px_0_#374992]">
              {quantity}
            </span>
            <button
              className="border-0 rounded text-white w-8 h-8 text-lg"
              onClick={() => setQuantity((prev) => prev + 1)}
              style={{
                backgroundColor: ballColor[0],
                filter: `drop-shadow(1px 1px 0 ${ballColor[0]})`,
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Multiplier */}
        <div className="p-3 flex gap-1 flex-wrap">
          {multipliers.map((x) => (
            <button
              key={x}
              onClick={() => setMultiplier(x)}
              className={`rounded px-3 py-1 text-xs min-w-[3rem] drop-shadow-[1px_2px_0_#374992] ${
                multiplier === x ? "text-white" : "text-gray-300"
              }`}
              style={{
                backgroundColor: multiplier === x ? ballColor[0] : "#2B3270",
                border: "none",
                borderRadius: "6px",
              }}
            >
              X{x}
            </button>
          ))}
        </div>

        {/* Checkbox */}
        <div className="p-3 flex items-center gap-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="w-4 h-4 accent-blue-500"
          />
          <label className="text-xs ml-4">
            I agree <span className="text-red-500">《Pre-sale rules》</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="mt-2 flex justify-between">
          <button
            onClick={onClose}
            className="w-1/4 text-white py-2 rounded"
            style={{ backgroundColor: "#2B3270" }}
          >
            Cancel
          </button>
          <button
            className="w-3/4 text-white py-2 rounded"
            style={{ backgroundColor: ballColor[0] }}
            onClick={() =>
              handleBetSubmit(
                gameType,
                definedColor,
                ballNumber,
                size,
                totalAmount,
                period
              )
            }
          >
            Total Amount {totalAmount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WingoBetModal;
