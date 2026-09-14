import { findTransactionByUserId } from "../models/transaction_model.js";

export async function getMyTransactions(req, res) {
    try {
        const transactions = await findTransactionByUserId(req.user.id);

        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Erreur lors de la récupération des transactions"
        });
    }
}
