// AccountsPage — Consulter mes comptes bancaires (US-12-FE)
// + Ajout d'un compte bancaire (US-08-FE)
// + Suppression d'un compte bancaire (US-08-FE)
// + Solde total

import { useEffect, useState } from "react";

import AppLayout from "../layouts/AppLayout";

import {
    getAccounts,
    getTotalBalance,
    deleteAccount,
} from "../services/accountService";

import type { Account } from "../types/account";

import moneyIcon from "../img/money.png";

import AddAccountModal from "../components/AddAccountModal";

// ---------------------------------------------------------
// Formatage du solde
// ---------------------------------------------------------

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
        totalBalance,
        setTotalBalance,
    ] = useState<number | null>(null);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState(false);

    // Suppression
    const [
        accountToDelete,
        setAccountToDelete,
    ] = useState<Account | null>(null);

    const [
        isDeleting,
        setIsDeleting,
    ] = useState(false);

    const [
        deleteError,
        setDeleteError,
    ] = useState("");

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
    // Chargement du solde total
    // -----------------------------------------------------

    const fetchTotalBalance = async () => {

        try {

            const total = await getTotalBalance();

            setTotalBalance(total);

        } catch {

            // Le total est indépendant de la liste des comptes.
            setTotalBalance(null);
        }
    };

    // -----------------------------------------------------
    // Chargement initial
    // -----------------------------------------------------

    useEffect(() => {
        fetchAccounts();
        fetchTotalBalance();
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

            setDeleteSuccess(
                `Le compte "${accountToDelete.name}" a été supprimé avec succès.`
            );

            setAccountToDelete(null);

            // Recharge la liste et le total
            await fetchAccounts();
            await fetchTotalBalance();

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
    // Regroupement
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
                CHARGEMENT
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
                ERREUR
            ================================================= */}

            {!loading && error && (
                <div className="alert alert-danger">
                    Une erreur est survenue.
                    Impossible de récupérer vos comptes.
                </div>
            )}

            {/* =================================================
                AUCUN COMPTE
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
                LISTE DES COMPTES
            ================================================= */}

            {!loading &&
                !error &&
                accounts.length > 0 && (

                    <>
                        {Object.keys(groupedAccounts).map(
                            (type) => (

                                <div
                                    className="card mb-4"
                                    key={type}
                                >

                                    <div className="card-body">

                                        <small className="text-uppercase text-muted">
                                            {categoryLabel(type)}
                                        </small>

                                        {groupedAccounts[type].map(
                                            (account) => (

                                                <div
                                                    key={account.id}
                                                    className="d-flex justify-content-between align-items-center border-top pt-3 mt-3"
                                                >

                                                    {/* Nom */}

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

                                                    {/* Solde + suppression */}

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
                        )}

                        {/* =================================================
                            SOLDE TOTAL
                        ================================================= */}

                        {totalBalance !== null && (
                            <div className="card mb-4">

                                <div className="card-body d-flex justify-content-between align-items-center">

                                    <h5 className="mb-0">
                                        Solde total
                                    </h5>

                                    <h4 className="mb-0 text-success">
                                        {formatBalance(
                                            totalBalance
                                        )}
                                    </h4>

                                </div>

                            </div>
                        )}

                    </>
                )}

            {/* =================================================
                MODAL AJOUT
            ================================================= */}

            <AddAccountModal
                show={showAddAccountModal}

                onClose={() =>
                    setShowAddAccountModal(false)
                }

                onAccountCreated={() => {
                    fetchAccounts();
                    fetchTotalBalance();
                }}
            />

            {/* =================================================
                MODAL SUPPRESSION
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