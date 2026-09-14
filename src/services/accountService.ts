// accountService — accès aux données des comptes bancaires
//
// Toute communication avec le backend concernant les comptes
// passe par ce fichier.

import type { Account } from "../types/account";

const API_URL = "http://localhost:3000/api/accounts";

// ---------------------------------------------------------
// Récupérer les comptes de l'utilisateur connecté
// ---------------------------------------------------------

export async function getAccounts(): Promise<Account[]> {
    const token = localStorage.getItem("token");

    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                }
                : {}),
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Impossible de récupérer les comptes."
        );
    }

    return data;
}

// ---------------------------------------------------------
// Créer un compte bancaire
// ---------------------------------------------------------

export type CreateAccountData = {
    name: string;
    balance: number;
    type: string;
};

export async function createAccount(
    account: CreateAccountData
): Promise<Account> {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Vous devez être connecté.");
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(account),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Impossible d'ajouter le compte."
        );
    }

    return data.account;
}