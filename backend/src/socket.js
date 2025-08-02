import connection from "./config/connectDB.js";

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
        const { number, color, size } = generateResult();
        console.log(number, color, size);

        const period = generatePeriod();
        timers[duration].number = number;
        timers[duration].color = color;
        timers[duration].size = size;
        timers[duration].period = period;
        timers[duration].timeLeft = duration;

        const gameType = `Wingo${duration}`;

        console.log(gameType);

        // ✅ INSERT INTO MySQL
        const time = new Date();
        console.log(time);

        (async () => {
          const insertQuery = `
 INSERT INTO wingo (game, period, result, status, time)
 VALUES (?, ?, ?, ?, ?)
 `;

          try {
            const [result] = await connection.query(insertQuery, [
              gameType,
              period,
              number,
              1,
              time,
            ]);
            console.log(`✅ Inserted: ${result.insertId}`);
          } catch (err) {
            console.error("❌ Insert error:", err.message);
          }
        })();
      } // Emit current state to all clients

      io.emit("timer_tick", {
        duration,
        time: timers[duration].timeLeft,
        period: timers[duration].period,
        number: timers[duration].number,
        color: timers[duration].color,
        size: timers[duration].size,
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
        number: timers[duration].number,
        color: timers[duration].color,
        size: timers[duration].size,
      });
    });
  });
};

// Generates a unique period string based on the current time
let periodCounter = 0;
function generatePeriod() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}${month}${day}${hour}${minutes}${periodCounter++}`;
}

function generateResult() {
  const number = Math.floor(Math.random() * 10);
  const color =
    number === 0 || number === 5
      ? "Violet"
      : number % 2 === 0
      ? "Red"
      : "Green";
  const size = number > 4 ? "Big" : "Small";

  return { number, color, size };
}
