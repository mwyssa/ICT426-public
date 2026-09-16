/**
 * MODEL : Gestion des Comptes (Accounts)
 * Description : Regroupe les requêtes SQL sécurisées pour accéder aux comptes bancaires.
 */


import pool from "../db/db.js";

/**
 * Récupère uniquement les comptes appartenant à l'utilisateur connecté.*
 * Pour la route : GET /api/accounts. */
export async function findAccountsByUserId(userId) {

    const [rows] = await pool.execute(
        `
        SELECT id, name,balance,type
        FROM Accounts
        WHERE user_id = ?
        `,
        [userId]
    );

    return rows;
}

/**
 * Récupère un compte spécifique uniquement s'il appartient à l'utilisateur connecté.
 Pour la route : GET /api/accounts/:id. */

export async function findAccountByIdAndUser(accountId,userId) {

    const [rows] = await pool.execute(
        `
        SELECT id, name,balance,type
        FROM Accounts
        WHERE id = ? AND user_id = ?
        `,
        [accountId, userId]
    );

    // Si on a trouvé au moins une ligne dans la base de données
    if (rows.length > 0) {
        return rows[0]; // On renvoie le compte (le premier élément du tableau)
    } else {
        return null;    // Sinon, on renvoie null (rien trouvé)
    }
}