import express from "express";
import swaggerUi from 'swagger-ui-express';
import {openApiSpecification} from './swagger.js';
// CORS permet au frontend Vite situé sur un autre port
// d'envoyer des requêtes vers notre API.
import cors from "cors";


// Import des routes.
import authRoutes from "./routes/auth_routes.js";
import accountRoutes from "./routes/account_routes.js";
import transactionsRoutes from "./routes/transaction_routes.js";
import familyRoutes from "./routes/family_routes.js";

// import accountsRoutes from "./routes/account_routes.js";

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
// Routes
// ---------------------------------------------------------


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification)); // route pour la documentation Swagger
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
// Connexion du routeur des comptes à l'application Express.
// Toutes les routes définies dans accountRoutes seront accessibles
// via le préfixe /api/accounts
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/family", familyRoutes);
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