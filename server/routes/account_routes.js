import express from 'express';
// Import du contrôleur qui contient la logique de récupération des informations du compte. --> probablement plus de fonctions à venir
import { getAccountByUserId } from '../models/account_model.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const account = await getAccountByUserId(id);
        if (!account) {
            return res.status(404).json({ error: "NOT_FOUND", message: "Compte non trouvé." });
        }
        res.json(account);
    } catch (error) {
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR", message: "Erreur interne du serveur." });
    }
});

export default router;