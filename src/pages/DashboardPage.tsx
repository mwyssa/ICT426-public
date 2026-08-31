import AppLayout from "../layouts/AppLayout";

export default function DashboardPage() {
    return (
        <AppLayout>
            <h1>Dashboard</h1>

            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5>Solde total</h5>
                            <h2>12'450 CHF</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5>Dépenses du mois</h5>
                            <h2>2'150 CHF</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5>Épargne</h5>
                            <h2>4'500 CHF</h2>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}