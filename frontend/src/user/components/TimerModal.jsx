const TimerModal = ({ seconds }) => {
  if (seconds > 5) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/75">
      <div className="grid grid-cols-2 gap-6">
        {[seconds[0], seconds[1]].map((digit, i) => (
          <div
            key={i}
            className="flex justify-center items-center bg-indigo-600 text-white font-extrabold rounded-lg
                       text-[clamp(4rem,24vw,20rem)] w-[clamp(6rem,24vw,24rem)] h-[clamp(6rem,50vw,56rem)]"
          >
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimerModal;
