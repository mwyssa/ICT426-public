import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [apiError, setApiError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Un utilisateur déjà connecté n'a pas besoin de revoir la page de connexion.
    if (localStorage.getItem("token")) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        let isValid = true;

        setEmailError("");
        setPasswordError("");
        setApiError("");

        // Validation email
        if (!email.trim()) {
            setEmailError("Veuillez saisir votre adresse e-mail.");
            isValid = false;
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            setEmailError("Format d'e-mail invalide.");
            isValid = false;
        }

        // Validation mot de passe
        if (!password.trim()) {
            setPasswordError("Veuillez saisir votre mot de passe.");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        try {
            setIsLoading(true);

            const result = await login(
                email,
                password
            );

            // Sauvegarde du token JWT
            localStorage.setItem(
                "token",
                result.token
            );

            // Indicateur temporaire de connexion
            localStorage.setItem(
                "isAuthenticated",
                "true"
            );

            // Sauvegarde des infos utilisateur
            localStorage.setItem(
                "user",
                JSON.stringify(result.user)
            );

            navigate("/dashboard");

        } catch (error) {

            setApiError(
                error instanceof Error
                    ? error.message
                    : "Impossible de se connecter."
            );

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div
                className="card p-4 shadow"
                style={{ width: "400px" }}
            >
                <h2 className="text-center mb-4">
                    Connexion
                </h2>

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="email@example.ch"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        {emailError && (
                            <div className="text-danger mt-1">
                                {emailError}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Mot de passe
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="********"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        {passwordError && (
                            <div className="text-danger mt-1">
                                {passwordError}
                            </div>
                        )}
                    </div>

                    {apiError && (
                        <div className="alert alert-danger">
                            {apiError}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? "Connexion..."
                            : "Se connecter"}
                    </button>
                </form>

                <hr />

                <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => navigate("/register")}
                >
                    Créer un compte
                </button>
            </div>
        </div>
    );
}
