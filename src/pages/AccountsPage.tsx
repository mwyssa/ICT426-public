// AccountsPage — Consulter mes comptes bancaires (US-12-FE)
// + Ajout d'un compte bancaire (US-08-FE)
//
// Affiche la liste des comptes de l'utilisateur connecté,
// regroupés par type.
// Gère les états : chargement, erreur, liste vide.
// Le bouton "Ajouter un compte" ouvre le formulaire d'ajout.

import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { getAccounts } from "../services/accountService";
import type { Account } from "../types/account";
import moneyIcon from "../img/money.png";
import AddAccountModal from "../components/AddAccountModal";

// ---------------------------------------------------------
// Formatage du solde
// ---------------------------------------------------------
// Le solde est stocké en centimes dans la DB.
// Exemple : 218050 -> 2 180,50 CHF
function formatBalance(centimes: number): string {
    const montant = centimes / 100;

    return (
        montant.toLocaleString("fr-CH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }) + " CHF"
    );
}

// ---------------------------------------------------------
// Regroupement des comptes par type
// ---------------------------------------------------------
// Avec le nouveau schéma SQL, le champ "type" contient
// directement une valeur comme :
//   "Compte Courant"
//   "Compte Epargne"
//   "Compte personnel"
// ---------------------------------------------------------
function groupByType(accounts: Account[]): Record<string, Account[]> {
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

    // Pour un type personnalisé :
    // "Compte Personnel" -> "Compte Personnel"
    return labels[type] ?? type;
}

export default function AccountsPage() {
    // -----------------------------------------------------
    // États
    // -----------------------------------------------------

    const [showAddAccountModal, setShowAddAccountModal] =
        useState(false);

    const [accounts, setAccounts] = useState<Account[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

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

                {/* Bouton d'ajout */}
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

                                    {/* Nom de la catégorie */}

                                    <small className="text-uppercase text-muted">
                                        {categoryLabel(type)}
                                    </small>

                                    {/* ---------------------------------
                                        Comptes de la catégorie
                                    --------------------------------- */}

                                    {groupedAccounts[type].map(
                                        (account) => (

                                            <div
                                                key={account.id}
                                                className="d-flex justify-content-between align-items-center border-top pt-3 mt-3"
                                            >

                                                {/* Icône + nom */}

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

                                                {/* Solde */}

                                                <h5 className="mb-0">
                                                    {formatBalance(
                                                        account.balance
                                                    )}
                                                </h5>

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
                    // Recharge la liste après création
                    fetchAccounts();
                }}
            />

        </AppLayout>
    );
}