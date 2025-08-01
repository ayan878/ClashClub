// import { io } from "socket.io-client";

// export const socket = io("http://localhost:3000");

// const socketUrl =
// //   import.meta.env.VITE_SOCKET_URL ||
//   import.meta.env.VITE_PRODUCTION_URL;
// export const socket = io(socketUrl);

import { io } from "socket.io-client";

// Detect environment and set correct URL
// const URL =
//   // eslint-disable-next-line no-undef
//   process.env.NODE_ENV === "production"
//     ? "https://clash-club-backend.vercel.app"
//     : "http://localhost:3000";

export const socket = io("https://clash-club-backend.vercel.app");
// export const socket = io(URL, {
//   withCredentials: true, // Optional: for cookies/auth if used
// });
