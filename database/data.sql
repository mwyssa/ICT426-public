-- =====================================================
-- Données pour le projet (fictives)
-- Adaptées au nouveau schéma
-- =====================================================

USE `BudgetManagement`;

-- =====================================================
-- Données pour la table des familles
-- =====================================================

INSERT INTO `Families` (`name`) VALUES
    ("Bachmann"),
    ("Bros"),
    ("Solo");

-- =====================================================
-- Données pour la table des utilisateurs
-- mdp hash en bcrypt avec sel "password"
-- =====================================================

INSERT INTO `Users`
(`name`, `hash`, `mail`, `role`, `family_id`)
VALUES
    ("Camille",
     "$2b$12$JiyYstl5gJd22W7Ba89iueRtb74gz7HrgRSQ0TopYQd6XpglfcXwC",
     "camille.bachmann@eduvaud.ch",
     "admin",
     1),

    ("Timothée",
     "$2b$12$JiyYstl5gJd22W7Ba89iueRtb74gz7HrgRSQ0TopYQd6XpglfcXwC",
     "timothee.bachmann@eduvaud.ch",
     "user",
     1),

    ("Fabien",
     "$2b$12$JiyYstl5gJd22W7Ba89iueRtb74gz7HrgRSQ0TopYQd6XpglfcXwC",
     "fabien.bachmann@eduvaud.ch",
     "user",
     1),

    ("Elisabeth",
     "$2b$12$JiyYstl5gJd22W7Ba89iueRtb74gz7HrgRSQ0TopYQd6XpglfcXwC",
     "elisabeth.bachmann@eduvaud.ch",
     "user",
     1),

    ("Mario",
     "$2b$12$JiyYstl5gJd22W7Ba89iueRtb74gz7HrgRSQ0TopYQd6XpglfcXwC",
     "mario.bros@eduvaud.ch",
     "admin",
     2),

    ("Luigi",
     "$2b$12$JiyYstl5gJd22W7Ba89iueRtb74gz7HrgRSQ0TopYQd6XpglfcXwC",
     "luigi.bros@eduvaud.ch",
     "user",
     2),

    ("Han",
     "$2b$12$JiyYstl5gJd22W7Ba89iueRtb74gz7HrgRSQ0TopYQd6XpglfcXwC",
     "han.solo@eduvaud.ch",
     "admin",
     3);

-- =====================================================
-- La table Type_of_accounts n'existe plus
-- =====================================================
-- Pas d'INSERT ici.

-- =====================================================
-- Données pour la table des comptes
-- =====================================================
-- Nouveau schéma :
-- Accounts (..., user_id, type)
-- =====================================================

INSERT INTO `Accounts`
(`name`, `balance`, `user_id`, `type`)
VALUES
    ("Raiffeisen Camille", 2, 1, "Compte Courant"),
    ("Raiffeisen Timothée", 4000, 2, "Compte Courant"),
    ("BCV Timothée", 10000, 2, "Compte Epargne"),
    ("Raiffeisen Fabien", 43206670, 3, "Compte Courant"),
    ("Raiffeisen Elisabeth", 6000050, 4, "Compte Epargne"),
    ("Mario's Golden Road", 10000000, 5, "Compte Courant"),
    ("Compte Intergalactique", 0, 7, "Compte Courant");

-- =====================================================
-- Données pour la table des budgets
-- =====================================================

INSERT INTO `Annual_Budgets`
(`year`, `income`, `family_id`)
VALUES
    (2026, 12000000, 1),
    (2026, 100000000, 2),
    (2037, 300, 3),
    (2048, 40000, 3);

-- =====================================================
-- Données pour la table des enveloppes
-- =====================================================

INSERT INTO `Envelopes`
(`name`, `allocatedbudget`, `spent`, `family_id`)
VALUES
    ("Vacances", 4000, 250, 1),
    ("Jeux vidéo", 200, 25, 1),
    ("Cadeaux", 500, 10, 1),
    ("Champignons", 600, 800, 2),
    ("Ectoplast-5000 upgrade", 20000, 13050, 2),
    ("Réparation du faucon", 2000, 150, 3),
    ("Salaire de Chewbacca", 5000, 0, 3);

-- =====================================================
-- Données pour la table des transactions
-- =====================================================

INSERT INTO `Transactions`
(`date`, `amount`, `description`, `envelope_id`, `account_id`)
VALUES
    ('2026-06-18', 10, 'Cadeau Tim', 3, 1),
    ('2026-07-20', 150, '', 1, 4),
    ('2026-08-17', 100, '', 1, 4),
    ('2026-03-05', 25, 'KCD2 DLC', 2, 2),
    ('2026-05-25', 800, 'Au cas où', 4, 6),
    ('2026-04-16', 13050, 'Remboursement Luigi', 5, 6),
    ('3047-10-03', 150, 'Trou dans la coque', 6, 7);