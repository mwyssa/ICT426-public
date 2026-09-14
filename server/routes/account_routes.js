import express from "express";

// Contrôleur chargé de créer le compte.
import {
    createAccount
} from "../controllers/account_controller.js";

// Middleware chargé de vérifier le token JWT.
import {
    authenticateToken
} from "../middleware/auth_middleware.js";

// Fonctions permettant de récupérer les comptes et le solde total.
import {
    getAccountByUserId,
    getTotalBalanceByUserId
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
// GET /api/accounts/:id
// ---------------------------------------------------------
//
// Récupère les comptes associés à un utilisateur.
// :id correspond à l'id de l'utilisateur.
//
router.get("/:id", async (req, res) => {

    try {
        const id = parseInt(req.params.id);

        const account = await getAccountByUserId(id);

        if (!account) {
            return res.status(404).json({
                error: "NOT_FOUND",
                message: "Aucun compte trouvé."
            });
        }

        return res.json(account);

    } catch (error) {

        return res.status(500).json({
            error: "INTERNAL_SERVER_ERROR",
            message: "Erreur lors de la récupération des comptes."
        });
    }
});

// ---------------------------------------------------------
// GET /api/accounts/:id/total-balance
// ---------------------------------------------------------
//
// Récupère le solde total de tous les comptes
// d'un utilisateur.
//
router.get("/:id/total-balance", async (req, res) => {

    try {
        const id = parseInt(req.params.id);

        const totalBalance =
            await getTotalBalanceByUserId(id);

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

export default router;