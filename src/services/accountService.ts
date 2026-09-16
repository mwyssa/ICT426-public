// ============================================================================
//  accountService — accès aux données des comptes bancaires
//  Appelle le vrai backend (API Express sur http://localhost:3000).
// ============================================================================
import type { Account } from "../types/account";

// Récupère l'id de l'utilisateur connecté depuis le localStorage.
// Le login y stocke l'objet "user" (ex: {"id":7,"name":"Han",...}).
function getUserId(): number {
    const stored = localStorage.getItem("user");
    if (!stored) {
        throw new Error("Utilisateur non connecté");
    }
    const user = JSON.parse(stored);
    return user.id;
}

// Récupère la liste des comptes de l'utilisateur connecté.
export async function getAccounts(): Promise<Account[]> {
    const userId = getUserId();

    const res = await fetch(`http://localhost:3000/api/accounts/${userId}`);

    if (!res.ok) {
        throw new Error("Impossible de récupérer les comptes");
    }

    return res.json();
}

// Récupère le solde TOTAL de tous les comptes de l'utilisateur connecté.
// La route renvoie { total_balance: "14000" } — la valeur est une CHAÎNE,
// on la convertit en nombre avec Number() pour pouvoir la formater ensuite.
export async function getTotalBalance(): Promise<number> {
    const userId = getUserId();

    const res = await fetch(`http://localhost:3000/api/accounts/${userId}/total-balance`);

    if (!res.ok) {
        throw new Error("Impossible de récupérer le solde total");
    }

    const data = await res.json();
    return Number(data.total_balance); // conversion texte -> nombre
}