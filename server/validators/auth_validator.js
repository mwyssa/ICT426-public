/**
 * Vérifie les données envoyées lors d'une tentative de connexion.
 *
 * @param {Object} data Données reçues dans req.body.
 * @returns {Object} Résultat de la validation.
 */
export function validateLogin(data = {}) {

    // Objet qui contiendra les éventuelles erreurs.
    const errors = {};

    // Vérifie que l'email est bien une chaîne de caractères.
    //
    // trim() retire les espaces au début et à la fin.
    // toLowerCase() permet de travailler avec l'email en minuscules.
    const email =
        typeof data.email === "string"
            ? data.email.trim().toLowerCase()
            : "";

    // Vérifie que le mot de passe reçu est bien une chaîne.
    //
    // On ne fait pas trim() sur le mot de passe,
    // car les espaces peuvent faire partie d'un mot de passe valide.
    const password =
        typeof data.password === "string"
            ? data.password
            : "";

    // Vérification : email obligatoire.
    if (!email) {
        errors.email = "L'email est obligatoire.";
    } else {

        // Expression régulière permettant de vérifier
        // le format général d'une adresse email.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Vérification du format de l'email.
        if (!emailRegex.test(email)) {
            errors.email = "Le format de l'email est invalide.";
        }
    }

    // Vérification : mot de passe obligatoire.
    if (!password) {
        errors.password = "Le mot de passe est obligatoire.";
    }

    // Retourne :
    // - valid : true si aucune erreur
    // - errors : liste des erreurs
    // - email : email nettoyé
    // - password : mot de passe reçu
    return {
        valid: Object.keys(errors).length === 0,
        errors,
        email,
        password
    };
}