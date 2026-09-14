import express from "express";
import { authenticateToken } from "../middleware/auth_middleware.js";
import { getMyTransactions } from "../controllers/transaction_controller.js";

const router = express.Router();

router.get("/", authenticateToken, getMyTransactions);

export default router;
