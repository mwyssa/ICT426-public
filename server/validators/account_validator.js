/**
 * Valide les données reçues lors de la création
 * d'un nouveau compte bancaire.
 *
 * Données attendues :
 *
 * {
 *     "name": "Compte courant",
 *     "balance": 1000,
 *     "type_of_account_id": 1
 * }
 *
 * user_id est récupéré depuis le token JWT.
 *
 * @param {Object} data Données reçues dans req.body.
 * @returns {Object} Résultat de la validation.
 */
export function validateCreateAccount(data = {}) {

    // Contiendra toutes les erreurs trouvées.
    const errors = {};


    // ---------------------------------------------------------
    // 1. Validation du nom
    // ---------------------------------------------------------

    // Vérifie que le nom est bien une chaîne de caractères.
    // trim() supprime les espaces inutiles avant et après.
    const name =
        typeof data.name === "string"
            ? data.name.trim()
            : "";

    // Le nom est obligatoire.
    if (!name) {
        errors.name = "Le nom du compte est obligatoire.";
    }

        // La colonne MySQL est VARCHAR(45),
    // donc on refuse les noms trop longs.
    else if (name.length > 45) {
        errors.name =
            "Le nom du compte ne peut pas dépasser 45 caractères.";
    }


    // ---------------------------------------------------------
    // 2. Validation du solde
    // ---------------------------------------------------------

    let balance;

    // Si aucun solde n'est envoyé,
    // on considère que le nouveau compte commence à 0.
    if (
        data.balance === undefined ||
        data.balance === null ||
        data.balance === ""
    ) {
        balance = 0;
    } else {

        // Les champs HTML renvoient souvent des chaînes,
        // même lorsqu'ils représentent des nombres.
        //
        // Par exemple :
        // "1500"
        //
        // devient :
        // 1500
        balance = Number(data.balance);

        // La colonne MySQL est de type INT.
        // On vérifie donc qu'il s'agit bien d'un entier.
        if (!Number.isInteger(balance)) {
            errors.balance =
                "Le solde doit être un nombre entier.";
        }
    }


    // ---------------------------------------------------------
    // 3. Validation du type de compte
    // ---------------------------------------------------------

    let typeOfAccountId = null;

    // Le type de compte est obligatoire.
    if (
        data.type_of_account_id === undefined ||
        data.type_of_account_id === null ||
        data.type_of_account_id === ""
    ) {
        errors.type_of_account_id =
            "Le type de compte est obligatoire.";
    } else {

        typeOfAccountId = Number(data.type_of_account_id);

        // L'id doit être un entier positif.
        if (
            !Number.isInteger(typeOfAccountId) ||
            typeOfAccountId <= 0
        ) {
            errors.type_of_account_id =
                "Le type de compte est invalide.";
        }
    }


    // ---------------------------------------------------------
    // 4. Résultat
    // ---------------------------------------------------------

    return {
        // true uniquement si aucune erreur n'a été ajoutée.
        valid: Object.keys(errors).length === 0,

        // Liste des éventuelles erreurs.
        errors,

        // Données nettoyées et converties.
        name,
        balance,
        type_of_account_id: typeOfAccountId
    };
}