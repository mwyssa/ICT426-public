import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";

export default function RegisterPage() {
    const navigate = useNavigate();

    // -----------------------------------------------------
    // États du formulaire
    // -----------------------------------------------------

    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    // -----------------------------------------------------
    // États des erreurs
    // -----------------------------------------------------

    const [firstNameError, setFirstNameError] =
        useState("");

    const [emailError, setEmailError] =
        useState("");

    const [passwordError, setPasswordError] =
        useState("");

    const [confirmPasswordError, setConfirmPasswordError] =
        useState("");

    const [apiError, setApiError] = useState("");
    const [successMessage, setSuccessMessage] =
        useState("");

    const [isLoading, setIsLoading] =
        useState(false);

    // -----------------------------------------------------
    // Soumission du formulaire
    // -----------------------------------------------------

    const handleRegister = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        // Réinitialisation des erreurs
        setFirstNameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setApiError("");
        setSuccessMessage("");

        let isValid = true;

        const trimmedFirstName =
            firstName.trim();

        const trimmedEmail =
            email.trim().toLowerCase();

        // -------------------------------------------------
        // Prénom
        // -------------------------------------------------

        if (!trimmedFirstName) {
            setFirstNameError(
                "Veuillez saisir votre prénom."
            );

            isValid = false;
        } else if (trimmedFirstName.length > 45) {
            setFirstNameError(
                "Le prénom ne peut pas dépasser 45 caractères."
            );

            isValid = false;
        }

        // -------------------------------------------------
        // Email
        // -------------------------------------------------

        if (!trimmedEmail) {
            setEmailError(
                "Veuillez saisir votre adresse e-mail."
            );

            isValid = false;
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                trimmedEmail
            )
        ) {
            setEmailError(
                "Format d'e-mail invalide."
            );

            isValid = false;
        }

        // -------------------------------------------------
        // Mot de passe
        //
        // Règles du backend :
        // - minimum 8 caractères
        // - au moins un chiffre
        // - au moins une majuscule
        // -------------------------------------------------

        if (!password) {
            setPasswordError(
                "Le mot de passe est obligatoire."
            );

            isValid = false;
        } else if (password.length < 8) {
            setPasswordError(
                "Le mot de passe doit contenir au moins 8 caractères."
            );

            isValid = false;
        } else if (!/\d/.test(password)) {
            setPasswordError(
                "Le mot de passe doit contenir au moins un chiffre."
            );

            isValid = false;
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError(
                "Le mot de passe doit contenir au moins une majuscule."
            );

            isValid = false;
        }

        // -------------------------------------------------
        // Confirmation du mot de passe
        // -------------------------------------------------

        if (!confirmPassword) {
            setConfirmPasswordError(
                "Veuillez confirmer votre mot de passe."
            );

            isValid = false;
        } else if (
            password !== confirmPassword
        ) {
            setConfirmPasswordError(
                "Les mots de passe ne correspondent pas."
            );

            isValid = false;
        }

        // Arrêt si le formulaire n'est pas valide
        if (!isValid) {
            return;
        }

        // -------------------------------------------------
        // Appel API
        // -------------------------------------------------

        try {
            setIsLoading(true);

            await register({
                name: trimmedFirstName,
                email: trimmedEmail,
                password,
            });

            setSuccessMessage(
                "Compte créé avec succès. Vous allez être redirigé vers la connexion."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            setApiError(
                error instanceof Error
                    ? error.message
                    : "Impossible de créer le compte."
            );

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">

            <div
                className="card p-4 shadow"
                style={{ width: "500px" }}
            >

                <h2 className="text-center mb-4">
                    Création de compte
                </h2>

                <form onSubmit={handleRegister}>

                    {/* -----------------------------------------
                        PRÉNOM
                    ------------------------------------------ */}

                    <div className="mb-3">

                        <label
                            className="form-label"
                            htmlFor="firstName"
                        >
                            Prénom
                        </label>

                        <input
                            id="firstName"
                            type="text"
                            className={`form-control ${
                                firstNameError
                                    ? "is-invalid"
                                    : ""
                            }`}
                            placeholder="Ex. Patrick"
                            value={firstName}
                            onChange={(e) =>
                                setFirstName(
                                    e.target.value
                                )
                            }
                            disabled={isLoading}
                            maxLength={45}
                        />

                        {firstNameError && (
                            <div className="invalid-feedback">
                                {firstNameError}
                            </div>
                        )}

                    </div>

                    {/* -----------------------------------------
                        EMAIL
                    ------------------------------------------ */}

                    <div className="mb-3">

                        <label
                            className="form-label"
                            htmlFor="email"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            className={`form-control ${
                                emailError
                                    ? "is-invalid"
                                    : ""
                            }`}
                            placeholder="exemple@eduvaud.ch"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            disabled={isLoading}
                        />

                        {emailError && (
                            <div className="invalid-feedback">
                                {emailError}
                            </div>
                        )}

                    </div>

                    {/* -----------------------------------------
                        MOT DE PASSE
                    ------------------------------------------ */}

                    <div className="mb-3">

                        <label
                            className="form-label"
                            htmlFor="password"
                        >
                            Mot de passe
                        </label>

                        <input
                            id="password"
                            type="password"
                            className={`form-control ${
                                passwordError
                                    ? "is-invalid"
                                    : ""
                            }`}
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            disabled={isLoading}
                        />

                        {passwordError && (
                            <div className="invalid-feedback">
                                {passwordError}
                            </div>
                        )}

                        <div className="form-text">
                            Minimum 8 caractères,
                            1 chiffre et 1 majuscule.
                        </div>

                    </div>

                    {/* -----------------------------------------
                        CONFIRMATION DU MOT DE PASSE
                    ------------------------------------------ */}

                    <div className="mb-4">

                        <label
                            className="form-label"
                            htmlFor="confirmPassword"
                        >
                            Confirmation du mot de passe
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            className={`form-control ${
                                confirmPasswordError
                                    ? "is-invalid"
                                    : ""
                            }`}
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            disabled={isLoading}
                        />

                        {confirmPasswordError && (
                            <div className="invalid-feedback">
                                {confirmPasswordError}
                            </div>
                        )}

                    </div>

                    {/* -----------------------------------------
                        ERREUR API
                    ------------------------------------------ */}

                    {apiError && (
                        <div className="alert alert-danger">
                            {apiError}
                        </div>
                    )}

                    {/* -----------------------------------------
                        SUCCÈS
                    ------------------------------------------ */}

                    {successMessage && (
                        <div className="alert alert-success">
                            {successMessage}
                        </div>
                    )}

                    {/* -----------------------------------------
                        BOUTON
                    ------------------------------------------ */}

                    <button
                        type="submit"
                        className="btn btn-success w-100"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? "Création..."
                            : "Créer mon compte"}
                    </button>

                </form>

                <hr />

                <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={() =>
                        navigate("/login")
                    }
                    disabled={isLoading}
                >
                    Retour à la connexion
                </button>

            </div>

        </div>
    );
}