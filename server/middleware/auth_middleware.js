// Bibliothèque utilisée pour vérifier les tokens JWT.
import jwt from "jsonwebtoken";


/**
 * Middleware permettant de vérifier qu'une requête
 * possède un token JWT valide.
 */
export function authenticateToken(req, res, next) {

    // Récupération du header Authorization.
    //
    // Le frontend doit envoyer :
    //
    // Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
    const authorization = req.headers.authorization;


    // ---------------------------------------------------------
    // 1. Vérification de la présence du token
    // ---------------------------------------------------------

    if (!authorization) {
        return res.status(401).json({
            error: "AUTH_REQUIRED",
            message: "Authentification requise."
        });
    }


    // ---------------------------------------------------------
    // 2. Vérification du format Bearer
    // ---------------------------------------------------------

    // Le header doit commencer par :
    //
    // Bearer
    //
    // suivi du token.
    if (!authorization.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "INVALID_TOKEN",
            message: "Format du token invalide."
        });
    }


    // ---------------------------------------------------------
    // 3. Extraction du token
    // ---------------------------------------------------------

    // Exemple :
    //
    // "Bearer abc123"
    //
    // devient :
    //
    // ["Bearer", "abc123"]
    //
    // On récupère donc la deuxième partie.
    const token = authorization.split(" ")[1];


    try {

        // ---------------------------------------------------------
        // 4. Vérification du JWT
        // ---------------------------------------------------------

        // jwt.verify() vérifie :
        //
        // - la signature
        // - la clé JWT_SECRET
        // - la date d'expiration
        // - l'algorithme utilisé
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET,
            {
                algorithms: ["HS256"]
            }
        );


        // ---------------------------------------------------------
        // 5. Ajout de l'utilisateur à la requête
        // ---------------------------------------------------------

        // Les informations présentes dans le JWT sont ajoutées
        // dans req.user.
        //
        // Les routes suivantes pourront ensuite utiliser :
        //
        // req.user.id
        // req.user.role
        req.user = {
            id: Number(payload.sub),
            role: payload.role
        };


        // Le token est valide.
        // On autorise Express à continuer vers la route suivante.
        next();

    } catch (error) {

        // ---------------------------------------------------------
        // 6. Token expiré
        // ---------------------------------------------------------

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                error: "TOKEN_EXPIRED",
                message: "Le token a expiré."
            });
        }


        // ---------------------------------------------------------
        // 7. Token incorrect
        // ---------------------------------------------------------

        // Cette partie est utilisée notamment si :
        //
        // - le token a été modifié
        // - la signature est incorrecte
        // - le token n'est pas un JWT valide
        return res.status(401).json({
            error: "INVALID_TOKEN",
            message: "Token invalide."
        });
    }
}