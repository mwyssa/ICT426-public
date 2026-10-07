import express from "express";

// Import du contrôleur qui contient la logique de connexion.
// on importe aussi register^pour le contrôleur d'inscription
import { login, register } from "../controllers/auth_controller.js";


// Création d'un router Express.
const router = express.Router();


// ---------------------------------------------------------
// POST /api/auth/login
// ---------------------------------------------------------
//
// Cette route reçoit :
//
// {
//     "email": "***",
//     "password": "***"
// }
//
// Puis appelle la fonction login du contrôleur.
// Route de connexion
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *    summary: Connexion de l'utilisateur
 *    description: Authentifie un utilisateur avec son email et son mot de passe.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *              $ref: "#/components/schemas/login"
 *    responses:
 *      200:
 *        description: Connexion réussie
 *      400:
 *        description: Requête invalide (email ou mot de passe manquant)
 *      401:
 *        description: Échec de l'authentification (email ou mot de passe incorrect)
 */
router.post("/login", login);
// Route d'incription (pour création utilisateur)
router.post("/register", register);

// Export du router pour pouvoir l'utiliser dans app.js.
export default router;