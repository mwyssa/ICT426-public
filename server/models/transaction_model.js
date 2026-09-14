import pool from "../db/db.js";



export async function findTransactionByUserId(userId) {

    const [rows] = await pool.execute(
        `
        SELECT
            t.id,
            t.date,
            t.amount,
            t.description,
            t.envelope_id,
            t.account_id
        FROM Transactions t
                 INNER JOIN Accounts a
                            ON t.account_id = a.id
        WHERE a.user_id = ?
        `,
        [userId]
    );

    return rows;
}





