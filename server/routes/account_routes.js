/**
 * ROUTES : Comptes (Accounts)
 * Sécurisation: Toutes les routes nécessitent un token valide via authenticateToken.
 */

import express from "express";
// Middleware chargé de vérifier le token JWT.
import { authenticateToken } from "../middleware/auth_middleware.js";
import { getMyAccounts, getMyAccountById } from "../controllers/account_controller.js";

// Contrôleur chargé de créer le compte.
import {
    createAccount,
    deleteAccount
} from "../controllers/account_controller.js";

// Fonctions permettant de récupérer les comptes et les soldes.
import {
    getTotalBalanceByUserId,
    getAccountBalanceByUserIdAndAccountId
} from "../models/account_model.js";

const router = express.Router();

// ---------------------------------------------------------
// POST /api/accounts
// ---------------------------------------------------------
//
// 1. Vérifie que l'utilisateur est connecté.
// 2. Valide les données.
// 3. Crée le compte.
//
router.post(
    "/",
    authenticateToken,
    createAccount
);
// ---------------------------------------------------------
// DELETE /api/accounts/:id
// ---------------------------------------------------------
//
// 1. Vérifie que l'utilisateur est connecté.
// 2. Vérifie que le compte appartient à l'utilisateur.
// 3. Supprime le compte.
//
// ---------------------------------------------------------

router.delete(
    "/:id",
    authenticateToken,
    deleteAccount
);
// Récupérer tous les comptes de l'utilisateur connecté
router.get("/", authenticateToken, getMyAccounts);

// ---------------------------------------------------------
// GET /api/accounts/:id/total-balance
// ---------------------------------------------------------
//
// Récupère le solde total de tous les comptes de l'utilisateur connecté.
//
router.get("/total-balance", authenticateToken, async (req, res) => {

    try {
        const userId = req.user.id;

        const totalBalance =
            await getTotalBalanceByUserId(userId);

        return res.json({
            total_balance: totalBalance
        });

    } catch (error) {

        return res.status(500).json({
            error: "INTERNAL_SERVER_ERROR",
            message: "Erreur lors de la récupération du solde total."
        });
    }
});

// ---------------------------------------------------------
// GET /api/accounts/:id
// ---------------------------------------------------------
//
// Récupérer un compte précis
router.get("/:id", authenticateToken, getMyAccountById);


// ---------------------------------------------------------
// GET /api/accounts/:userId/:accountId
// ---------------------------------------------------------
//
// Récupère le solde d'un compte spécifique.
//
router.get("/:accountId/balance",authenticateToken, async (req, res) => {

    try {
        const userId = req.user.id;
        const accountId = parseInt(req.params.accountId);

        const accountInfo =
            await getAccountBalanceByUserIdAndAccountId(
                userId,
                accountId
            );

        if (!accountInfo) {
            return res.status(404).json({
                error: "NOT_FOUND",
                message: "Compte non trouvé."
            });
        }

        return res.json(accountInfo);

    } catch (error) {

        return res.status(500).json({
            error: "INTERNAL_SERVER_ERROR",
            message: "Erreur lors de la récupération du compte."
        });
    }
});


// Cette route retourne uniquement les comptes appartenant à l'utilisateur connecté.
// La route sera protégé par le middleware authenticateToken pour vérifier qu'un seul utilisateur authentifié y accède.



export default router;