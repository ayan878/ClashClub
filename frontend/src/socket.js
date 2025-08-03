

// const socketUrl =
// //   import.meta.env.VITE_SOCKET_URL ||
//   import.meta.env.VITE_PRODUCTION_URL;
// export const socket = io(socketUrl);

// import { io } from "socket.io-client";

// Detect environment and set correct URL
// const URL =
//   // eslint-disable-next-line no-undef
//   process.env.NODE_ENV === "production"
//     ? "https://clash-club-backend.vercel.app"
//     : "http://localhost:3000";

// export const socket = io(URL);
// export const socket = io(URL, {
//   withCredentials: true, // Optional: for cookies/auth if used
// });

// import { io } from "socket.io-client";

// export const socket = io("http://localhost:3000");


import io from "socket.io-client";
// import Cookies from "js-cookie";

// const token = Cookies.get("auth_token"); // Token from secure login

const token = "user_123";
const socket = io("http://localhost:3000", {
  query: { token },
});

export default socket;

// Listen to timer updates
// socket.on("timer_tick", (data) => {
//   console.log("⏳ Timer:", data);
// });

// // Listen to result
// socket.on("wingo-result", (result) => {
//   console.log("🎯 Result received:", result);
// });

// // Place a bet
// function placeBet(duration, period) {
//   socket.emit("wingo-bet", { duration, period });
// }
