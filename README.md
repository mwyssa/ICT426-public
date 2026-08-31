# ICT426-GestionBudget
## Branches
- *Main* : Dernière version stable
- *Dev* : Mise en commun globale
- *Front/Back...* : Mise en commun spécifique
  - feature frontend 1
  - feature backend 1
- *Branche personnelle* : Pour le travail individuel de chacun


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

```

Vous devriez voir un message similaire :

```text

```

Ouvrez l'adresse indiquée dans votre navigateur.

## Arrêter le serveur

Dans le terminal :

```text
Ctrl + C
```