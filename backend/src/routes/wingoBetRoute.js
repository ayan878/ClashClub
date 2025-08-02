import express from "express";
import wingoBetController from "../controllers/wingoBetController.js";

const router = express.Router();

router.post("/wingoGameBet", wingoBetController);

export default router;