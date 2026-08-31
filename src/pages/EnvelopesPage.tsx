import AppLayout from "../layouts/AppLayout";

export default function EnvelopesPage() {
    const sharedEnvelopes = [
        {
            icon: "🛒",
            name: "Courses",
            subtitle: "Alimentation · partagée",
            spent: "280 € dépensés",
            remaining: "120 € / 400 € restants",
            progress: 70,
        },
        {
            icon: "🎉",
            name: "Loisirs",
            subtitle: "Sorties · partagée",
            spent: "90 € dépensés",
            remaining: "110 € / 200 € restants",
            progress: 45,
        },
        {
            icon: "⛽",
            name: "Transport",
            subtitle: "Essence · partagée",
            spent: "132 € dépensés",
            remaining: "18 € / 150 € restants",
            progress: 88,
        },
    ];

    const childEnvelopes = [
        {
            icon: "🚲",
            name: "Vélo",
            subtitle: "Enfant A · objectif",
            amount: "140 € / 200 €",
            progress: 70,
        },
        {
            icon: "🍬",
            name: "Bonbons",
            subtitle: "Enfant A · dépenses",
            amount: "6 € / 20 €",
            progress: 30,
        },
        {
            icon: "🎮",
            name: "Jeu vidéo",
            subtitle: "Enfant B · objectif",
            amount: "30 € / 60 €",
            progress: 50,
        },
    ];

    return (
        <AppLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Enveloppes</h1>

                <span className="badge bg-dark rounded-pill px-3 py-2">
                    Vue Parent
                </span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Enveloppes partagées</h4>

                <button className="btn btn-outline-secondary">
                    + Nouvelle enveloppe
                </button>
            </div>

            <div className="row">
                {sharedEnvelopes.map((env, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5>
                                    {env.icon} {env.name}
                                </h5>

                                <small className="text-muted">
                                    {env.subtitle}
                                </small>

                                <div className="progress my-3">
                                    <div
                                        className="progress-bar bg-success"
                                        style={{ width: `${env.progress}%` }}
                                    />
                                </div>

                                <div className="d-flex justify-content-between mb-3">
                                    <small>{env.spent}</small>
                                    <strong>{env.remaining}</strong>
                                </div>

                                <button className="btn btn-success btn-sm me-2">
                                    Transférer
                                </button>

                                <button className="btn btn-outline-secondary btn-sm">
                                    Détail
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h4 className="mt-4 mb-3">Enveloppes des enfants</h4>

            <div className="row">
                {childEnvelopes.map((env, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5>
                                    {env.icon} {env.name}
                                </h5>

                                <small className="text-muted">
                                    {env.subtitle}
                                </small>

                                <div className="progress my-3">
                                    <div
                                        className="progress-bar bg-success"
                                        style={{ width: `${env.progress}%` }}
                                    />
                                </div>

                                <div className="d-flex justify-content-between mb-3">
                                    <small>Épargné</small>
                                    <strong>{env.amount}</strong>
                                </div>

                                <button className="btn btn-outline-secondary btn-sm me-2">
                                    Gérer
                                </button>

                                <button className="btn btn-outline-dark btn-sm">
                                    Bloquer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}