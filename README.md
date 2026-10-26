# BudgetFlow — ICT426-GestionBudget

Application web de gestion budgétaire familiale réalisée dans le cadre du cours **ICT426**.

L’objectif du projet est de permettre à une famille de suivre ses comptes, ses transactions, ses enveloppes de budget et ses dépenses. Le projet devait être réalisé en sept semaines par une équipe de huit personnes.

> Le projet n’a pas pu être finalisé dans le temps prévu. Ce README présente donc l’état du prototype au moment de la remise.

## Sommaire

1. Présentation des fonctionnalités
2. État des fonctionnalités
3. Technologies utilisées
4. Organisation du projet
5. Organisation des branches Git
6. Base de données
7. Installation et lancement
8. Routes API
9. Points à retenir
10. Équipe

## 1. Ce que l’on peut déjà faire

- Se connecter avec un compte existant.
- Recevoir un token JWT après la connexion.
- Accéder aux pages de l’application uniquement lorsqu’un token est présent.
- Se déconnecter : les données de session locales sont supprimées, puis l’utilisateur revient à la page de connexion.
- Consulter les différents écrans du prototype : tableau de bord, comptes, transactions, enveloppes, statistiques, famille et paramètres.
- Ajouter ou supprimer un compte via les routes backend prévues à cet effet.

## 2. État des fonctionnalités

Les fonctionnalités sont classées selon trois états :

- **Fait** : la fonctionnalité a une logique utilisable.
- **En cours** : une interface ou une partie backend existe, mais l’ensemble n’est pas encore terminé.
- **Non réalisé** : la fonctionnalité n’a pas été développée.

### Connexion et sécurité

| Fonctionnalité | État | Notes |
|---|---|---|
| Connexion avec email et mot de passe | Fait | L’API vérifie les identifiants avec MySQL et bcrypt. |
| Token JWT | Fait | Un token est renvoyé après la connexion. |
| Protection des pages frontend | Fait | Une page privée redirige vers la connexion sans token. |
| Déconnexion | Fait | Le token, l’utilisateur et l’état de connexion sont supprimés du navigateur. |
| Inscription | En cours | La route backend existe, mais le formulaire React n’y est pas encore relié. |
| Rôles utilisateur / administrateur | En cours | Des rôles existent en base, mais ne sont pas appliqués partout. |
| Chiffrement des données métier | Non réalisé | Les soldes et transactions ne sont pas chiffrés en base. |

### Comptes bancaires

| Fonctionnalité | État | Notes |
|---|---|---|
| Afficher les comptes et les soldes | En cours | L’écran et les routes existent, mais les appels frontend/backend doivent encore être alignés. |
| Ajouter un compte | Fait | Modal de saisie, validation et route API de création. |
| Supprimer un compte | Fait | Confirmation, appel API et message de résultat. |
| Modifier un compte | Non réalisé | Il manque une route "PUT /api/accounts/:id". |
| Mettre à jour un solde via les transactions | Non réalisé | Non relié aux transactions. |
| Transfert entre comptes | Non réalisé | Pas de logique métier prévue à ce stade. |

### Transactions et import bancaire

| Fonctionnalité | État | Notes |
|---|---|---|
| Voir une liste de transactions | En cours | Une route backend existe, mais la page affiche encore des exemples statiques. |
| Filtrer par compte, date ou catégorie | En cours | Les boutons sont présents, sans logique de filtrage. |
| Ajouter une transaction | Non réalisé | Non développé. |
| Importer un fichier CSV | Non réalisé | Bouton visuel uniquement. |
| Associer automatiquement une catégorie à une enveloppe | Non réalisé | Non développé. |
| Éviter les doublons d’import | Non réalisé | Non développé. |

### Budgets, enveloppes et statistiques

| Fonctionnalité | État | Notes |
|---|---|---|
| Budget annuel | En cours | L’écran existe avec des données d’exemple. |
| Comparer le budget et les dépenses réelles | Non réalisé | Pas de calcul relié aux données. |
| Alertes de dépassement | Non réalisé | Non développé. |
| Enveloppes de budget | En cours | Les cartes et jauges sont affichées avec des données statiques. |
| Créer ou transférer entre des enveloppes | En cours | Boutons non reliés à une logique métier. |
| Statistiques et graphiques | En cours | Les emplacements sont prévus, les graphiques ne sont pas générés. |
| Comparaison entre deux années | Non réalisé | Non développé. |
| Export PDF ou Excel | Non réalisé | Non développé. |

### Famille et paramètres

| Fonctionnalité | État | Notes |
|---|---|---|
| Voir les membres de la famille | En cours | Une route API existe, la page utilise encore des données statiques. |
| Créer ou renommer une famille | En cours | Routes backend présentes, sans interface complète. |
| Inviter un membre | Non réalisé | Non développé. |
| Préférences et paramètres | En cours | Interface disponible, choix non enregistrés. |

## 3. Technologies utilisées

### Frontend

- **React** : création des interfaces utilisateur.
- **TypeScript** : développement avec typage statique.
- **React Router** : gestion de la navigation et des routes privées.
- **Bootstrap** : mise en forme et composants visuels.

### Backend

- **Node.js** : environnement d’exécution JavaScript.
- **Express** : création des routes et de l’API REST.
- **mysql2** : communication avec la base de données MySQL.
- **jsonwebtoken** : génération et vérification des tokens JWT.
- **bcrypt** : hachage et vérification des mots de passe.

### Base de données

- **MySQL** : système de gestion de base de données relationnelle.
- **SQL** : définition, manipulation et interrogation des données.

## 4. Organisation du projet

```text
I426/
├── README.md
└── ICT426-GestionBudget/
    ├── src/              # Application React
    │   ├── components/   # Modals et composants réutilisables
    │   ├── pages/        # Pages visibles dans le navigateur
    │   ├── router/       # Navigation et pages protégées
    │   └── services/     # Appels vers l’API
    ├── server/           # API Express
    │   ├── controllers/  # Traitement des requêtes
    │   ├── models/       # Requêtes MySQL
    │   ├── routes/       # Endpoints de l’API
    │   └── middleware/   # JWT et gestion des erreurs
    ├── public/           # Fichiers statiques
    ├── package.json
    └── .env              # Configuration locale, non versionnée
```

L’application est organisée en deux parties principales :

- **Frontend** : interface React permettant aux utilisateurs d’interagir avec l’application.
- **Backend** : API Express assurant le traitement des requêtes et les interactions avec MySQL.

Les échanges entre le frontend et le backend sont réalisés au moyen de requêtes HTTP.

## 5. Organisation des branches Git

Pour faciliter le travail collaboratif entre les huit membres du groupe, le projet utilise cette organisation des branches :

### Structure des branches

```text
main
│
└── dev
    ├── frontend
    │   ├── feature-frontend-1
    │   └── feature-frontend-2
    │
    ├── backend
    │   ├── feature-backend-1
    │   └── feature-backend-2
    │
    └── database
        ├── feature-database-1
        └── feature-database-2
```

### Rôle des branches

| Branche | Utilisation |
|---|---|
| `main` | Dernière version stable du projet. |
| `dev` | Mise en commun globale des développements. |
| `frontend` | Intégration des fonctionnalités frontend. |
| `backend` | Intégration des fonctionnalités backend. |
| `database` | Intégration des modifications de la base de données. |
| `feature` | Développement d’une fonctionnalité spécifique. |


## 6. Base de données

Le projet utilise une base de données relationnelle MySQL en locale.

Elle contient :

- La structure des tables et leurs relations.
- Des données fictives destinées au développement et aux tests.


## 7. Installation et lancement du projet

### Prérequis

- Node.js et npm
- MySQL

Toutes les commandes doivent être exécutées depuis le dossier racine du projet (contenant `package.json`).

### 7.1 Installer les dépendances

```bash
npm install
```

Si nécessaire, installer les dépendances du backend :

```bash
npm install express mysql2 bcrypt jsonwebtoken dotenv cors
```

Si vous avez un script à valider :

```bash
npm approve-scripts bcrypt@6.0.0
```

### 7.2 Configurer la base de données

- Démarrer MySQL.
- Configurer la base de données locale.
- Renseigner les paramètres de connexion dans le fichier `.env`.

### 7.3 Démarrer le backend

Dans un premier terminal :

```bash
npm run dev:server
```

Si tout fonctionne :

```text
Connexion MySQL réussie.
API disponible sur http://localhost:3000
```

### 7.4 Démarrer le frontend

Dans un second terminal :

```bash
npm run dev
```

Ouvrir ensuite l'application dans le navigateur :

http://localhost:5173

### 7.5 Arrêter les serveurs

Dans chaque terminal, utiliser `Ctrl + C` pour arrêter le serveur correspondant.


## 8. Documentation de l'API

L'application dispose d'une API REST développée avec Node.js et Express.

L'ensemble des routes API sont documentées avec **Swagger**, directement accessible depuis http://localhost:3000/api-docs/ quand le projet est lancé.

Cette documentation sert à consulter les endpoints disponibles, leurs paramètres et les réponses attendues.


## 9. Points à retenir

- Le projet est un prototype, pas une application prête à utilisation.
- Plusieurs écrans sont déjà conçus, mais affichent des données d’exemple.
- L’authentification et plusieurs routes backend sont déjà développées.
- Certaines fonctionnalités disposent d’une interface, mais ne sont pas encore reliées aux traitements backend.
- L’import CSV, les graphiques, les exports et la modification d’un compte sont les principaux éléments manquants.
- Le développement collaboratif a été organisé autour de différentes branches Git.

## 10. Équipe

Projet réalisé dans le cadre du cours **ICT426** par :

- Nadia Abdi Mohamoud
- Marc Schilter
- Adriano Alves Morais
- Noor Kammoun
- Aleksander Johnson
- David Vilela
- Camille Anaïs Bachmann
- Julie Rossi
