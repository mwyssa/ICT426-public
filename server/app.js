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

app.use(
    cors({
        origin: process.env.FRONTEND_URL
    })
);

// ---------------------------------------------------------
// JSON
// ---------------------------------------------------------

app.use(express.json());

// ---------------------------------------------------------
// Routes
// ---------------------------------------------------------

app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);

// ---------------------------------------------------------
// Route inexistante
// ---------------------------------------------------------

app.use((req, res) => {
    return res.status(404).json({
        error: "NOT_FOUND",
        message: "Route inexistante."
    });
});

// ---------------------------------------------------------
// Gestion globale des erreurs
// ---------------------------------------------------------

app.use(errorHandler);

// Export de l'application pour server.js.
export default app;