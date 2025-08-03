// import connection from "./config/connectDB.js";

// const durations = [30, 60, 180, 300];
// const timers = {};

// export const socketHandlers = (io) => {
//   // Initialize timer states
//   durations.forEach((duration) => {
//     timers[duration] = {
//       timeLeft: duration,
//       period: null,
//       bettors: [],
//     };

//     const period = generatePeriod();
//     timers[duration].period = period;
//     setInterval(() => {
//       if (timers[duration].timeLeft > 0) {
//         timers[duration].timeLeft--;
//       } else {
//         const { number, color, size } = generateResult();
//         console.log(number, color, size);
//         console.log(timers);

//         // const period = generatePeriod();
//         timers[duration].number = number;
//         timers[duration].color = color;
//         timers[duration].size = size;
//         // timers[duration].period = period;
//         timers[duration].timeLeft = duration;

//         const gameType = `Wingo${duration}`;

//         console.log(gameType);

//         // ✅ INSERT INTO MySQL
//         const time = new Date();
//         console.log(time);

//         (async () => {
//           const insertQuery = `
//  INSERT INTO wingo (game, period, result, status, time)
//  VALUES (?, ?, ?, ?, ?)
//  `;

//           try {
//             const [result] = await connection.query(insertQuery, [
//               gameType,
//               period,
//               number,
//               1,
//               time,
//             ]);
//             console.log(`✅ Inserted: ${result.insertId}`);
//           } catch (err) {
//             console.error("❌ Insert error:", err.message);
//           }
//         })();
//       } // Emit current state to all clients

//       io.emit("timer_tick", {
//         duration,
//         time: timers[duration].timeLeft,
//         period: timers[duration].period,
//         number: timers[duration].number,
//         color: timers[duration].color,
//         size: timers[duration].size,
//       });
//     }, 1000);
//   });

//   io.on("connection", (socket) => {
//     console.log("User connected:", socket.id);
//     // console.log(timers);

//     durations.forEach((duration) => {
//       socket.emit("timer_tick", {
//         duration,
//         time: timers[duration].timeLeft,
//         period: timers[duration].period,
//         number: timers[duration].number,
//         color: timers[duration].color,
//         size: timers[duration].size,
//       });

//       socket.on("wingo-bet", (data) => {
//         const { period, duration, userId } = data;
//         console.log(period, duration, userId);

//         const timer = timers[duration];
//         if (!timer) return; // ✅ Match period

//         // timers.betters.push(userId);

//         if (period === timer.period) {
//           // ✅ Track user once
//           if (!timer.bettors.includes(userId)) {
//             timer.bettors.push(userId);
//           }
//           // console.log(socket.id);

//           console.log("passed");

//           console.log(timer.bettors.includes(userId));
//           if (socket.id === timer.bettors.includes(userId)) {
//           console.log("passed2");

//             socket.emit("wingo-result", { result: true });
//           }
//         }
//       });
//     });
//   });
// };

// // Generates a unique period string based on the current time
// let periodCounter = 0;
// function generatePeriod() {
//   const now = new Date();
//   const year = now.getFullYear();
//   const month = String(now.getMonth() + 1).padStart(2, "0");
//   const day = String(now.getDate()).padStart(2, "0");
//   const hour = String(now.getHours()).padStart(2, "0");
//   const minutes = String(now.getMinutes()).padStart(2, "0");
//   return `${year}${month}${day}${hour}${minutes}${periodCounter++}`;
// }

// function generateResult() {
//   const number = Math.floor(Math.random() * 10);
//   const color =
//     number === 0 || number === 5
//       ? "Violet"
//       : number % 2 === 0
//       ? "Red"
//       : "Green";
//   const size = number > 4 ? "Big" : "Small";

//   return { number, color, size };
// }

import jwt from "jsonwebtoken";
import connection from "./config/connectDB.js";

const durations = [30, 60, 180, 300];
const timers = {};
const JWT_SECRET = process.env.JWT_SECRET; // Replace in production

export const socketHandlers = (io) => {
  // Authenticate users during connection
  // io.use((socket, next) => {
  //   const token = socket.handshake.query.token;
  //   console.log("token:", token);
  //   console.log("userId:", socket.id);

  //   if (!token) return next(new Error("Auth token missing"));

  //   try {

  //     const payload = jwt.verify(token, JWT_SECRET);
  //     socket.userId = payload.userId;

  //     next();
  //   } catch (err) {
  //     next(new Error("Invalid token"));
  //   }
  // });

  // Initialize timers
  durations.forEach((duration) => {
   
    timers[duration] = {
      timeLeft: duration,
      period: generatePeriod(),
      bettors: new Set(),
    };

    setInterval(async () => {
      const timer = timers[duration];

      if (timer.timeLeft > 0) {
        timer.timeLeft--;
      } else {
        const { number, color, size } = generateResult();
        const gameType = `Wingo${duration}`;
        const time = new Date();
        const resultPeriod = timer.period;

        // Save result in DB
        try {
          const insertQuery = `
            INSERT INTO wingo (game, period, result, status, time)
            VALUES (?, ?, ?, ?, ?)
          `;
          const [result] = await connection.query(insertQuery, [
            gameType,
            resultPeriod,
            number,
            1,
            time,
          ]);

          console.log(`✅ Inserted: ${result.insertId}`);
        } catch (err) {
          console.error("❌ Insert error:", err.message,err);
        }

        // Emit result only to bettors
        for (const userId of timer.bettors) {
          io.to(userId).emit("wingo-result", {
            game: duration,
            period: resultPeriod,
            number,
            color,
            size,
          });
        }

        // Reset timer
        timers[duration] = {
          timeLeft: duration,
          period: generatePeriod(),
          bettors: new Set(),
        };
      }

      // Emit timer tick to all users
      io.emit("timer_tick", {
        duration,
        time: timers[duration].timeLeft,
        period: timers[duration].period,
      });
    }, 1000);
  });

  // Handle user connection
  io.on("connection", (socket) => {
    // const userId = socket.userId;
    const userId = socket.id;
    console.log(`✅ User connected: ${userId}`);
    socket.join(userId);

    socket.on("wingo-bet", ({ duration, period }) => {
      const timer = timers[duration];
      if (!timer) return;

      if (timer.period === period) {
        timer.bettors.add(userId);
        console.log(`User ${userId} bet on ${duration}s game`);
      }
    });
  });
};

// Helpers
let periodCounter = 0;
function generatePeriod() {
  const now = new Date();
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(now.getDate()).padStart(2, "0")}${String(now.getHours()).padStart(
    2,
    "0"
  )}${String(now.getMinutes()).padStart(2, "0")}${periodCounter++}`;
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
