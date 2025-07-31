import { io } from "socket.io-client";

// export const socket = io("http://localhost:3000");


import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL;
export const socket = io(socketUrl);
