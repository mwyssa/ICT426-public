// import de la bd
import pool from "../db/db.js";

// récupération d'un compte par l'id du user
export async function getAccountByUserId(userId) {
    const [rows] = await pool.execute(
        `
        SELECT name, balance
        FROM accounts
        WHERE user_id = ?
        `,
        [userId]
    );
    return rows || null;
}