import pool from "../db/db.js";

/**
 * Récupère uniquement les comptes appartenant à l'utilisateur connecté.*/
export async function findAccountsByUserId(userId) {

    const [rows] = await pool.execute(
        `
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
}
