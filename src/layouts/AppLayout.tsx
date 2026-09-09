import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {
    children: ReactNode;
};

export default function AppLayout({ children }: Props) {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Suppression des informations de connexion enregistrées localement.
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");

        // Retour vers la page de connexion.
        navigate("/login");
    };

    return (
        <div className="d-flex vh-100">
            <aside
                className="bg-dark text-white p-3 d-flex flex-column"
                style={{ width: "250px" }}
            >
                <h3 className="mb-4">Budget Famille</h3>

                <nav className="nav flex-column flex-grow-1">
                    <Link className="nav-link text-white" to="/dashboard">
                        Dashboard
                    </Link>

                    <Link className="nav-link text-white" to="/accounts">
                        Comptes
                    </Link>

                    <Link className="nav-link text-white" to="/transactions">
                        Transactions
                    </Link>

                    <Link className="nav-link text-white" to="/envelopes">
                        Enveloppes
                    </Link>

                    <Link className="nav-link text-white" to="/budget-stats">
                        Budget & Statistiques
                    </Link>

                    <Link className="nav-link text-white" to="/family">
                        Famille
                    </Link>

                    <Link className="nav-link text-white" to="/settings">
                        Paramètres
                    </Link>

                    <Link
                        className="nav-link text-white mt-auto"
                        to="/login"
                        onClick={(event) => {
                            event.preventDefault();
                            setShowLogoutModal(true);
                        }}
                    >
                        Déconnexion
                    </Link>
                </nav>
            </aside>

            <main className="flex-grow-1 p-4 bg-light">
                {children}
            </main>

            {showLogoutModal && (
                <>
                    <div className="modal-backdrop show" />

                    <div className="modal d-block" tabIndex={-1}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Se déconnecter</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Fermer"
                                        onClick={() => setShowLogoutModal(false)}
                                    />
                                </div>

                                <div className="modal-body">
                                    Voulez-vous vraiment vous déconnecter ?
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowLogoutModal(false)}
                                    >
                                        Annuler
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={handleLogout}
                                    >
                                        Se déconnecter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
