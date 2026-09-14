import express from "express";

// Contrôleur chargé de créer le compte.
import {
    createAccount
} from "../controllers/account_controller.js";

// Middleware chargé de vérifier le token JWT.
import {
    authenticateToken
} from "../middleware/auth_middleware.js";


const router = express.Router();


// ---------------------------------------------------------
// POST /api/accounts
// ---------------------------------------------------------
//
// Ordre d'exécution :
//
// 1. authenticateToken
//    → vérifie que l'utilisateur est connecté.
//
// 2. createAccount
//    → valide les données et crée le compte.
//
// Si authenticateToken refuse la requête,
// createAccount n'est jamais exécuté.
router.post(
    "/",
    authenticateToken,
    createAccount
);


export default router;