/**
 * ROUTES : Transactions
 * Sécurisation: Bloque l'accès aux données si le token est manquant ou invalide.
 */


import express from "express";
import { authenticateToken } from "../middleware/auth_middleware.js";
import {getMyTransactionById, getMyTransactions} from "../controllers/transaction_controller.js";

const router = express.Router();

// Récupérer tous les transactions de l'utilisateur connecté
router.get("/", authenticateToken, getMyTransactions);

// Récupérer un compte précis
router.get("/:id", authenticateToken, getMyTransactionById);

export default router;