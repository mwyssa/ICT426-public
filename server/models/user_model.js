// Import du pool de connexions MySQL.
import pool from "../db/db.js";

/**
 * Recherche un utilisateur dans la base de données
 * à partir de son adresse email.
 *
 * @param {string} email Adresse email de l'utilisateur.
 * @returns {Object|null} Utilisateur trouvé ou null.
 */
export async function findUserByEmail(email) {

    // Exécution de la requête SQL.
    //
    // Le "?" est remplacé automatiquement par la valeur contenue
    // dans le tableau [email].
    //
    // Cela évite de concaténer directement l'email dans la requête
    // et permet de limiter les risques d'injection SQL.
    const [rows] = await pool.execute(
        `
        SELECT
            id,
            name,
            hash,
            mail,
            role,
            family_id
        FROM Users
        WHERE mail = ?
        LIMIT 1
        `,
        [email]
    );

    // Si un utilisateur a été trouvé, on retourne le premier résultat.
    // Sinon, on retourne null.
    return rows[0] || null;
}