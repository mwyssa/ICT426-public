// ============================================================================
// accountService — accès aux données des comptes bancaires
// ============================================================================

import type { Account } from "../types/account";

const API_URL = "http://localhost:3000/api/accounts";

// ----------------------------------------------------------------------------
// Récupère l'ID de l'utilisateur connecté
// ----------------------------------------------------------------------------

function getUserId(): number {
    const stored = localStorage.getItem("user");

    if (!stored) {
        throw new Error("Utilisateur non connecté.");
    }

    try {
        const user = JSON.parse(stored);

        if (!user.id) {
            throw new Error("Identifiant utilisateur introuvable.");
        }

        return Number(user.id);

    } catch {
        throw new Error(
            "Impossible de récupérer les informations de l'utilisateur."
        );
    }
}

// ----------------------------------------------------------------------------
// Récupère la liste des comptes de l'utilisateur connecté
// ----------------------------------------------------------------------------

export async function getAccounts(): Promise<Account[]> {
    const userId = getUserId();

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/${userId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token
                    ? {
                        Authorization: `Bearer ${token}`,
                    }
                    : {}),
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Impossible de récupérer les comptes."
        );
    }

    return data;
}

// ----------------------------------------------------------------------------
// Récupère le solde TOTAL de tous les comptes de l'utilisateur connecté
// ----------------------------------------------------------------------------

export async function getTotalBalance(): Promise<number> {
    const userId = getUserId();

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/${userId}/total-balance`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token
                    ? {
                        Authorization: `Bearer ${token}`,
                    }
                    : {}),
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Impossible de récupérer le solde total."
        );
    }

    return Number(data.total_balance);
}

// ----------------------------------------------------------------------------
// Crée un compte bancaire
// ----------------------------------------------------------------------------

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

    const response = await fetch(
        API_URL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(account),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Impossible d'ajouter le compte."
        );
    }

    return data.account;
}

// ----------------------------------------------------------------------------
// Supprime un compte bancaire
// ----------------------------------------------------------------------------

export async function deleteAccount(
    accountId: number
): Promise<void> {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Vous devez être connecté.");
    }

    const response = await fetch(
        `${API_URL}/${accountId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Impossible de supprimer le compte."
        );
    }
}