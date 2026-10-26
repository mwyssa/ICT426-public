// ============================================================================
// accountService — accès aux données des comptes bancaires
// ============================================================================

import type { Account } from "../types/account";

const API_URL = "http://localhost:3000/api/accounts";

// ----------------------------------------------------------------------------
// Récupère le token de l'utilisateur connecté
// ----------------------------------------------------------------------------

function getToken(): string {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Vous devez être connecté.");
    }

    return token;
}

// ----------------------------------------------------------------------------
// Récupère la liste des comptes de l'utilisateur connecté
// GET /api/accounts
// ----------------------------------------------------------------------------

export async function getAccounts(): Promise<Account[]> {
    const token = getToken();

    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Impossible de récupérer les comptes."
        );
    }

    if (!Array.isArray(data)) {
        throw new Error(
            "Le serveur n'a pas renvoyé une liste de comptes valide."
        );
    }

    return data as Account[];
}

// ----------------------------------------------------------------------------
// Récupère le solde total des comptes de l'utilisateur connecté
// GET /api/accounts/total-balance
// ----------------------------------------------------------------------------

export async function getTotalBalance(): Promise<number> {
    const token = getToken();

    const response = await fetch(`${API_URL}/total-balance`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Impossible de récupérer le solde total."
        );
    }

    return Number(data.total_balance);
}

// ----------------------------------------------------------------------------
// Crée un compte bancaire
// POST /api/accounts
// ----------------------------------------------------------------------------

export type CreateAccountData = {
    name: string;
    balance: number;
    type: string;
};

export async function createAccount(
    account: CreateAccountData
): Promise<Account> {
    const token = getToken();

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

// ----------------------------------------------------------------------------
// Supprime un compte bancaire
// DELETE /api/accounts/:id
// ----------------------------------------------------------------------------

export async function deleteAccount(
    accountId: number
): Promise<void> {
    const token = getToken();

    const response = await fetch(`${API_URL}/${accountId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Impossible de supprimer le compte."
        );
    }
}