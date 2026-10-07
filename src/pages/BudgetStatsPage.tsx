import AppLayout from "../layouts/AppLayout";

export default function BudgetStatsPage() {
    return (
        <AppLayout>
            <h1 className="mb-4">Stats & Budget</h1>

            {/* Cartes statistiques */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card p-3">
                        <h6>Revenus / an</h6>
                        <h2 className="text-success">54 600 €</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3">
                        <h6>Dépenses / an</h6>
                        <h2 className="text-danger">41 200 €</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3">
                        <h6>Épargne / an</h6>
                        <h2>13 400 €</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3">
                        <h6>Taux d'épargne</h6>
                        <h2>24%</h2>
                    </div>
                </div>
            </div>

            {/* Graphiques */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card p-4">
                        <h5>Répartition par catégorie</h5>

                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ height: "250px" }}
                        >
                            📊 Camembert
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card p-4">
                        <h5>Dépenses mensuelles</h5>

                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ height: "250px" }}
                        >
                            📈 Histogramme
                        </div>
                    </div>
                </div>
            </div>

            {/* Budget annuel */}
            <div className="card p-4">
                <h4 className="mb-4">Budget annuel</h4>

                <div className="mb-3">
                    <div className="d-flex justify-content-between">
                        <span>🏠 Logement</span>
                        <span>13 100 € / 16 000 €</span>
                    </div>

                    <div className="progress">
                        <div
                            className="progress-bar bg-success"
                            style={{ width: "82%" }}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <div className="d-flex justify-content-between">
                        <span>🛒 Courses</span>
                        <span>4 900 € / 7 200 €</span>
                    </div>

                    <div className="progress">
                        <div
                            className="progress-bar bg-success"
                            style={{ width: "68%" }}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <div className="d-flex justify-content-between">
                        <span>🚗 Transport</span>
                        <span>3 300 € / 3 600 €</span>
                    </div>

                    <div className="progress">
                        <div
                            className="progress-bar bg-warning"
                            style={{ width: "92%" }}
                        />
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="card p-3">
                            <h6>Total budgété</h6>
                            <h3>30 400 €</h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card p-3">
                            <h6>Total dépensé</h6>
                            <h3 className="text-danger">23 320 €</h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card p-3">
                            <h6>Reste disponible</h6>
                            <h3 className="text-success">7 080 €</h3>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}