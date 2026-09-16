/**
 * CONTROLLER : Gestion des Transactions
 * Rôle : Reçoit les requêtes HTTP, extrait l'utilisateur et appelle le modèle.
 */

import { findTransactionByUserId, findTransactionByIdAndUser } from "../models/transaction_model.js";

/* Retourne les comptes de l'utilisateur connecté.*/
export async function getMyTransactions(req, res) {

    try {
        const userId = req.user.id;
        const transactions = await findTransactionByUserId(userId);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({message: "Une erreur interne est survenue"});
    }
}
/* Retourne une transaction spécifique  l'utilisateur connecté.*/
export async function getMyTransactionById(req, res) {

    try {
        const userId = req.user.id;
        const transactionId = req.params.id;
        const transaction = await findTransactionByIdAndUser(transactionId, userId);

        if (!transaction) {
            return res.status(404).json({message: "Transaction non trouvé ou accès refusé"});
        }
        res.json(transaction)

    } catch(error) {
        res.status(500).json({message: "Une erreur interne est survenue"});
    }
}
