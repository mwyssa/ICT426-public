/**
 * CONTROLLER : Gestion des Comptes (Accounts)
 * Rôle : Reçoit les requêtes HTTP, extrait l'utilisateur et appelle le modèle.
 */

import { getAccountByUserId, findAccountByIdAndUser} from "../models/account_model.js";

/* Retourne les comptes de l'utilisateur connecté.*/
export async function getMyAccounts(req, res) {
    try {
        const userId = req.user.id;
        const accounts = awaitgetAccountByUserId(userId);
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
        const account = await getAccountByIdAndUser(accountId, userId);

        if (!account) {
            return res.status(404).json({message: "Compte non trouvé ou accès refusé"});
        }
        res.json(account)
    } catch(error) {
        res.status(500).json({message: "Une erreur interne est survenue"});
    }
}




// Validator permettant de vérifier les données reçues.
    import {
        validateCreateAccount
    } from "../validators/account_validator.js";

// Fonctions permettant d'accéder à MySQL.
    import {
        insertAccount,
        findAccountById,
        deleteAccountByIdAndUserId
    } from "../models/account_model.js";


    /**
     * Crée un nouveau compte bancaire.
     *
     * Endpoint :
     * POST /api/accounts
     *
     * Cette fonction est appelée uniquement après
     * le middleware authenticateToken.
     */
    export async function createAccount(req, res, next) {

        try {

            // ---------------------------------------------------------
            // 1. Validation des données reçues
            // ---------------------------------------------------------

            const validation = validateCreateAccount(req.body);

            // Si une donnée est incorrecte,
            // on arrête immédiatement la création.
            if (!validation.valid) {
                return res.status(400).json({
                    error: "VALIDATION_ERROR",
                    message: "Les données envoyées sont invalides.",
                    details: validation.errors
                });
            }


            // ---------------------------------------------------------
            // 2. Récupération de l'utilisateur connecté
            // ---------------------------------------------------------

            // req.user a été créé dans auth_middleware.js
            // après vérification du JWT.
            //
            // On récupère donc directement l'id de l'utilisateur
            // authentifié.
            const userId = req.user.id;


            // ---------------------------------------------------------
            // 3. Création du compte
            // ---------------------------------------------------------

            // On prépare les données à enregistrer.
            //
            // Remarque importante :
            // user_id ne vient PAS du frontend.
            // Il vient du token JWT.
            const accountData = {
                name: validation.name,
                balance: validation.balance,
                user_id: userId,
                type:
                validation.type
            };


            // Enregistrement du compte dans MySQL.
            const accountId = await insertAccount(accountData);


            // ---------------------------------------------------------
            // 4. Récupération du compte créé
            // ---------------------------------------------------------

            // On récupère le compte qui vient réellement
            // d'être enregistré en base.
            const account = await findAccountById(accountId);


            // ---------------------------------------------------------
            // 5. Réponse au frontend
            // ---------------------------------------------------------

            // 201 Created indique qu'une nouvelle ressource
            // a été créée avec succès.
            return res.status(201).json({
                message: "Compte bancaire créé avec succès.",
                account
            });

        } catch (error) {

            // Toute erreur imprévue est transmise au
            // middleware global errorHandler.
            next(error);
        }
    }

    /**
     * Supprime un compte bancaire.
     *
     * Endpoint :
     * DELETE /api/accounts/:id
     *
     * Le compte doit appartenir à l'utilisateur connecté.
     */
    export async function deleteAccount(req, res, next) {

        try {

            // ---------------------------------------------------------
            // 1. Récupération de l'identifiant du compte
            // ---------------------------------------------------------

            const accountId = Number(req.params.id);

            if (!Number.isInteger(accountId) || accountId <= 0) {
                return res.status(400).json({
                    error: "INVALID_ACCOUNT_ID",
                    message: "L'identifiant du compte est invalide."
                });
            }

            // ---------------------------------------------------------
            // 2. Récupération de l'utilisateur connecté
            // ---------------------------------------------------------

            const userId = req.user.id;

            // ---------------------------------------------------------
            // 3. Suppression du compte
            // ---------------------------------------------------------

            const deletedRows =
                await deleteAccountByIdAndUserId(
                    accountId,
                    userId
                );

            // Aucun compte supprimé signifie :
            // - compte inexistant
            // - ou compte appartenant à un autre utilisateur
            if (deletedRows === 0) {
                return res.status(404).json({
                    error: "NOT_FOUND",
                    message: "Compte bancaire introuvable."
                });
            }

            // ---------------------------------------------------------
            // 4. Succès
            // ---------------------------------------------------------

            return res.status(200).json({
                message: "Compte bancaire supprimé avec succès."
            });

        } catch (error) {

            // ---------------------------------------------------------
            // 5. Compte possédant encore des transactions
            // ---------------------------------------------------------

            // MariaDB/MySQL peut refuser la suppression à cause
            // de la clé étrangère Transactions.account_id.
            if (error.code === "ER_ROW_IS_REFERENCED_2") {
                return res.status(409).json({
                    error: "ACCOUNT_HAS_TRANSACTIONS",
                    message:
                        "Impossible de supprimer ce compte car il possède des transactions."
                });
            }

            // ---------------------------------------------------------
            // 6. Erreur inattendue
            // ---------------------------------------------------------

            next(error);
        }
    }