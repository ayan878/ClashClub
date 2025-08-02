import express from "express";
import wingoBetRoute from "../routes/wingoBetRoute.js";
import depositHistoryRoute from "../routes/depositHistoryRoute.js";

const router = express.Router();

router.use(wingoBetRoute);
router.use(depositHistoryRoute);

export default router;
