/**
 * CONTROLLER : Gestion des Comptes (Accounts)
 * Rôle : Reçoit les requêtes HTTP, extrait l'utilisateur et appelle le modèle.
 */

import { findAccountsByUserId, findAccountByIdAndUser} from "../models/account_model.js";

/* Retourne les comptes de l'utilisateur connecté.*/
export async function getMyAccounts(req, res) {

    try {
        const userId = req.user.id;
        const accounts = await findAccountsByUserId(userId);
        res.json(accounts);
    } catch (error) {
        res.status(500).json({message: "Une erreur interne est survenue"});
    }
}
/* Retourne un compte spécifique de l'utilisateur connecté.*/
export async function getMyAccountById(req, res) {

    try {
        const userId = req.user.id;
        const accountId = req.params.id;
        const account = await findAccountByIdAndUser(accountId, userId);

        if (!account) {
            return res.status(404).json({message: "Compte non trouvé ou accès refusé"});
        }
        res.json(account)
    } catch(error) {
        res.status(500).json({message: "Une erreur interne est survenue"});
    }
}
