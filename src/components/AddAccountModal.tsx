import { useEffect, useState } from "react";

type AddAccountModalProps = {
    show: boolean;
    onClose: () => void;
    onAccountCreated: () => void;
};

export default function AddAccountModal({
                                            show,
                                            onClose,
                                            onAccountCreated,
                                        }: AddAccountModalProps) {

    const [name, setName] = useState("");
    const [balance, setBalance] = useState("");
    const [accountType, setAccountType] = useState("Compte Courant");
    const [customType, setCustomType] = useState("");

    const [nameError, setNameError] = useState("");
    const [balanceError, setBalanceError] = useState("");
    const [typeError, setTypeError] = useState("");

    const [apiError, setApiError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!show) {
            setName("");
            setBalance("");
            setAccountType("Compte Courant");
            setCustomType("");

            setNameError("");
            setBalanceError("");
            setTypeError("");
            setApiError("");
            setSuccessMessage("");
            setIsLoading(false);
        }
    }, [show]);

    if (!show) {
        return null;
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setNameError("");
        setBalanceError("");
        setTypeError("");
        setApiError("");
        setSuccessMessage("");

        let isValid = true;

        // Validation du nom
        if (!name.trim()) {
            setNameError("Veuillez saisir le nom du compte.");
            isValid = false;
        }

        // Validation du solde
        if (!balance.trim()) {
            setBalanceError("Veuillez saisir le solde initial.");
            isValid = false;
        } else if (Number.isNaN(Number(balance))) {
            setBalanceError("Le solde doit être un nombre.");
            isValid = false;
        }

        // Validation du type personnalisé
        if (accountType === "Autre" && !customType.trim()) {
            setTypeError("Veuillez saisir le type de compte.");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const finalType =
            accountType === "Autre"
                ? customType.trim()
                : accountType;

        try {
            setIsLoading(true);

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:3000/api/accounts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token
                            ? {
                                Authorization: `Bearer ${token}`,
                            }
                            : {}),
                    },
                    body: JSON.stringify({
                        name: name.trim(),
                        balance: Number(balance),
                        type: finalType,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Impossible d'ajouter le compte."
                );
            }

            setSuccessMessage(
                "Le compte a été ajouté avec succès."
            );

            onAccountCreated();

            setTimeout(() => {
                onClose();
            }, 1000);

        } catch (error) {
            setApiError(
                error instanceof Error
                    ? error.message
                    : "Une erreur est survenue."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="modal fade show d-block"
            tabIndex={-1}
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">
                            Ajouter un compte bancaire
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            disabled={isLoading}
                        />
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            {apiError && (
                                <div className="alert alert-danger">
                                    {apiError}
                                </div>
                            )}

                            {successMessage && (
                                <div className="alert alert-success">
                                    {successMessage}
                                </div>
                            )}

                            {/* Nom */}
                            <div className="mb-3">
                                <label className="form-label">
                                    Nom du compte
                                </label>

                                <input
                                    type="text"
                                    className={`form-control ${
                                        nameError
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="Ex. Raiffeisen"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                />

                                {nameError && (
                                    <div className="invalid-feedback">
                                        {nameError}
                                    </div>
                                )}
                            </div>

                            {/* Solde */}
                            <div className="mb-3">
                                <label className="form-label">
                                    Solde initial (CHF)
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    className={`form-control ${
                                        balanceError
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="0.00"
                                    value={balance}
                                    onChange={(e) =>
                                        setBalance(e.target.value)
                                    }
                                />

                                {balanceError && (
                                    <div className="invalid-feedback">
                                        {balanceError}
                                    </div>
                                )}
                            </div>

                            {/* Type */}
                            <div className="mb-3">
                                <label className="form-label">
                                    Type de compte
                                </label>

                                <select
                                    className="form-select"
                                    value={accountType}
                                    onChange={(e) => {
                                        setAccountType(
                                            e.target.value
                                        );

                                        if (
                                            e.target.value !==
                                            "Autre"
                                        ) {
                                            setCustomType("");
                                            setTypeError("");
                                        }
                                    }}
                                >
                                    <option value="Compte Courant">
                                        Compte courant
                                    </option>

                                    <option value="Compte Epargne">
                                        Compte épargne
                                    </option>

                                    <option value="Autre">
                                        Autre
                                    </option>
                                </select>
                            </div>

                            {/* Type personnalisé */}
                            {accountType === "Autre" && (
                                <div className="mb-3">
                                    <label className="form-label">
                                        Type personnalisé
                                    </label>

                                    <input
                                        type="text"
                                        className={`form-control ${
                                            typeError
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Ex. Compte vacances"
                                        value={customType}
                                        onChange={(e) =>
                                            setCustomType(
                                                e.target.value
                                            )
                                        }
                                    />

                                    {typeError && (
                                        <div className="invalid-feedback">
                                            {typeError}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                                disabled={isLoading}
                            >
                                Annuler
                            </button>

                            <button
                                type="submit"
                                className="btn btn-success"
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? "Ajout..."
                                    : "Ajouter le compte"}
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}