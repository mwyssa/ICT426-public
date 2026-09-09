//  accountService — accès aux données des comptes bancaires
//  Seul endroit qui "parle" au backend. Pour l'instant : mock (fausses
//  données). Plus tard : on décommente le fetch, sans rien changer ailleurs.

import type { Account } from "../types/account";

// Récupère la liste des comptes de l'utilisateur connecté.
export async function getAccounts(): Promise<Account[]> {
    // --- Version MOCK (temporaire, tant que le backend n'est pas prêt) ---
    // Les soldes sont en CENTIMES, comme le fera la base (balance = INT).
    // Petit délai artificiel pour voir l'état de chargement à l'écran :
    await new Promise((resolve) => setTimeout(resolve, 800));

    return [
        { id: 1, name: "Compte courant", balance: 218050, type: "courant" },
        { id: 2, name: "Compte épargne", balance: 564000, type: "epargne" },
        { id: 3, name: "Compte commun",  balance: 132075, type: "courant" },
    ];

    // --- Version BACKEND (à activer quand l'API existera) ---
    // const res = await fetch("http://localhost:8080/api/accounts");
    // if (!res.ok) throw new Error("Impossible de récupérer les comptes");
    // return res.json();
}