# Tontine

Plateforme numérique de gestion des tontines, réunions, associations et petits groupes de cotisation.

## Vision

Tontine permet à un groupe d'organiser des cotisations journalières, hebdomadaires ou mensuelles à distance, avec suivi des membres, séances, paiements, rapports, rôles et historique des opérations.

L'objectif est de réduire les déplacements, les retards, les oublis et les erreurs de gestion tout en conservant une traçabilité complète.

## Architecture cible

Le projet démarre comme un monorepo pnpm multi-applications avec une architecture multi-tiers et des frontières de services explicites. La conception doit permettre une évolution progressive vers des microservices indépendants communiquant par des interfaces et événements bien définis.

```text
tontine/
├── apps/
│   ├── web/                 # Next.js
│   └── mobile/              # React Native / Expo
├── services/
│   └── backend/             # NestJS - API et orchestration métier
├── packages/
│   ├── ui/                  # composants partagés
│   ├── types/               # contrats TypeScript partagés
│   ├── config/              # configurations partagées
│   ├── utils/               # utilitaires partagés
│   ├── eslint-config/       # règles ESLint partagées
│   └── tsconfig/            # configurations TypeScript partagées
├── infrastructure/          # Docker, PostgreSQL, Redis, reverse proxy, scripts
├── docs/                    # spécifications et architecture
└── tests/                   # tests transverses
```

## Stack initiale

| Domaine | Choix |
|---|---|
| Web | Next.js + TypeScript |
| Mobile | React Native + Expo |
| Backend | NestJS + TypeScript |
| Base de données | PostgreSQL |
| Cache / événements techniques | Redis |
| Paiements | couche d'abstraction fournisseur, intégration initiale à confirmer |
| Monorepo | pnpm + Turborepo |
| Architecture | multi-tiers, modularité forte, migration microservices préparée |

Rust pour les composants de paiement reste une option d'évolution. Il ne doit pas être introduit uniquement pour des raisons de performance supposée : la décision sera documentée dans un ADR lorsque le périmètre de paiement sera stabilisé.

## Principes métier

- Les cotisations peuvent être journalières, hebdomadaires ou mensuelles.
- Les utilisateurs sont des particuliers organisés en groupes, réunions ou associations.
- Les rôles principaux sont membre, président/administrateur, trésorier, comptable et secrétaire.
- Le censeur peut être représenté par des permissions automatiques lorsque son intervention humaine n'est pas nécessaire.
- La secrétaire doit pouvoir générer un rapport en sélectionnant simplement une séance.
- Les tâches répétitives doivent être automatisées autant que possible.
- Les données importantes doivent rester traçables.
- Les suppressions fonctionnelles utilisent le soft delete ; l'historique ne doit pas disparaître à cause d'une suppression utilisateur.
- Les permissions sont déterminées par rôle et, lorsque possible, par règles métier automatiques.

## Commandes

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm typecheck
```

## Documentation

La documentation de conception est organisée par tomes dans `docs/`. Le point d'entrée documentaire est `docs/INDEX.md`.

## Statut

Phase actuelle : fondations du monorepo et formalisation de l'architecture. Aucune fonctionnalité métier ne doit être considérée comme définitive tant que les ADR et règles métier correspondants ne sont pas validés.
