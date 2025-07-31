

const durations = [30, 60, 180, 300];
const timers = {}; 

export const socketHandlers = (io) => {
  // Initialize timer states
  durations.forEach((duration) => {
    timers[duration] = {
      timeLeft: duration,
      period: null,
    };

    setInterval(() => {
      if (timers[duration].timeLeft > 0) {
        timers[duration].timeLeft--;
      } else {
        timers[duration].period = generatePeriod();
        timers[duration].timeLeft = duration;
      } // Emit current state to all clients

      io.emit("timer_tick", {
        duration,
        time: timers[duration].timeLeft,
        period: timers[duration].period,
      });
    }, 1000);
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id); 
    durations.forEach((duration) => {
      socket.emit("timer_tick", {
        duration,
        time: timers[duration].timeLeft,
        period: timers[duration].period,
      });
    });
  });
};

// Generates a unique period string based on the current time
function generatePeriod() {
  let count = 0;
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return Number(`${year}${month}${day}${hour}${minutes}${seconds}${count++}`);
}
