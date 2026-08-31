import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center vh-100"
        >
            <h1 className="display-1 fw-bold">404</h1>

            <h2 className="mb-3">Page introuvable</h2>

            <p className="text-muted mb-4">
                La page que vous recherchez n'existe pas.
            </p>

            <Link to="/dashboard" className="btn btn-primary">
                Retour au tableau de bord
            </Link>
        </div>
    );
}