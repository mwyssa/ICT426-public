
import express from "express";
import { authenticateToken } from "../middleware/auth_middleware.js";
import { getMyAccounts } from "../controllers/account_controller.js";
// ---------------------------------------------------------
// GET /api/accounts
// ---------------------------------------------------------
//
// Cette route retourne uniquement les comptes appartenant à l'utilisateur connecté.
// La route sera protégé par le middleware authenticateToken pour vérifier qu'un seul utilisateur authentifié y accède.
//
//

const router = express.Router();

router.get("/", authenticateToken, getMyAccounts);

export default router;


///Dans le fichier : router
// Dans app.js : accountRoutes ou accountsRoutes

