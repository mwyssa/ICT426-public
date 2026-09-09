//  AccountsPage — Consulter mes comptes bancaires (US-12-FE)
//  Affiche la liste des comptes de l'utilisateur connecté, REGROUPÉS PAR TYPE
//  (courant, epargne, ...). Gère les états : chargement, erreur, liste vide.
//  Le bouton "Ajouter un compte" est en place : il sera branché sur le
//  formulaire d'ajout (US-08) par la suite.

import { useEffect, useState } from "react";              // états + effet au chargement
import AppLayout from "../layouts/AppLayout";              // cadre commun (sidebar)
import { getAccounts } from "../services/accountService";  // récupération des données
import type { Account } from "../types/account";           // type d'un compte


// Le solde est stocké en centimes (INT). On le transforme en montant lisible.
// Ex: 218050 -> "2 180.50 CHF"
function formatBalance(centimes: number): string {
    const montant = centimes / 100;
    return montant.toLocaleString("fr-CH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }) + " CHF";
}

// Regroupe les comptes par leur champ "type".
// Renvoie un objet du genre : { courant: [...], epargne: [...] }
function groupByType(accounts: Account[]): Record<string, Account[]> {
    const groups: Record<string, Account[]> = {};
    for (const account of accounts) {
        // si le groupe n'existe pas encore, on le crée
        if (!groups[account.type]) {
            groups[account.type] = [];
        }
        groups[account.type].push(account);
    }
    return groups;
}

// Petite aide pour afficher un titre de catégorie lisible.
// Ex: "courant" -> "Comptes courants"
function categoryLabel(type: string): string {
    const labels: Record<string, string> = {
        courant: "Comptes courants",
        epargne: "Comptes épargne",
    };
    return labels[type] ?? `Comptes ${type}`; // valeur par défaut si type inconnu
}

export default function AccountsPage() {

    const [accounts, setAccounts] = useState<Account[]>([]); // la liste des comptes
    const [loading, setLoading] = useState(true);            // true = chargement en cours
    const [error, setError] = useState(false);               // true = la récupération a échoué


    // useEffect avec [] = s'exécute une seule fois, au premier affichage.
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                setLoading(true);
                setError(false);
                const data = await getAccounts(); // appel au service
                setAccounts(data);                // on stocke les comptes reçus
            } catch {
                setError(true);                   // en cas d'échec, on active l'erreur
            } finally {
                setLoading(false);                // dans tous les cas, on arrête le chargement
            }
        };

        fetchAccounts();
    }, []);

    // On regroupe les comptes par type juste avant l'affichage.
    const groupedAccounts = groupByType(accounts);

    return (
        <AppLayout>
            {/* ----- EN-TÊTE : titre + bouton "Ajouter un compte" ----- */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1>Comptes</h1>
                    <h4 className="mt-4">Vue globale des comptes</h4>
                </div>

                {/* Bouton en place, sera branché sur le formulaire d'ajout (US-08) */}
                <button className="btn btn-success">
                    + Ajouter un compte
                </button>
            </div>

            {/* ----- ÉTAT 1 : CHARGEMENT ----- */}
            {loading && (
                <div className="text-center my-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                    <p className="mt-2">Chargement de vos comptes...</p>
                </div>
            )}

            {/* ----- ÉTAT 2 : ERREUR ----- */}
            {!loading && error && (
                <div className="alert alert-danger">
                    Une erreur est survenue. Impossible de récupérer vos comptes.
                </div>
            )}

            {/* ----- ÉTAT 3 : AUCUN COMPTE ----- */}
            {!loading && !error && accounts.length === 0 && (
                <div className="alert alert-info">
                    Vous n'avez aucun compte bancaire pour le moment.
                </div>
            )}

            {/* ----- ÉTAT 4 : LES COMPTES, REGROUPÉS PAR TYPE ----- */}
            {!loading && !error && accounts.length > 0 && (
                // On boucle sur chaque groupe (chaque type de compte).
                // Object.keys(groupedAccounts) = la liste des types présents.
                Object.keys(groupedAccounts).map((type) => (
                    <div className="card mb-4" key={type}>
                        <div className="card-body">
                            {/* Titre de la catégorie */}
                            <small className="text-uppercase text-muted">
                                {categoryLabel(type)}
                            </small>

                            {/* Les comptes de ce groupe */}
                            {groupedAccounts[type].map((account) => (
                                <div
                                    key={account.id}
                                    className="d-flex justify-content-between align-items-center border-top pt-3 mt-3"
                                >
                                    <div className="d-flex align-items-center">
                                        <div className="fs-2 me-3">🏦</div>
                                        <div>
                                            <h5 className="mb-0">{account.name}</h5>
                                        </div>
                                    </div>

                                    <h5 className="mb-0">{formatBalance(account.balance)}</h5>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </AppLayout>
    );
}