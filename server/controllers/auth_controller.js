// bcrypt permet de comparer le mot de passe reçu
// avec le hash bcrypt enregistré dans MySQL.
import bcrypt from "bcrypt";

// jsonwebtoken permet de créer un token JWT
// après une authentification réussie.
import jwt from "jsonwebtoken";

// Fonction permettant de rechercher un utilisateur dans MySQL.
import { findUserByEmail } from "../models/user_model.js";

// Fonction permettant de valider email + mot de passe.
import { validateLogin } from "../validators/auth_validator.js";


/**
 * Gère la connexion d'un utilisateur.
 *
 * Endpoint :
 * POST /api/auth/login
 */
export async function login(req, res, next) {

    try {

        // ---------------------------------------------------------
        // 1. Validation des données reçues
        // ---------------------------------------------------------

        // req.body contient les données JSON envoyées par le frontend.
        //
        // Exemple :
        // {
        //     "email": "test@test.ch",
        //     "password": "123456"
        // }
        const validation = validateLogin(req.body);

        // Si les données sont invalides,
        // on arrête immédiatement la connexion.
        if (!validation.valid) {
            return res.status(400).json({
                error: "VALIDATION_ERROR",
                message: "Les données envoyées sont invalides.",
                details: validation.errors
            });
        }

        // Récupération des données déjà vérifiées par le validator.
        const { email, password } = validation;


        // ---------------------------------------------------------
        // 2. Recherche de l'utilisateur
        // ---------------------------------------------------------

        // Recherche l'utilisateur correspondant à l'adresse email.
        const user = await findUserByEmail(email);

        // Si aucun utilisateur n'a été trouvé,
        // on refuse la connexion.
        if (!user) {
            return res.status(401).json({
                error: "INVALID_CREDENTIALS",
                message: "Email ou mot de passe incorrect."
            });
        }


        // ---------------------------------------------------------
        // 3. Vérification du mot de passe
        // ---------------------------------------------------------

        // bcrypt.compare() compare :
        //
        // - le mot de passe en clair reçu du frontend
        // - le hash enregistré dans la base de données
        //
        // bcrypt retourne true si le mot de passe correspond.
        const passwordValid = await bcrypt.compare(
            password,
            user.hash
        );

        // Si le mot de passe ne correspond pas au hash,
        // on refuse la connexion.
        if (!passwordValid) {
            return res.status(401).json({
                error: "INVALID_CREDENTIALS",
                message: "Email ou mot de passe incorrect."
            });
        }


        // ---------------------------------------------------------
        // 4. Création du token JWT
        // ---------------------------------------------------------

        // Le token contient uniquement les informations
        // nécessaires pour identifier l'utilisateur.
        //
        // On ne met jamais le mot de passe ou son hash dans le JWT.
        const token = jwt.sign(
            {
                // "sub" correspond au sujet du token.
                // On l'utilise ici pour enregistrer l'id utilisateur.
                sub: String(user.id),

                // Le rôle pourra être utilisé plus tard
                // pour différencier un utilisateur d'un administrateur.
                role: user.role
            },

            // Clé secrète utilisée pour signer le token.
            process.env.JWT_SECRET,

            {
                // Durée de validité du token.
                expiresIn: process.env.JWT_EXPIRES_IN || "1h",

                // Algorithme utilisé pour signer le JWT.
                algorithm: "HS256"
            }
        );


        // ---------------------------------------------------------
        // 5. Connexion réussie
        // ---------------------------------------------------------

        // Retour du token ainsi que des informations utiles
        // de l'utilisateur au frontend.
        //
        // Le hash bcrypt n'est jamais retourné.
        return res.status(200).json({
            message: "Connexion réussie.",

            token,
            tokenType: "Bearer",
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",

            user: {
                id: user.id,
                name: user.name,
                mail: user.mail,
                role: user.role,
                family_id: user.family_id
            }
        });

    } catch (error) {

        // En cas d'erreur imprévue (MySQL, JWT, etc.),
        // on transmet l'erreur au middleware errorHandler.
        next(error);
    }
}

/**
 * Gère l'inscription d'un nouvel utilisateur.
 *
 * Endpoint :
 * POST /api/auth/register
 */
// en dessous c'est l'en-tête de la fonction
export async function register(req, res, next) {    //on exporte une fonction asynchrone qui prends les 3 objets d'Express: req (la requête reçue du client), res (la réponse qu'on va renvoyer), next pour passer leserreurs au gestionnaire.

    try {   // on utilise try pour attraper et gérer les erreurs imprévues qui pourraient survenir pdt l'exécution du code

        // ---------------------------------------------------------
        // 1. Validation des données reçues
        // ---------------------------------------------------------
        const validation = validateRegister(req.body);  // on fait appel au validateur qu'on a écrit avant.
        // si les données ne respectent pas les règles, on stop et on renvoie un 400 Bad Request

        if (!validation.valid) {
            return res.status(400).json({
                error: "VALIDATION_ERROR",
                message: "Les données envoyées sont invalides.",
                details: validation.errors
            });
        }

        const { email, password } = validation;


        // ---------------------------------------------------------
        // 2. Vérification de l'unicité de l'email (l'email existe déjà?)
        // ---------------------------------------------------------
        const existingUser = await findUserByEmail(email);  // await c'est pour attendre la réponse

        if (existingUser) {
            return res.status(409).json({
                error: "EMAIL_ALREADY_EXISTS",
                message: "Cet email est déjà utilisé."
            });
        }


        // ---------------------------------------------------------
        // 3. Hachage du mot de passe (pour la sécurité)
        // ---------------------------------------------------------
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // on utilise bcrypt pour transformer le password en hash cryptographique sécurisé et irréversivke.
        // saltRounds = 10 définit le coût de calcul pour le rendre dur à hacker.


        // ---------------------------------------------------------
        // 4. Enregistrement en base de données (pour la persistance)
        // ---------------------------------------------------------
        const newUserId = await createUser(email, hashedPassword);  // on appelle la fonction du modèle pour insérer le new user dans la table MySQL (y'aura le mot de passe hashl dedans).
        // on récupère ensuite l'ID unique qui vient d0être généré.


        // ---------------------------------------------------------
        // 5. Inscription réussie
        // ---------------------------------------------------------
        return res.status(201).json({
            message: "Compte créé avec succès.",
            user: {
                id: newUserId,
                mail: email
            }
        });

    } catch (error) {   // pour rattraper les erreurs hihi

        // En cas d'erreur imprévue (MySQL, etc.),
        // on transmet l'erreur au middleware errorHandler.
        next(error);
    }
}