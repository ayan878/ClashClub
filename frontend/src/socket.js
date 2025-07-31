import { io } from "socket.io-client";

// export const socket = io("http://localhost:3000");

const socketUrl =
  import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_PRODUCTION_URL;
export const socket = io(socketUrl);
