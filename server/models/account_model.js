// Import du pool de connexions MySQL.
import pool from "../db/db.js";


/**
 * Insère un nouveau compte bancaire dans MySQL.
 *
 * @param {Object} account Données du compte.
 * @returns {number} ID du compte créé.
 */
export async function insertAccount(account) {

    // Exécution de l'INSERT.
    //
    // Les "?" permettent d'utiliser une requête préparée
    // et évitent de concaténer directement les valeurs dans le SQL.
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

    // insertId contient l'id AUTO_INCREMENT
    // généré par MySQL pour le nouveau compte.
    return result.insertId;
}


/**
 * Recherche un compte bancaire grâce à son id.
 *
 * Cette fonction est notamment utilisée juste après
 * l'INSERT afin de retourner au frontend le compte
 * réellement enregistré dans MySQL.
 *
 * @param {number} id ID du compte.
 * @returns {Object|null} Compte trouvé ou null.
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

    // Retourne le premier compte trouvé,
    // ou null si aucun résultat n'existe.
    return rows[0] || null;
}