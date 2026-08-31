/**
 * Middleware global de gestion des erreurs.
 *
 * Express reconnaît un middleware d'erreur grâce
 * à ses quatre paramètres :
 *
 * err, req, res, next
 *
 * Même si _next n'est pas utilisé ici,
 * on garde le quatrième paramètre.
 */
export function errorHandler(err, req, res, _next) {

    // Affiche l'erreur complète uniquement dans le terminal
    // du serveur pour faciliter le développement et le diagnostic.
    console.error(err);

    // On ne retourne pas l'erreur technique complète au frontend.
    //
    // Cela évite notamment d'exposer :
    // - des informations MySQL
    // - des chemins de fichiers
    // - des informations internes du serveur
    return res.status(500).json({
        error: "INTERNAL_SERVER_ERROR",
        message: "Une erreur interne du serveur est survenue."
    });
}