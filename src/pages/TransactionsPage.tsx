import AppLayout from "../layouts/AppLayout";

export default function TransactionsPage() {
    const transactions = [
        {
            date: "25/08",
            description: "🛒 Courses Super U",
            membre: "Papa",
            enveloppe: "Courses",
            compte: "CC Papa",
            montant: "- 84 €",
            positif: false,
        },
        {
            date: "24/08",
            description: "💼 Salaire",
            membre: "Maman",
            enveloppe: "—",
            compte: "CC Maman",
            montant: "+ 2 300 €",
            positif: true,
        },
        {
            date: "23/08",
            description: "⛽ Essence",
            membre: "Papa",
            enveloppe: "Transport",
            compte: "CC Papa",
            montant: "- 62 €",
            positif: false,
        },
        {
            date: "24/08",
            description: "🎬 Cinéma",
            membre: "Enfant A",
            enveloppe: "Argent de poche",
            compte: "Enfant A",
            montant: "- 12 €",
            positif: false,
        },
        {
            date: "22/08",
            description: "🐷 Vers objectif Vélo",
            membre: "Enfant A",
            enveloppe: "Vélo",
            compte: "Enfant A",
            montant: "+ 15 €",
            positif: true,
        },
        {
            date: "20/08",
            description: "🍬 Bonbons",
            membre: "Enfant A",
            enveloppe: "Bonbons",
            compte: "Enfant A",
            montant: "- 3 €",
            positif: false,
        },
    ];

    return (
        <AppLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold">Transactions</h1>

                <span className="badge bg-dark rounded-pill px-3 py-2">
                    Vue Parent
                </span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold">Transactions de la famille</h4>

                <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary">
                        ⇪ Importer CSV
                    </button>

                    <button className="btn btn-success">
                        + Ajouter
                    </button>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex flex-wrap gap-2">
                    <button className="btn btn-outline-success rounded-pill">
                        Tout
                    </button>

                    <button className="btn btn-outline-secondary rounded-pill">
                        Dépenses
                    </button>

                    <button className="btn btn-outline-secondary rounded-pill">
                        Revenus
                    </button>

                    <button className="btn btn-outline-secondary rounded-pill">
                        Papa
                    </button>

                    <button className="btn btn-outline-secondary rounded-pill">
                        Maman
                    </button>

                    <button className="btn btn-outline-secondary rounded-pill">
                        Enfant A
                    </button>
                </div>

                <select
                    className="form-select"
                    style={{ width: "150px" }}
                >
                    <option>Ce mois-ci</option>
                </select>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead>
                        <tr>
                            <th>DATE</th>
                            <th>DESCRIPTION</th>
                            <th>MEMBRE</th>
                            <th>ENVELOPPE</th>
                            <th>COMPTE</th>
                            <th className="text-end">MONTANT</th>
                        </tr>
                        </thead>

                        <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.date}</td>

                                <td>{transaction.description}</td>

                                <td>{transaction.membre}</td>

                                <td>{transaction.enveloppe}</td>

                                <td>{transaction.compte}</td>

                                <td
                                    className={`text-end fw-bold ${
                                        transaction.positif
                                            ? "text-success"
                                            : ""
                                    }`}
                                >
                                    {transaction.montant}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}