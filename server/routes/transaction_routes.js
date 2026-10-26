/**
 * ROUTES : Transactions
 * Sécurisation: Bloque l'accès aux données si le token est manquant ou invalide.
 */


import express from "express";
import { authenticateToken } from "../middleware/auth_middleware.js";
import {getMyTransactionById, getMyTransactions} from "../controllers/transaction_controller.js";

const router = express.Router();

// Récupérer tous les transactions de l'utilisateur connecté
/**
 * @openapi
 * /api/transactions:
 *   get:
 *     tags:
 *      - GET
 *     summary: Récupérer toutes les transactions de l'utilisateur connecté
 *     description: Récupère toutes les transactions de l'utilisateur connecté.
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      200:
 *        description: Transactions récupérées avec succès
 *      500:
 *        description: Erreur interne du serveur lors de la récupération des transactions
 */
router.get("/", authenticateToken, getMyTransactions);

/**
 * @openapi
 * /api/transactions/{id}:
 *   get:
 *     tags:
 *      - GET
 *     summary: Récupérer une transaction spécifique de l'utilisateur connecté
 *     description: Récupère une transaction spécifique de l'utilisateur connecté.
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: Transaction récupérée avec succès
 *       404:
 *         description: Transaction non trouvée
 *       500:
 *         description: Erreur interne du serveur lors de la récupération de la transaction
 */
// Récupérer un compte précis
router.get("/:id", authenticateToken, getMyTransactionById);

export default router;