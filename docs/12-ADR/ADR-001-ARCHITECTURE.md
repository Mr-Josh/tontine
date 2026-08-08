# ADR-001 — Architecture multi-tiers avec trajectoire microservices

- **Statut** : Accepté pour la phase initiale
- **Date** : 2026-08-08

## Contexte

Tontine doit servir plusieurs clients, conserver des données financières et évoluer vers des services indépendants si la complexité ou la charge le justifie.

## Décision

Nous adoptons une architecture multi-tiers dans un monorepo pnpm. Le backend NestJS reste organisé par domaines et frontières explicites. La distribution en microservices est une trajectoire, pas une obligation immédiate.

## Conséquences

- Développement local plus simple.
- Contrats et interfaces préparés dès le début.
- Extraction future d'un domaine possible sans réécriture complète.
- Événements et idempotence doivent être prévus pour les opérations asynchrones.
- La base initiale peut rester transactionnelle et centralisée avant extraction.
