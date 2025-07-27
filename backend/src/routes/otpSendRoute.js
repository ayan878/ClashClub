import express from "express";
import { sendOtpCode } from "../utils/sendOTP.js";

const otpRouter = express.Router();
otpRouter.post("/send_otp", sendOtpCode);

export default otpRouter;
