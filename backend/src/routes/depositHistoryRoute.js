import express from "express";
import depositHistoryController from "../controllers/depositHistoryController.js";


const router = express.Router();

router.get("/admin/deposit-history", depositHistoryController);

export default router;
