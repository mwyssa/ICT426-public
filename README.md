# ICT426-GestionBudget

## Branches

- *Main* : Dernière version stable
- *Dev* : Mise en commun globale
    - *Front/Back/database* : Mise en commun spécifique
        - *feature* : Travail sur une feature spécifique
            - *Part* : Partie de la feature (si nécessaire)
        - feature frontend 1
        - feature backend 1
- *Branche personnelle* : Pour le travail individuel de chacun

## Database

Contient:
- La structure de la base
- Des données fictives

Permet dans un premier temps d'avoir des données en local chacun sur son client pour le développement et les tests. Dans un deuxième temps, devra être migrée selon les consignes (à voir selon la difficulté et le temps à disposition).

## Technologies utilisées

### Frontend

### Backend

- Node.js

### Database

- SQL

# Lancer le frontend

Une fois le projet récupéré sur votre poste, ouvrez un terminal dans le dossier racine du projet (celui qui contient `package.json`).

## Installer les dépendances

À exécuter une seule fois :

```bash
npm install
```

## Démarrer le serveur de développement

```bash
npm run dev
```

Vous devriez voir un message similaire :

```text
VITE vX.X.X ready in XXX ms

➜ Local: http://localhost:5173/
```

Ouvrez l'adresse indiquée dans votre navigateur.

## Arrêter le serveur

Dans le terminal :

```text
Ctrl + C
```

# Lancer le backend

Une fois le projet récupéré sur votre poste, ouvrez un terminal dans le dossier racine du projet (celui qui contient `package.json`).

## Installer les dépendances

À exécuter une seule fois :

```bash
npm install express mysql2 bcrypt jsonwebtoken dotenv cors
```

Si vous avez un script à valider :

```bash
npm approve-scripts bcrypt@6.0.0
```

## Démarrer le serveur de développement

```bash
npm run dev:server
```

Vous devriez voir un message similaire :

```text
Connexion MySQL réussie.
API disponible sur http://localhost:3000
```

Ouvrez l'adresse indiquée dans votre navigateur.

## Arrêter le serveur

Dans le terminal :

```text
Ctrl + C
```