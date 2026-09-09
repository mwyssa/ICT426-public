// Validator permettant de vérifier les données reçues.
import {
    validateCreateAccount
} from "../validators/account_validator.js";

// Fonctions permettant d'accéder à MySQL.
import {
    insertAccount,
    findAccountById
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
            type_of_account_id:
            validation.type_of_account_id
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