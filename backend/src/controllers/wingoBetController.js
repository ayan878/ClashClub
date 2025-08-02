import connection from "../config/connectDB.js";

const wingoBetController = async (req, res) => {
  const { period, gameType, number, color, size, totalAmount } = req.body;

  console.log('gameType:',gameType);
  
  if (!totalAmount || totalAmount <= 0) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid bet amount" });
  }

  if (!number && !color && !size) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Bet must include number, color, or size",
      });
  }

  const phone = 8651939500; 
  const taxAmount = 0.18 * totalAmount;
  const betAmount = totalAmount - taxAmount;
  const status = 0;

  try {
    const insertQuery = `
      INSERT INTO wingo_bets (
        period,
        phone,
        game,
        number,
        size,
        color,
        betAmount,
        taxAmount,
        totalAmount,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await connection.execute(insertQuery, [
      period,
      phone,
      gameType,
      number || null,
      size || null,
      color || null,
      betAmount,
      taxAmount,
      totalAmount,
      status,
    ]);

    return res
      .status(200)
      .json({ success: true, message: "Bet submitted successfully" });
  } catch (error) {
    console.error("❌ Error inserting wingo bet:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default wingoBetController;
