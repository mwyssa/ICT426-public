import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        // TODO : remplacer par un vrai appel API plus tard
        navigate("/dashboard");
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
                    <div className="mb-3">
                        <label className="form-label">
                            Prénom
                        </label>

                        <input
                            type="text"
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Nom
                        </label>

                        <input
                            type="text"
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Mot de passe
                        </label>

                        <input
                            type="password"
                            className="form-control"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Confirmation du mot de passe
                        </label>

                        <input
                            type="password"
                            className="form-control"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-success w-100"
                    >
                        Créer mon compte
                    </button>
                </form>

                <hr />

                <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => navigate("/login")}
                >
                    Retour à la connexion
                </button>
            </div>
        </div>
    );
}