import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        let isValid = true;

        setEmailError("");
        setPasswordError("");

        if (!email.trim()) {
            setEmailError("Veuillez saisir votre adresse e-mail.");
            isValid = false;
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            setEmailError("Format d'e-mail invalide.");
            isValid = false;
        }

        if (!password.trim()) {
            setPasswordError("Veuillez saisir votre mot de passe.");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        // TODO : appel API plus tard
        navigate("/dashboard");
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

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Se connecter
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