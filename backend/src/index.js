import express from "express";
import connection from "./config/connectDB.js";
import dotenv from "dotenv";
import router from "./routes/depositHistoryRoute.js";

import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import otpRouter from "./routes/otpSendRoute.js";
import { socketHandlers } from "./socket.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.1.26:5173",
  "https://clash-club-frontend.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

socketHandlers(io);

app.use(express.json());
app.use(morgan("dev"));
app.use(router);
app.use(otpRouter);

// Serve static frontend for renderer
const frontendPath = path.join(__dirname, "../frontend/dist"); // or "../client/build"
app.use(express.static(frontendPath));
// Define route to fetch users with total_money >= 100
app.get("/", async (req, res) => {
  try {
    const [results] = await connection.query(
      "SELECT * FROM users WHERE total_money >= 100"
    );
    res.json(results);
  } catch (error) {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).send("Database query failed");
    }
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
