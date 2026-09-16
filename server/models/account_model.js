/**
 * MODEL : Gestion des Comptes (Accounts)
 * Description : Regroupe les requêtes SQL sécurisées pour accéder aux comptes bancaires.
 */

import pool from "../db/db.js";

/**
 * Insère un nouveau compte bancaire dans MySQL.
 */
export async function insertAccount(account) {
    const [result] = await pool.execute(
        `
        INSERT INTO Accounts
        (
            name,
            balance,
            user_id,
            type
        )
        VALUES (?, ?, ?, ?)
        `,
        [
            account.name,
            account.balance,
            account.user_id,
            account.type
        ]
    );

    return result.insertId;
}

/**
 * Recherche un compte bancaire grâce à son id.
 */
export async function findAccountById(id) {
    const [rows] = await pool.execute(
        `
        SELECT
            id,
            name,
            balance,
            user_id,
            type
        FROM Accounts
        WHERE id = ?
        LIMIT 1
        `,
        [id]
    );

    return rows[0] || null;
}

/**
 * Récupère les comptes d'un utilisateur.
 */
export async function getAccountByUserId(userId) {
    const [rows] = await pool.execute(
        `
        SELECT id, name,balance,type
        SELECT
            id,
            name,
            balance,
            type
        FROM Accounts
        WHERE user_id = ?
        `,
        [userId]
    );

    return rows;
    return rows || null;
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

// calcul du solde total de tous les comptes d'un utilisateur
export async function getTotalBalanceByUserId(userId) {
    const [rows] = await pool.execute(
        `
        SELECT id, name,balance,type
        FROM Accounts
        WHERE id = ? AND user_id = ?
        SELECT SUM(balance) as total_balance
        FROM accounts
        WHERE user_id = ?
        `,
        [accountId, userId]
        [userId]
    );
    return rows[0]?.total_balance || 0;
}

    // Si on a trouvé au moins une ligne dans la base de données
    if (rows.length > 0) {
        return rows[0]; // On renvoie le compte (le premier élément du tableau)
    } else {
        return null;    // Sinon, on renvoie null (rien trouvé)
    }
// récupération du solde d'un compte spécifique par l'id de l'utilisateur et l'id du compte
export async function getAccountBalanceByUserIdAndAccountId(userId, accountId) {
    const [rows] = await pool.execute(
        `
        SELECT name, balance, type
        FROM accounts
        WHERE user_id = ? AND id = ?
        `,
        [userId, accountId]
    );
    return rows || 0;
}

/**
 * Supprime un compte bancaire appartenant à un utilisateur.
 *
 * @param {number} accountId ID du compte à supprimer.
 * @param {number} userId ID de l'utilisateur connecté.
 * @returns {number} Nombre de lignes supprimées.
 */
export async function deleteAccountByIdAndUserId(
    accountId,
    userId
) {
    const [result] = await pool.execute(
        `
        DELETE FROM Accounts
        WHERE id = ?
          AND user_id = ?
        `,
        [
            accountId,
            userId
        ]
    );

    return result.affectedRows;
}