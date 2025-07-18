import connection from "../config/connectDB.js";

const depositHistoryController = async (req, res) => {
  try {
    // const userPhone = req.user?.phone;

    const userPhone = "";
    // if (!userPhone) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

   
    const [rechargeRows] = await connection.execute(
      `SELECT * FROM recharge`,
    );
    console.log('recharge:',rechargeRows);
    
    return res.status(200).json({
      message: "Data fetched successfully",
      data: rechargeRows,
    });
  } catch (error) {
    console.error("Error fetching deposit history:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default depositHistoryController;
