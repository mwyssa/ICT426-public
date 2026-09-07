// Charge automatiquement les variables du fichier .env
// dans process.env.
import "dotenv/config";


// Import de l'application Express.
import app from "./app.js";


// Import du pool MySQL.
import pool from "./db/db.js";


// Récupération du port défini dans .env.
//
// Si PORT n'existe pas,
// le serveur utilisera le port 3000.
const PORT = process.env.PORT || 3000;


/**
 * Démarre le serveur.
 *
 * Avant de démarrer Express,
 * on vérifie que la connexion MySQL fonctionne.
 */
async function startServer() {

    try {

        // ---------------------------------------------------------
        // 1. Test de connexion à MySQL
        // ---------------------------------------------------------

        // SELECT 1 est une petite requête permettant de vérifier
        // simplement que MySQL répond correctement.
        //
        // Elle ne lit et ne modifie aucune table.
        await pool.query("SELECT 1");

        console.log("Connexion MySQL réussie.");


        // ---------------------------------------------------------
        // 2. Démarrage du serveur Express
        // ---------------------------------------------------------

        app.listen(PORT, () => {

            console.log(
                `API disponible sur http://localhost:${PORT}`
            );

        });

    } catch (error) {

        // ---------------------------------------------------------
        // 3. Impossible de contacter MySQL
        // ---------------------------------------------------------

        console.error(
            "Impossible de se connecter à MySQL :",
            error.message
        );

        // Arrête complètement le processus Node.js.
        //
        // Code 1 = arrêt provoqué par une erreur.
        process.exit(1);
    }
}


// Lancement du serveur.
startServer();