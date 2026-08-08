# Project Charter — Tontine

## 1. Problème

Les tontines et réunions locales reposent encore souvent sur des rencontres physiques, des carnets, des messages dispersés et des calculs manuels. Cela crée des retards, des oublis, des erreurs de calcul et une visibilité limitée sur les opérations.

## 2. Vision

Fournir une plateforme simple et fiable permettant à un groupe de gérer ses séances, membres, cotisations, paiements, responsabilités et rapports à distance.

## 3. Objectifs

1. Permettre la création et la gestion d'un groupe.
2. Définir une périodicité de cotisation : journalière, hebdomadaire ou mensuelle.
3. Automatiser les échéances et rappels.
4. Permettre le paiement à distance.
5. Calculer automatiquement les montants attendus, reçus et restants.
6. Conserver l'historique des opérations.
7. Générer les rapports de séance automatiquement.
8. Appliquer les permissions par rôle et par règle métier.
9. Préparer une évolution vers des services indépendants.

## 4. Utilisateurs et responsabilités

- **Membre** : consulte ses obligations, effectue ses cotisations et consulte son historique.
- **Président / Administrateur** : configure le groupe, ses règles et ses responsables.
- **Trésorier** : suit les entrées et sorties financières selon les permissions qui lui sont accordées.
- **Comptable** : contrôle et consolide les données comptables.
- **Secrétaire** : gère les éléments administratifs et génère les rapports.
- **Censeur** : rôle optionnel ; plusieurs contrôles peuvent être automatisés par l'application.

## 5. Automatisation

L'application doit privilégier les traitements déterministes et auditables : calcul des échéances, rappels, détection des retards, consolidation de séance, génération de rapports et attribution de permissions.

## 6. Traçabilité

Les opérations importantes doivent être historisées. La suppression d'un utilisateur ou d'une donnée métier importante doit être logique lorsque la conservation de l'historique est requise.

## 7. Hors périmètre initial

- Microservices distribués dès le premier jour.
- Blockchain ou crypto-paiement.
- Complexité financière non nécessaire au MVP.
- Automatisation opaque impossible à auditer.

## 8. Critère de réussite

Un groupe doit pouvoir être créé, ses membres invités, une séance configurée, une cotisation exigée et payée, puis un rapport complet généré avec un minimum d'intervention manuelle.
