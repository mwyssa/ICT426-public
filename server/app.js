import express from "express";

// CORS permet au frontend Vite situé sur un autre port
// d'envoyer des requêtes vers notre API.
import cors from "cors";


// Import des routes.
import authRoutes from "./routes/auth_routes.js";
import accountRoutes from "./routes/account_routes.js";


// Middleware global de gestion des erreurs.
import { errorHandler } from "./middleware/error_middleware.js";


// Création de l'application Express.
const app = express();


// ---------------------------------------------------------
// CORS
// ---------------------------------------------------------

// Autorise uniquement le frontend défini dans le fichier .env.
//
// Exemple :
// http://localhost:5173
app.use(
    cors({
        origin: process.env.FRONTEND_URL
    })
);


// ---------------------------------------------------------
// JSON
// ---------------------------------------------------------

// Permet à Express de lire les requêtes JSON.
//
// Sans cela, req.body serait vide pour une requête comme :
//
// {
//     "email": "test@test.ch",
//     "password": "123456"
// }
app.use(express.json());


// ---------------------------------------------------------
// Routes publiques
// ---------------------------------------------------------

// Toutes les routes déclarées dans auth_routes.js
// commenceront par /api/auth.
//
// Exemple :
//
// router.post("/login")
//
// devient :
//
// POST /api/auth/login
app.use("/api/auth", authRoutes);
app.use("/accounts", accountRoutes);
// ---------------------------------------------------------
// Routes des comptes bancaires
// ---------------------------------------------------------

// Exemple :
// POST /api/accounts
app.use("/api/accounts", accountRoutes);

// ---------------------------------------------------------
// Route inexistante
// ---------------------------------------------------------

// Ce middleware est exécuté si aucune route précédente
// ne correspond à la requête.
app.use((req, res) => {

    return res.status(404).json({
        error: "NOT_FOUND",
        message: "Route inexistante."
    });
});


// ---------------------------------------------------------
// Gestion globale des erreurs
// ---------------------------------------------------------

// Doit être placé après les routes.
//
// Les erreurs transmises avec next(error)
// arriveront dans errorHandler.
app.use(errorHandler);


// Export de l'application pour server.js.
export default app;