const TimerModal = ({ seconds }) => {
  if (seconds > 5) return null;

  return (
    <div
      className="absolute start-0 top-0 w-full h-full flex justify-center items-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: 10,
      }}
    >
      <span className="inline-grid grid-cols-2 gap-4">
        <span
          className="flex flex-col justify-center items-center max-w-50 max-h-75 p-4 rounded text-white text-[50vw]  bg-indigo-600"
          style={{
            fontSize: "12rem",
            fontWeight: "900",
            // backgroundColor: "rgb(22, 30, 79)",
          }}
        >
          {seconds[0]}
        </span>
        <span
          className="flex flex-col justify-center items-center max-w-50 max-h-75 p-4 rounded text-white text-[50vw]  bg-indigo-600"
          style={{
            fontSize: "12rem",
            fontWeight: "900",
            // backgroundColor: "rgb(22, 30, 79)",
          }}
        >
          {seconds[1]}
        </span>
      </span>
    </div>
  );
};

export default TimerModal;