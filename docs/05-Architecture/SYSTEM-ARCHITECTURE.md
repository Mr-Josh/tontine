# Architecture système

## 1. Architecture de départ

Tontine démarre avec un monorepo et plusieurs applications/services. L'objectif est une séparation nette des responsabilités plutôt qu'un microservice distribué prématuré.

```text
                 ┌──────────────────────┐
                 │       Web            │
                 │ Next.js              │
                 └──────────┬───────────┘
                            │
                 ┌──────────▼───────────┐
                 │       Mobile         │
                 │ React Native / Expo  │
                 └──────────┬───────────┘
                            │ HTTPS
                            ▼
                 ┌──────────────────────┐
                 │      API Backend     │
                 │       NestJS         │
                 └──────┬───────┬───────┘
                        │       │
                ┌───────▼──┐ ┌──▼────────┐
                │PostgreSQL│ │   Redis   │
                └──────────┘ └───────────┘
```

## 2. Multi-tiers

Les couches principales sont : présentation, application, domaine et infrastructure.

Le contrôleur HTTP ne doit pas contenir de logique métier. Les cas d'utilisation orchestrent le métier, les repositories abstraient la persistance et les adaptateurs d'infrastructure encapsulent les fournisseurs externes.

## 3. Trajectoire microservices

Le système est conçu pour permettre une extraction future des domaines suivants : auth/identity, users/members, groups/meetings, contributions, payments, notifications et reporting.

Un domaine ne devient un microservice que lorsque l'indépendance apporte un bénéfice réel : charge, cycle de déploiement, ownership, isolation ou résilience.

## 4. Communication

Les frontières doivent être exprimées par des interfaces et contrats versionnés. Les événements sont utilisés pour les traitements asynchrones et la propagation de faits métier. Un service futur ne doit pas lire directement la base d'un autre service.

## 5. Données

PostgreSQL est la source de vérité transactionnelle initiale. Redis est réservé au cache, à la coordination et aux traitements techniques nécessitant une structure adaptée.

## 6. Paiement

Le domaine de paiement doit dépendre d'une abstraction interne et non directement d'un fournisseur. Les détails de Monetbil, MTN MoMo, Orange Money ou autre fournisseur doivent rester dans des adaptateurs.

## 7. Résilience

Les opérations critiques doivent être idempotentes. Les traitements asynchrones doivent supporter les retries. Les erreurs externes ne doivent pas laisser une cotisation comme payée sans confirmation fiable.
