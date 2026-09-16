/**
 * ROUTES : Comptes (Accounts)
 * Sécurisation: Toutes les routes nécessitent un token valide via authenticateToken.
 */
import express from "express";
import { authenticateToken } from "../middleware/auth_middleware.js";
import { getMyAccounts, getMyAccountById } from "../controllers/account_controller.js";


// Cette route retourne uniquement les comptes appartenant à l'utilisateur connecté.
// La route sera protégé par le middleware authenticateToken pour vérifier qu'un seul utilisateur authentifié y accède.

const router = express.Router();

// Récupérer tous les comptes de l'utilisateur connecté
router.get("/", authenticateToken, getMyAccounts);

// Récupérer un compte précis
router.get("/:id", authenticateToken, getMyAccountById);

export default router;

