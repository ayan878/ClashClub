import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// const base_url = process.env.REACT_APP_API_URL;

const WingoGameModal = ({
  isOpen,
  onClose,
  color,
  number,
  title,
  gameTime,
  period,
  setShowModal,
}) => {
  const [balance, setBalance] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [multiplier, setMultiplier] = useState(1);
  const [agreed, setAgreed] = useState(true);

  const balanceOptions = [1, 10, 100, 1000];
  const multipliers = [1, 5, 10, 20, 50, 100];
  const totalAmount = balance * quantity * multiplier;

  const size = color === "#5088D3" ? "Small" : color === "#DD9138" ? "Big" : "";

  let definedColor = "";
  if (!number) {
    definedColor =
      color === "#1AB355"
        ? "Green"
        : color === "#9B48DB"
        ? "Voilet"
        : color === "#D23838"
        ? "Red"
        : "";
  }

  if (!isOpen) return null;

  const handleBetSubmit = async (
    gameTime,
    definedColor,
    number,
    size,
    totalAmount,
    period
  ) => {

    // try {
    //   const response = await axios.post(
    //     `${base_url}/api/post/wingoGameBet`,
    //     {
    //       period,
    //       game: gameTime,
    //       number,
    //       color: definedColor,
    //       size,
    //       betAmount: totalAmount,
    //     },
    //     {
    //       withCredentials: true,
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (response.data.success) {
    //     setShowModal(false);
    //   } else {
    //     toast.error(response.data.data.message);
    //   }
    // } catch (error) {
    //   console.error("❌ Error submitting game number:", error);
    //   toast.error("Something went wrong.");
    // }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50 rounded-md"
      style={{ borderRadius: "inherit" }}
    >
      <div
        className="w-full max-w-md mx-3 text-white rounded-t-lg overflow-hidden"
        style={{ maxHeight: "90%", backgroundColor: "#1e1b2e" }}
      >
        {/* Header */}
        <div className="relative" style={{ backgroundColor: "#2B3270" }}>
          <div
            className="flex flex-col items-center justify-center h-20 p-1 text-center"
            style={{
              clipPath: "polygon(100% 0, 100% 67%, 50% 95%, 0 67%, 0 0)",
              background:
                color.length === 1
                  ? color[0]
                  : color.length === 2 && color[0] === "#1AB355"
                  ? `linear-gradient(45deg, ${color[0]}, #9B48DB)`
                  : `linear-gradient(45deg, ${color[0]}, #9B48DB)`,
            }}
          >
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm">
              Select{" "}
              {number || number === 0
                ? number
                : color === "#1AB355"
                ? "Green"
                : color === "#9B48DB"
                ? "Voilet"
                : color === "#5088D3"
                ? "Small"
                : color === "#DD9138"
                ? "Big"
                : "Red"}
            </p>
          </div>
        </div>

        {/* Balance */}
        <div className="p-3">
          <div className="flex justify-between items-center flex-wrap">
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
                    backgroundColor: balance === val ? color[0] : "#2B3270",
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
        <div className="p-3 flex justify-between items-center flex-wrap">
          <p className="mb-2 text-xs">Quantity</p>
          <div className="flex items-center gap-1">
            <button
              className="border-0 rounded text-white w-8 h-8 text-lg bg-[#2B3270]"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              −
            </button>
            <span className="flex items-center justify-center w-16 h-8 bg-[#374992] rounded text-sm">
              {quantity}
            </span>
            <button
              className="border-0 rounded text-white w-8 h-8 text-lg"
              onClick={() => setQuantity((prev) => prev + 1)}
              style={{ backgroundColor: color[0] }}
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
              className={`rounded px-3 py-1 text-xs min-w-[3rem] ${
                multiplier === x ? "text-white" : "text-gray-300"
              }`}
              style={{
                backgroundColor: multiplier === x ? color[0] : "#2B3270",
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
            style={{ backgroundColor: color[0] }}
            onClick={() =>
              handleBetSubmit(
                gameTime,
                definedColor,
                number,
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

export default WingoGameModal;
