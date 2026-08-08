# Contribuer à Tontine

## Principes

Tontine est un monorepo pnpm/Turborepo. Les changements doivent respecter les frontières entre applications, packages partagés et services.

## Environnement

- Node.js : `20.19.2`
- pnpm : `10.17.1`
- Web : Next.js
- Mobile : Expo / React Native
- Backend : NestJS
- Base de données cible : PostgreSQL
- Infrastructure locale : PostgreSQL, Redis, Mailpit et pgAdmin via Compose

## Installation

```bash
pnpm install
```

## Vérifications locales

Avant une PR :

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Conventions Git

Utiliser des messages de commit courts et explicites, idéalement selon Conventional Commits :

```text
feat: add contribution schedule
fix: prevent duplicate payment confirmation
chore: update workspace configuration
docs: clarify payment workflow
```

## Règles d'architecture

1. Les contrôleurs ne contiennent pas de logique métier complexe.
2. Les règles métier doivent être documentées dans `docs/02-Rules/`.
3. Les décisions structurantes doivent être documentées dans `docs/12-ADR/`.
4. Les dépendances entre domaines doivent passer par des interfaces, contrats ou événements explicites.
5. Les clients Web et Mobile ne doivent pas accéder directement à la base de données.
6. Les opérations critiques doivent être auditables.
7. Les suppressions fonctionnelles utilisent le soft delete lorsque la conservation de l'historique est requise.
8. Aucun secret ou fichier `.env` réel ne doit être commité.

## Pull Requests

Une PR doit expliquer :

- le problème traité ;
- la solution retenue ;
- les impacts sur l'architecture ou les règles métier ;
- les tests effectués ;
- les migrations ou variables d'environnement nécessaires.

Une modification d'une règle métier existante doit mettre à jour la documentation correspondante.
