import AppLayout from "../layouts/AppLayout";

export default function FamilyPage() {
    const members = [
        {
            initial: "P",
            name: "Papa",
            email: "papa@famille.fr",
            role: "Parent",
        },
        {
            initial: "M",
            name: "Maman",
            email: "maman@famille.fr",
            role: "Parent",
        },
        {
            initial: "A",
            name: "Enfant A",
            email: "enfantA@famille.fr",
            role: "Enfant",
        },
        {
            initial: "B",
            name: "Enfant B",
            email: "enfantB@famille.fr",
            role: "Enfant",
        },
    ];

    return (
        <AppLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Famille</h1>

                <button className="btn btn-success">
                    + Inviter un membre
                </button>
            </div>

            <h4 className="mb-4">Espace famille & rôles</h4>

            <div className="row">
                {members.map((member, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card shadow-sm text-center h-100">
                            <div className="card-body">
                                <div
                                    className="rounded-circle bg-light mx-auto mb-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: 80,
                                        height: 80,
                                        fontSize: 28,
                                        fontWeight: "bold",
                                    }}
                                >
                                    {member.initial}
                                </div>

                                <h5>{member.name}</h5>

                                <p className="text-muted">
                                    {member.email}
                                </p>

                                <span className="badge bg-dark">
                                    {member.role}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="col-md-4 mb-4">
                    <div
                        className="card h-100 border-secondary border-dashed text-center"
                        style={{ minHeight: "250px" }}
                    >
                        <div className="card-body d-flex flex-column justify-content-center">
                            <h1>+</h1>
                            <h5>Inviter un membre</h5>
                            <p className="text-muted">
                                Parent · Enfant · Restreint
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}