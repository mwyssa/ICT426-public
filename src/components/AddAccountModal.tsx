import { useEffect, useState } from "react";
import {
    createAccount,
} from "../services/accountService";

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

    // -----------------------------------------------------
    // États du formulaire
    // -----------------------------------------------------

    const [name, setName] = useState("");
    const [balance, setBalance] = useState("");
    const [accountType, setAccountType] =
        useState("Compte Courant");
    const [customType, setCustomType] = useState("");

    // -----------------------------------------------------
    // États des erreurs
    // -----------------------------------------------------

    const [nameError, setNameError] = useState("");
    const [balanceError, setBalanceError] = useState("");
    const [typeError, setTypeError] = useState("");

    const [apiError, setApiError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    // -----------------------------------------------------
    // Réinitialisation du formulaire à la fermeture
    // -----------------------------------------------------

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

    // -----------------------------------------------------
    // Si le modal n'est pas affiché
    // -----------------------------------------------------

    if (!show) {
        return null;
    }

    // -----------------------------------------------------
    // Soumission du formulaire
    // -----------------------------------------------------

    const handleSubmit = async (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        // Réinitialiser les erreurs
        setNameError("");
        setBalanceError("");
        setTypeError("");
        setApiError("");
        setSuccessMessage("");

        let isValid = true;

        // -------------------------------------------------
        // Validation du nom
        // -------------------------------------------------

        if (!name.trim()) {
            setNameError(
                "Veuillez saisir le nom du compte."
            );

            isValid = false;
        }

        // -------------------------------------------------
        // Validation du solde
        // -------------------------------------------------

        if (!balance.trim()) {
            setBalanceError(
                "Veuillez saisir le solde initial."
            );

            isValid = false;
        } else {
            const numericBalance = Number(balance);

            if (!Number.isFinite(numericBalance)) {
                setBalanceError(
                    "Le solde doit être un nombre."
                );

                isValid = false;
            } else if (numericBalance < 0) {
                setBalanceError(
                    "Le solde ne peut pas être négatif."
                );

                isValid = false;
            }
        }

        // -------------------------------------------------
        // Validation du type personnalisé
        // -------------------------------------------------

        if (
            accountType === "Autre" &&
            !customType.trim()
        ) {
            setTypeError(
                "Veuillez saisir le type de compte."
            );

            isValid = false;
        }

        if (!isValid) {
            return;
        }

        // -------------------------------------------------
        // Type final envoyé au backend
        // -------------------------------------------------

        const finalType =
            accountType === "Autre"
                ? customType.trim()
                : accountType;

        // -------------------------------------------------
        // Conversion du solde CHF → centimes
        // -------------------------------------------------

        const balanceInCents = Math.round(
            Number(balance) * 100
        );

        try {
            setIsLoading(true);

            // -------------------------------------------------
            // Création du compte via accountService
            // -------------------------------------------------

            await createAccount({
                name: name.trim(),
                balance: balanceInCents,
                type: finalType,
            });

            // -------------------------------------------------
            // Succès
            // -------------------------------------------------

            setSuccessMessage(
                "Le compte a été ajouté avec succès."
            );

            // Recharge la liste des comptes
            onAccountCreated();

            // Ferme le modal après une seconde
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

    // -----------------------------------------------------
    // Affichage
    // -----------------------------------------------------

    return (
        <div
            className="modal fade show d-block"
            tabIndex={-1}
            role="dialog"
            style={{
                backgroundColor:
                    "rgba(0,0,0,0.5)",
            }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* -----------------------------------------
                        HEADER
                    ------------------------------------------ */}

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

                    {/* -----------------------------------------
                        FORMULAIRE
                    ------------------------------------------ */}

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            {/* Erreur API */}

                            {apiError && (
                                <div className="alert alert-danger">
                                    {apiError}
                                </div>
                            )}

                            {/* Succès */}

                            {successMessage && (
                                <div className="alert alert-success">
                                    {successMessage}
                                </div>
                            )}

                            {/* ---------------------------------
                                NOM DU COMPTE
                            ---------------------------------- */}

                            <div className="mb-3">

                                <label
                                    className="form-label"
                                    htmlFor="accountName"
                                >
                                    Nom du compte
                                </label>

                                <input
                                    id="accountName"
                                    type="text"
                                    className={`form-control ${
                                        nameError
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="Ex. Raiffeisen"
                                    value={name}
                                    onChange={(e) =>
                                        setName(
                                            e.target.value
                                        )
                                    }
                                    disabled={isLoading}
                                />

                                {nameError && (
                                    <div className="invalid-feedback">
                                        {nameError}
                                    </div>
                                )}

                            </div>

                            {/* ---------------------------------
                                SOLDE INITIAL
                            ---------------------------------- */}

                            <div className="mb-3">

                                <label
                                    className="form-label"
                                    htmlFor="accountBalance"
                                >
                                    Solde initial (CHF)
                                </label>

                                <input
                                    id="accountBalance"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className={`form-control ${
                                        balanceError
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="0.00"
                                    value={balance}
                                    onChange={(e) =>
                                        setBalance(
                                            e.target.value
                                        )
                                    }
                                    disabled={isLoading}
                                />

                                {balanceError && (
                                    <div className="invalid-feedback">
                                        {balanceError}
                                    </div>
                                )}

                            </div>

                            {/* ---------------------------------
                                TYPE DE COMPTE
                            ---------------------------------- */}

                            <div className="mb-3">

                                <label
                                    className="form-label"
                                    htmlFor="accountType"
                                >
                                    Type de compte
                                </label>

                                <select
                                    id="accountType"
                                    className="form-select"
                                    value={accountType}
                                    onChange={(e) => {

                                        const value =
                                            e.target.value;

                                        setAccountType(value);

                                        // Si on revient à un
                                        // type prédéfini,
                                        // on efface le champ
                                        // personnalisé.

                                        if (
                                            value !== "Autre"
                                        ) {
                                            setCustomType("");
                                            setTypeError("");
                                        }

                                    }}
                                    disabled={isLoading}
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

                            {/* ---------------------------------
                                TYPE PERSONNALISÉ
                            ---------------------------------- */}

                            {accountType === "Autre" && (

                                <div className="mb-3">

                                    <label
                                        className="form-label"
                                        htmlFor="customAccountType"
                                    >
                                        Type personnalisé
                                    </label>

                                    <input
                                        id="customAccountType"
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
                                        disabled={isLoading}
                                    />

                                    {typeError && (
                                        <div className="invalid-feedback">
                                            {typeError}
                                        </div>
                                    )}

                                </div>
                            )}

                        </div>

                        {/* -----------------------------------------
                            FOOTER
                        ------------------------------------------ */}

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