import { findAccountsByUserId } from "../models/account_model.js";

/* Retourne les comptes de l'utilisateur connecté.*/
export async function getMyAccounts(req, res, next) {

    try {
        const accounts = await findAccountsByUserId(req.user.id);
        return res.status(200).json({
            accounts
        });

    } catch (error) {

        next(error);
    }
}
