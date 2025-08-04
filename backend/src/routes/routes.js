import express from "express";

import depositHistoryController from "../controllers/depositHistoryController.js";
import wingoBetController from "../controllers/wingoBetController.js";
import { sendOtpCode } from "../utils/sendOTP.js";
import wingoHistoryController from "../controllers/wingoHistoryController.js";

const router = express.Router();

router.post("/send_otp", sendOtpCode);
router.post("/wingoGameBet", wingoBetController);
router.get("/admin/deposit-history", depositHistoryController);
router.get("/wingo-history", wingoHistoryController);

export default router;
