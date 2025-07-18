import express from "express";
import connection from "./config/connectDB.js"; // Importing the MySQL connection
import dotenv from "dotenv"; // To load environment variables
import router from "./routes/depositHistoryRoute.js";
import cors from 'cors'
dotenv.config(); // Loading environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests
app.use(router);
// Define route to fetch users with total_money >= 100
app.get("/users", (req, res) => {
  connection.query(
    "SELECT * FROM users WHERE total_money >= 100",
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err); // Log error if the query fails
        return res.status(500).send("Database query failed"); // Return error response
      }
      res.json(results); // Return results as JSON
    }
  );
});

// Debugging: Print environment variables to verify they are loaded
console.log("user", process.env.DATABASE_USER); // Should print your DB username
console.log("password", process.env.DATABASE_PASSWORD); // Should print your DB password
console.log("host", process.env.DATABASE_HOST); // Should print 'localhost'

// Listen on port 3000 (or custom port from environment variable)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
