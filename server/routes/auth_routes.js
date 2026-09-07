import express from "express";

// Import du contrôleur qui contient la logique de connexion.
import { login } from "../controllers/auth_controller.js";


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
router.post("/login", login);


// Export du router pour pouvoir l'utiliser dans app.js.
export default router;