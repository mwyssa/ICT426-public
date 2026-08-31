import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // TODO : remplacer par un vrai appel API plus tard
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
                            placeholder="email@exemple.ch"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Mot de passe
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="********"
                        />
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