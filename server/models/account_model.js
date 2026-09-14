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
        SELECT
            name,
            balance
        FROM Accounts
        WHERE user_id = ?
        `,
        [userId]
    );

    return rows || null;
}

// calcul du solde total de tous les comptes d'un utilisateur
export async function getTotalBalanceByUserId(userId) {
    const [rows] = await pool.execute(
        `
        SELECT SUM(balance) as total_balance
        FROM accounts
        WHERE user_id = ?
        `,
        [userId]
    );
    return rows[0]?.total_balance || 0;
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