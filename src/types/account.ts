//  Type Account — décrit un compte bancaire
//  Aligné sur la table `Accounts` de la base (id, name, balance, type).
//  Le champ user_id de la base n'apparaît PAS ici : le backend filtre déjà
//  les comptes de l'utilisateur connecté, le front n'en a pas besoin.

export type Account = {
    id: number;      // identifiant unique du compte
    name: string;    // nom du compte (ex: "Compte courant")
    balance: number; // solde EN CENTIMES (ex: 2180 = 21,80) — à confirmer avec le backend
    type: string;    // type de compte (ex: "courant", "epargne")
};