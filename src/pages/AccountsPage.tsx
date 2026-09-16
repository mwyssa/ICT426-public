// AccountsPage — Consulter mes comptes bancaires (US-12-FE)
// + Ajout d'un compte bancaire (US-08-FE)
// + Suppression d'un compte bancaire (US-08-FE)
//
// Affiche la liste des comptes de l'utilisateur connecté,
// regroupés par type.
// Gère les états : chargement, erreur, liste vide.
// Permet d'ajouter et de supprimer un compte bancaire.

import { useEffect, useState } from "react";

import AppLayout from "../layouts/AppLayout";

import {
    getAccounts,
    deleteAccount,
} from "../services/accountService";

import type { Account } from "../types/account";

import moneyIcon from "../img/money.png";

import AddAccountModal from "../components/AddAccountModal";

// ---------------------------------------------------------
// Formatage du solde
// ---------------------------------------------------------
// Le solde est stocké directement dans la DB.
// Exemple : 696969 -> "696 969,00 CHF"
function formatBalance(balance: number): string {
    return (
        balance.toLocaleString("fr-CH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }) + " CHF"
    );
}

// ---------------------------------------------------------
// Regroupement des comptes par type
// ---------------------------------------------------------

function groupByType(
    accounts: Account[]
): Record<string, Account[]> {

    const groups: Record<string, Account[]> = {};

    for (const account of accounts) {

        if (!groups[account.type]) {
            groups[account.type] = [];
        }

        groups[account.type].push(account);
    }

    return groups;
}

// ---------------------------------------------------------
// Nom affiché pour chaque catégorie
// ---------------------------------------------------------

function categoryLabel(type: string): string {

    const labels: Record<string, string> = {
        "Compte Courant": "Comptes courants",
        "Compte Epargne": "Comptes épargne",
    };

    return labels[type] ?? type;
}

export default function AccountsPage() {

    // -----------------------------------------------------
    // États
    // -----------------------------------------------------

    const [
        showAddAccountModal,
        setShowAddAccountModal,
    ] = useState(false);

    const [
        accounts,
        setAccounts,
    ] = useState<Account[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState(false);

    // Compte actuellement sélectionné pour suppression
    const [
        accountToDelete,
        setAccountToDelete,
    ] = useState<Account | null>(null);

    // Suppression en cours
    const [
        isDeleting,
        setIsDeleting,
    ] = useState(false);

    // Erreur de suppression
    const [
        deleteError,
        setDeleteError,
    ] = useState("");

    // Message de succès
    const [
        deleteSuccess,
        setDeleteSuccess,
    ] = useState("");

    // -----------------------------------------------------
    // Chargement des comptes
    // -----------------------------------------------------

    const fetchAccounts = async () => {

        try {

            setLoading(true);
            setError(false);

            const data = await getAccounts();

            setAccounts(data);

        } catch {

            setError(true);

        } finally {

            setLoading(false);
        }
    };

    // -----------------------------------------------------
    // Chargement initial
    // -----------------------------------------------------

    useEffect(() => {
        fetchAccounts();
    }, []);

    // -----------------------------------------------------
    // Suppression d'un compte
    // -----------------------------------------------------

    const handleDeleteAccount = async () => {

        if (!accountToDelete) {
            return;
        }

        try {

            setIsDeleting(true);
            setDeleteError("");
            setDeleteSuccess("");

            await deleteAccount(accountToDelete.id);

            // Le compte a été supprimé
            setDeleteSuccess(
                `Le compte "${accountToDelete.name}" a été supprimé avec succès.`
            );

            // Ferme la confirmation
            setAccountToDelete(null);

            // Recharge la liste
            await fetchAccounts();

        } catch (error) {

            setDeleteError(
                error instanceof Error
                    ? error.message
                    : "Impossible de supprimer le compte."
            );

        } finally {

            setIsDeleting(false);
        }
    };

    // -----------------------------------------------------
    // Regroupement des comptes
    // -----------------------------------------------------

    const groupedAccounts = groupByType(accounts);

    return (
        <AppLayout>

            {/* =================================================
                EN-TÊTE
            ================================================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h1>Comptes</h1>

                    <h4 className="mt-4">
                        Vue globale des comptes
                    </h4>

                </div>

                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() =>
                        setShowAddAccountModal(true)
                    }
                >
                    + Ajouter un compte
                </button>

            </div>

            {/* =================================================
                MESSAGE DE SUCCÈS
            ================================================= */}

            {deleteSuccess && (
                <div className="alert alert-success">
                    {deleteSuccess}
                </div>
            )}

            {/* =================================================
                ÉTAT : CHARGEMENT
            ================================================= */}

            {loading && (
                <div className="text-center my-5">

                    <div
                        className="spinner-border"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Chargement...
                        </span>
                    </div>

                    <p className="mt-2">
                        Chargement de vos comptes...
                    </p>

                </div>
            )}

            {/* =================================================
                ÉTAT : ERREUR
            ================================================= */}

            {!loading && error && (
                <div className="alert alert-danger">
                    Une erreur est survenue.
                    Impossible de récupérer vos comptes.
                </div>
            )}

            {/* =================================================
                ÉTAT : AUCUN COMPTE
            ================================================= */}

            {!loading &&
                !error &&
                accounts.length === 0 && (

                    <div className="alert alert-info">
                        Vous n'avez aucun compte bancaire
                        pour le moment.
                    </div>
                )}

            {/* =================================================
                ÉTAT : COMPTES
            ================================================= */}

            {!loading &&
                !error &&
                accounts.length > 0 && (

                    Object.keys(groupedAccounts).map(
                        (type) => (

                            <div
                                className="card mb-4"
                                key={type}
                            >

                                <div className="card-body">

                                    {/* -----------------------------
                                        Catégorie
                                    ------------------------------ */}

                                    <small className="text-uppercase text-muted">
                                        {categoryLabel(type)}
                                    </small>

                                    {/* -----------------------------
                                        Comptes
                                    ------------------------------ */}

                                    {groupedAccounts[type].map(
                                        (account) => (

                                            <div
                                                key={account.id}
                                                className="d-flex justify-content-between align-items-center border-top pt-3 mt-3"
                                            >

                                                {/* ---------
                                                    Nom
                                                ---------- */}

                                                <div className="d-flex align-items-center">

                                                    <img
                                                        src={moneyIcon}
                                                        alt=""
                                                        className="me-3"
                                                        style={{
                                                            width: "32px",
                                                            height: "32px",
                                                        }}
                                                    />

                                                    <div>

                                                        <h5 className="mb-0">
                                                            {account.name}
                                                        </h5>

                                                    </div>

                                                </div>

                                                {/* ---------
                                                    Solde +
                                                    suppression
                                                ---------- */}

                                                <div className="d-flex align-items-center gap-3">

                                                    <h5 className="mb-0">
                                                        {formatBalance(
                                                            account.balance
                                                        )}
                                                    </h5>

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => {

                                                            setDeleteError("");
                                                            setDeleteSuccess("");

                                                            setAccountToDelete(
                                                                account
                                                            );
                                                        }}
                                                    >
                                                        Supprimer
                                                    </button>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>

                        )
                    )

                )}

            {/* =================================================
                MODAL AJOUT DE COMPTE
            ================================================= */}

            <AddAccountModal
                show={showAddAccountModal}

                onClose={() =>
                    setShowAddAccountModal(false)
                }

                onAccountCreated={() => {
                    fetchAccounts();
                }}
            />

            {/* =================================================
                MODAL CONFIRMATION SUPPRESSION
            ================================================= */}

            {accountToDelete && (

                <div
                    className="modal fade show d-block"
                    tabIndex={-1}
                    role="dialog"
                    aria-modal="true"
                    style={{
                        backgroundColor:
                            "rgba(0, 0, 0, 0.5)",
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content">

                            {/* -----------------------------
                                HEADER
                            ------------------------------ */}

                            <div className="modal-header">

                                <h5 className="modal-title">
                                    Supprimer le compte
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Fermer"
                                    onClick={() =>
                                        setAccountToDelete(null)
                                    }
                                    disabled={isDeleting}
                                />

                            </div>

                            {/* -----------------------------
                                BODY
                            ------------------------------ */}

                            <div className="modal-body">

                                <p className="mb-0">
                                    Voulez-vous vraiment
                                    supprimer le compte{" "}
                                    <strong>
                                        {accountToDelete.name}
                                    </strong>{" "}
                                    ?
                                </p>

                                <p className="text-muted mt-2 mb-0">
                                    Cette action est irréversible.
                                </p>

                                {deleteError && (
                                    <div className="alert alert-danger mt-3 mb-0">
                                        {deleteError}
                                    </div>
                                )}

                            </div>

                            {/* -----------------------------
                                FOOTER
                            ------------------------------ */}

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        setAccountToDelete(null)
                                    }
                                    disabled={isDeleting}
                                >
                                    Annuler
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDeleteAccount}
                                    disabled={isDeleting}
                                >
                                    {isDeleting
                                        ? "Suppression..."
                                        : "Supprimer"}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            )}

        </AppLayout>
    );
}