/**
 * Valide les données reçues lors de la création
 * d'un nouveau compte bancaire.
 *
 * Données attendues :
 *
 * {
 *     "name": "Compte principal",
 *     "balance": 1000,
 *     "type": "Compte Courant"
 * }
 *
 * user_id n'est volontairement pas reçu ici.
 * Il sera récupéré depuis le token JWT.
 *
 * @param {Object} data Données reçues dans req.body.
 * @returns {Object} Résultat de la validation.
 */
export function validateCreateAccount(data = {}) {

    // Objet qui contiendra toutes les erreurs détectées.
    const errors = {};


    // ---------------------------------------------------------
    // 1. Validation du nom du compte
    // ---------------------------------------------------------

    const name =
        typeof data.name === "string"
            ? data.name.trim()
            : "";

    // Le nom est obligatoire.
    if (!name) {
        errors.name = "Le nom du compte est obligatoire.";
    }

    // La colonne MySQL est VARCHAR(45).
    else if (name.length > 45) {
        errors.name =
            "Le nom du compte ne peut pas dépasser 45 caractères.";
    }


    // ---------------------------------------------------------
    // 2. Validation du solde
    // ---------------------------------------------------------

    let balance;

    // Si aucun solde n'est fourni,
    // le compte commence à 0.
    if (
        data.balance === undefined ||
        data.balance === null ||
        data.balance === ""
    ) {
        balance = 0;
    } else {

        // Les champs HTML peuvent envoyer les nombres
        // sous forme de chaînes de caractères.
        //
        // Exemple :
        // "1500" → 1500
        balance = Number(data.balance);

        // La colonne MySQL étant de type INT,
        // on accepte uniquement les nombres entiers.
        if (!Number.isInteger(balance)) {
            errors.balance =
                "Le solde doit être un nombre entier.";
        }
    }


    // ---------------------------------------------------------
    // 3. Validation du type de compte
    // ---------------------------------------------------------

    const type =
        typeof data.type === "string"
            ? data.type.trim()
            : "";

    // Le type est obligatoire.
    if (!type) {
        errors.type =
            "Le type de compte est obligatoire.";
    }

    // La colonne MySQL est VARCHAR(45).
    else if (type.length > 45) {
        errors.type =
            "Le type de compte ne peut pas dépasser 45 caractères.";
    }


    // ---------------------------------------------------------
    // 4. Résultat de la validation
    // ---------------------------------------------------------

    return {
        // La validation est correcte uniquement
        // si aucune erreur n'a été ajoutée.
        valid: Object.keys(errors).length === 0,

        // Liste des éventuelles erreurs.
        errors,

        // Données nettoyées.
        name,
        balance,
        type
    };
}