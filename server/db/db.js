import mysql from "mysql2/promise";

// Création d'un pool de connexions MySQL.
// Un pool permet de réutiliser plusieurs connexions à la base
// au lieu d'en ouvrir une nouvelle pour chaque requête.
const pool = mysql.createPool({

    // Informations de connexion récupérées depuis le fichier .env
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

    // Attend qu'une connexion soit disponible si toutes
    // les connexions du pool sont déjà utilisées.
    waitForConnections: true,

    // Nombre maximum de connexions ouvertes simultanément.
    connectionLimit: 10,

    // 0 signifie qu'il n'y a pas de limite de requêtes
    // pouvant attendre une connexion disponible.
    queueLimit: 0
});

// Export du pool pour pouvoir l'utiliser dans les modèles.
export default pool;