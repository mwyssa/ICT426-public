//  AccountsPage — Consulter mes comptes bancaires (US-12-FE)
//  Affiche la liste des comptes de l'utilisateur connecté + le solde total.
//  Les deux appels sont indépendants : si le total échoue, la liste reste
//  affichée quand même.

import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { getAccounts, getTotalBalance } from "../services/accountService";
import type { Account } from "../types/account";
import moneyIcon from "../img/money.png";


// Transforme un solde en montant lisible. Ex: 4000 -> "4 000.00 CHF"
function formatBalance(balance: number): string {
    return balance.toLocaleString("fr-CH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }) + " CHF";
}

export default function AccountsPage() {

    const [accounts, setAccounts] = useState<Account[]>([]);
    const [totalBalance, setTotalBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        // Appel 1 : la liste des comptes
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

        // Appel 2 : le solde total (séparé, avec logs de debug)
        const fetchTotal = async () => {
            try {
                const total = await getTotalBalance();
                setTotalBalance(total);
            } catch {
                setTotalBalance(null);
            }
        };

        fetchAccounts();
        fetchTotal();
    }, []);

    return (
        <AppLayout>
            {/* ----- EN-TÊTE ----- */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1>Comptes</h1>
                    <h4 className="mt-4">Vue globale des comptes</h4>
                </div>

                <button className="btn btn-success">
                    + Ajouter un compte
                </button>
            </div>

            {/* ----- CHARGEMENT ----- */}
            {loading && (
                <div className="text-center my-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                    <p className="mt-2">Chargement de vos comptes...</p>
                </div>
            )}

            {/* ----- ERREUR ----- */}
            {!loading && error && (
                <div className="alert alert-danger">
                    Une erreur est survenue. Impossible de récupérer vos comptes.
                </div>
            )}

            {/* ----- AUCUN COMPTE ----- */}
            {!loading && !error && accounts.length === 0 && (
                <div className="alert alert-info">
                    Vous n'avez aucun compte bancaire pour le moment.
                </div>
            )}

            {/* ----- LISTE + TOTAL ----- */}
            {!loading && !error && accounts.length > 0 && (
                <>
                    <div className="card">
                        <div className="card-body">
                            {accounts.map((account, index) => (
                                <div
                                    key={index}
                                    className="d-flex justify-content-between align-items-center border-top pt-3 mt-3"
                                >
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={moneyIcon}
                                            alt=""
                                            className="me-3"
                                            style={{ width: "32px", height: "32px" }}
                                        />
                                        <div>
                                            <h5 className="mb-0">{account.name}</h5>
                                        </div>
                                    </div>

                                    <h5 className="mb-0">{formatBalance(account.balance)}</h5>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Solde total (affiché seulement s'il a pu être récupéré) */}
                    {totalBalance !== null && (
                        <div className="card mt-4">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Solde total</h5>
                                <h4 className="mb-0 text-success">{formatBalance(totalBalance)}</h4>
                            </div>
                        </div>
                    )}
                </>
            )}
        </AppLayout>
    );
}