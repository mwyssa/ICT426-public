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

/**
 * Crée un nouvel utilisateur en base de données.
 *
 * @param {string} name Nom de l'utilisateur
 * @param {string} email Adresse email de l'utilisateur.
 * @param {string} hashedPassword Mot de passe haché (via bcrypt).
 * @returns {number} ID du nouvel utilisateur inséré.
 */
export async function createUser(name, email, hashedPassword) {
    // on déclare la fonction asynchrone qui va intéragir avec la BD
    // elle prends en paramètre le name, l'email de l'user et son mot de passe déjà hashé

    const defaultRole = 'user';
    const defaultFamilyId = 1;
    // on met default car la BD est stricte mais dans les faits dans postman on va juste envoyer le mail et le mot de passe.

    const [result] = await pool.execute(    // await pour attendre que la requête SQL se termine
                                            // pool.execute() c'est léa méthode de MySQL2 pour exécuter la requête de manière safe
        // result ici c'est l'objet que la base de donnée renvoie quand la requête d'insertion est terminée.
        // y'a result entre crochets car mysql2 renvoie un tableau avec les données/résultats de la requête et les métadonnées
        // const [result] = ... est utile pour desctructurer un tableau en javascript.
        `
        INSERT INTO Users (name, mail, hash, role, family_id)
        VALUES (?, ?, ?, ?, ?)
        `,  //ces champs sont not null dans la BD
        // on insère une nouvelle ligne dans la table Users en remplissant les colonnes mail et hash
        // les ? c'est des paramètres de substitutions pour la sécurité comme Andolfatto avait expliqué.
        [name, email, hashedPassword, defaultRole, defaultFamilyId] // c'est le tableau de valeur qui vient remplacer les ?
    );

    return result.insertId; // result.insertID récupère l'ID qui vient d'être généré par la table sql en auto-incrémentation.
}