import AppLayout from "../layouts/AppLayout";

export default function AccountsPage() {
    return (
        <AppLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1>Comptes</h1>
                    <h4 className="mt-4">Vue globale des comptes</h4>
                </div>

                <button className="btn btn-success">
                    ↔ Transfert rapide
                </button>
            </div>

            {/* Comptes courants */}
            <div className="card mb-4">
                <div className="card-body">
                    <small className="text-uppercase text-muted">
                        Comptes courants · Parents
                    </small>

                    <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
                        <div className="d-flex align-items-center">
                            <div className="fs-2 me-3">🏦</div>

                            <div>
                                <h5 className="mb-0">
                                    Compte courant · Papa
                                </h5>

                                <small className="text-muted">
                                    •••• 4021
                                </small>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                            <h5 className="mb-0">2 180 €</h5>

                            <button className="btn btn-outline-secondary">
                                →
                            </button>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
                        <div className="d-flex align-items-center">
                            <div className="fs-2 me-3">🏦</div>

                            <div>
                                <h5 className="mb-0">
                                    Compte courant · Maman
                                </h5>

                                <small className="text-muted">
                                    •••• 7788
                                </small>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                            <h5 className="mb-0">1 640 €</h5>

                            <button className="btn btn-outline-secondary">
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Epargne */}
            <div className="card mb-4">
                <div className="card-body">
                    <small className="text-uppercase text-muted">
                        Épargne · Projets / Maison
                    </small>

                    <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
                        <div className="d-flex align-items-center">
                            <div className="fs-2 me-3">✈️</div>

                            <div>
                                <h5 className="mb-0">
                                    Projet Vacances
                                </h5>

                                <small className="text-muted">
                                    Objectif 3 000 €
                                </small>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                            <h5 className="mb-0">1 900 €</h5>

                            <button className="btn btn-outline-secondary">
                                →
                            </button>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
                        <div className="d-flex align-items-center">
                            <div className="fs-2 me-3">🏠</div>

                            <div>
                                <h5 className="mb-0">
                                    Épargne Maison
                                </h5>

                                <small className="text-muted">
                                    Livret
                                </small>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                            <h5 className="mb-0">2 250 €</h5>

                            <button className="btn btn-outline-secondary">
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comptes enfants */}
            <div className="card">
                <div className="card-body">
                    <small className="text-uppercase text-muted">
                        Comptes dédiés · Enfants
                    </small>

                    <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
                        <div className="d-flex align-items-center">
                            <div className="fs-2 me-3">🐷</div>

                            <div>
                                <h5 className="mb-0">
                                    Argent de poche · Enfant A
                                </h5>

                                <small className="text-muted">
                                    •••• 1102
                                </small>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                            <h5 className="mb-0">45 €</h5>

                            <button className="btn btn-outline-secondary">
                                →
                            </button>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
                        <div className="d-flex align-items-center">
                            <div className="fs-2 me-3">🐷</div>

                            <div>
                                <h5 className="mb-0">
                                    Argent de poche · Enfant B
                                </h5>

                                <small className="text-muted">
                                    •••• 1103
                                </small>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                            <h5 className="mb-0">28 €</h5>

                            <button className="btn btn-outline-secondary">
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}