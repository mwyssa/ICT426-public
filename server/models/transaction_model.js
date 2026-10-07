/**
 * MODEL : Gestion des Transactions
 * Description : Regroupe les requêtes SQL permettant de récupérer l'historique financier.
 */


import pool from "../db/db.js";

/* Récupère toutes les transactions des comptes de l'utlisateur connecté.*
Pour la route : GET /api/transactions. */

export async function findTransactionByUserId(userId) {

    const [rows] = await pool.execute(
        `
            SELECT t.*
            FROM Transactions t
            JOIN Accounts a ON t.account_id = a.id
            WHERE  a.user_id = ?
        `,
        [userId]
    );

    // Si la transaction existe et appartient à l'utilisateur
    if (rows.length > 0) {
        return rows[0]; // On renvoie la transaction trouvée
    } else {
        return null;    // Sinon on renvoie null
    }
}


/*Récupère une transaction précise uniquement si elle appartient à l'utilisateur connecté.*
Pour la route : GET /api/transactions/:id. */

export async function findTransactionByIdAndUser(transactionId,userId) {

    const [rows] = await pool.execute(
        `
            SELECT t.*
            FROM Transactions t
            JOIN Accounts a ON t.account_id = a.id
            WHERE t.id = ? AND a.user_id = ?
        `,
        [transactionId, userId]
    );

    // Si la transaction existe et appartient à l'utilisateur
    if (rows.length > 0) {
        return rows[0]; // On renvoie la transaction trouvée
    } else {
        return null;    // Sinon on renvoie null
    }
}





