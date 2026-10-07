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

/**
 * Vérifie les données envoyées lors d'une tentative d'inscription.
 *
 * @param {Object} data Données reçues dans req.body.
 * @returns {Object} Résultat de la validation.
 */
export function validateRegister(data = {}) {   // on déclare et exporte la fonction validateRegister
    // le paramètre data correspond aux données envoyées par le client (c'est le req.body)
    // {} on donne une valeur par défaut pour sécuriser le passage de données erronée.
    const errors = {};  // on initialise un objet vide pour stocker les erreurs trouvées pendant la validation.

    // Vérifie que name est bien une chaîne de caractères.
    // trim() enlève les espaces inutiles au début et à la fin.
    const name =
        typeof data.name === "string"
            ? data.name.trim()
            : "";

    // Nettoyage et vérification de l'email
    const email = typeof data.email === "string"? data.email.trim().toLowerCase(): "";
    // typeof data.email === "string" => On vérifie que ce qui a été envoyé est un un string pour éviter les bugs si l'user envoie un nombre ou autre erreur.
    // ? => c'est un opérateur ternaire. Si c'est une chaîne, on exécute l'action, sinon on attribue le string vide "" par défaut à la variable email.
    // trim().toLowerCase() => Si c'est du texte, trim() supprime les espaces superflus au début et à la fin du text.
    // toLowerCase() => mets tout en minuscule pour s'assurer qu'un email soit uniformisé.

    const password = typeof data.password === "string"? data.password: "";
    // on s'assure de la même manière que le password reçu est du texte.
    // on ne fait pas de trim ni lowercase sur les mots de passes car tout fait partie du mot de passe.
    // Si le test échoue, on renvoie "".

    // ---------------------------------------------------------
    // Validation du nom
    // ---------------------------------------------------------
    if (!name) {
        errors.name = "Le nom est obligatoire.";
    }

    // La colonne name de MySQL est VARCHAR(45).
    // On évite donc d'envoyer une valeur trop longue.
    else if (name.length > 45) {
        errors.name =
            "Le nom ne peut pas dépasser 45 caractères.";
    }

    //1. on vérifie les champs obligtoires et 2. on valide le format de l'email
    // en gros on s'assure que le mail est pas vide et on vérifie que son format respecte la structure standard d'un email.
    if (!email) {   // si la variable email est vide
        errrors.email = "L'email est obligatoire.";  //on ajoute une propriété  email à notre objet errors avec un message.
    } else {    // si y'a qqc dans email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    // on définit une expression régulière (Regex) qui est un modèle de recherche textuelle qui permets de valider la structure d'une adresse email.
        // ^ $ indiquent le début et la fin de la chaîne.
        // [^\s@]+ c'est le nom de l'utilisateur (début du mail) qui doit contenir plusieurs caractères qui sont ni un espace \s ni un arobase.
        // @ c'est l'arobase de séparation
        // [^\s@]+ le nom de domaine (genre gmail)
        // \. c'est que l'adresse doit contenir un point
        // [^\s@]+ c'est pour le .com ou .ch, etc.
        if (!emailRegex.test(email)) {  // .test() vérifie si la variable email correspond au modèle Regex. Si ça échoue, on entre dans le bloc.
            errors.email = "Le format de l'email est invalide.";
        }
    }
    //3. Vérifier les règles du mot de passe
    // en gros on gère la validation du mot de passe en s'assurant qu'il est présent et respecte les règles de sécurité définies.
    if (!password) {    // password et vide?
        errors.password = "Le passe est obligatoire.";
    } else {    // si le mot de passe est pas vide
        if (password.length < 8) {
            errors.password = "Le mot de passe doit contenir au moins 8 caractères.";
        } else if (!/\d/.test(password)) {  // on férifie la présence d'au moins 1 chiffres grâce à Regex.
            // \d signifie chiffre de 0 à 9
            // ! ça signifie que si le test échoue (si y'a aucun chiffre)
            errors.password = "Le mot de passe doit contenir au moins un chiffre.";
        } else if (!/[A-Z]/.test(password)) {   // on vérifie la présence d'au moins une lettre majuscule
            errors.password = "Le mot de passe doit contenir au moins une majuscule.";
        }
    }
    //4. Retourner le résultat qui permettra de renvoyer les erreurs au Frontend
    return {
        valid: Object.keys(errors).length === 0,
        // Object.keys(errors) récupère toutes les clés (les noms de champs en erreur du style email ou password) de l'objet errors et les place dans un tableau
        // .length === 0 vérifie que le tableau est vide donc valid vaudra true si y'a aucune erreur
        errors, //on renvoie le message d'erreur
        name,
        email, //on renvoie l'email nettoyé (sans espaces et en minuscules)
        password // (on renvoie le password comme tel prête à être hashé)
    };
}