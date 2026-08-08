# ADR-002 — ORM PostgreSQL

- **Statut** : Proposition à valider avant implémentation de la persistance
- **Date** : 2026-08-08

## Options

### TypeORM

Avantages : intégration naturelle avec NestJS, repositories, entities, migrations et familiarité avec l'écosystème.

Risques : abstraction importante et risque de logique de persistance dispersée si les frontières sont mal définies.

### Drizzle

Avantages : approche SQL-first, typage fort et contrôle fin des requêtes.

Risques : davantage de décisions d'architecture à prendre pour structurer les repositories et les domaines complexes.

## Proposition

Commencer avec **TypeORM** si l'objectif prioritaire est l'intégration NestJS et une équipe réduite. Encapsuler systématiquement l'ORM derrière des repositories afin de conserver la possibilité de changer de technologie.

Cette décision doit être réévaluée avant la première version de production si les besoins SQL-first ou de performance justifient Drizzle.
