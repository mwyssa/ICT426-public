import AppLayout from "../layouts/AppLayout";

export default function SettingsPage() {
    return (
        <AppLayout>
            <h1 className="mb-4">Paramètres</h1>

            <div className="row">
                <div className="col-lg-6 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="mb-4">Profil</h5>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h6>Profil Parent</h6>
                                    <small>
                                        papa@famille.fr
                                    </small>
                                </div>

                                <button className="btn btn-outline-secondary">
                                    Modifier
                                </button>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h6>Changer le mot de passe</h6>
                                    <small>
                                        Sécurité du compte
                                    </small>
                                </div>

                                <button className="btn btn-outline-secondary">
                                    Changer
                                </button>
                            </div>

                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                />

                                <label className="form-check-label">
                                    Double authentification
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="mb-4">Préférences</h5>

                            <div className="form-check form-switch mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultChecked
                                />
                                <label className="form-check-label">
                                    Notifications
                                </label>
                            </div>

                            <div className="form-check form-switch mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultChecked
                                />
                                <label className="form-check-label">
                                    Alertes de dépassement
                                </label>
                            </div>

                            <div className="form-check form-switch mb-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                />
                                <label className="form-check-label">
                                    Mode sombre
                                </label>
                            </div>

                            <button className="btn btn-outline-secondary">
                                Changer la devise
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="mb-4">
                        Administration du foyer
                    </h5>

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            Membres & rôles
                        </li>

                        <li className="list-group-item">
                            Catégories & enveloppes
                        </li>

                        <li className="list-group-item">
                            Import de données (CSV)
                        </li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}