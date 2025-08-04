import connection from "../config/connectDB.js";

const wingoHistoryController = async (req, res) => {

    console.log("📥 wingoHistoryController triggered"); 
  try {
    const [history] = await connection.execute(`SELECT * FROM wingo`);

    console.log("History:", history);

    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Internal Server Error" }); 
  }
};

export default wingoHistoryController;
