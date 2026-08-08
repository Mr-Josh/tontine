# DevOps

## Développement local

Le workspace est géré par pnpm et Turborepo. PostgreSQL, Redis et Mailpit sont fournis par la stack Compose.

```bash
pnpm install
cd infrastructure/docker
cp .env.example .env
docker compose up -d
```

## CI/CD cible

- installation déterministe via lockfile ;
- lint ;
- typecheck ;
- tests unitaires et intégration ;
- build des applications ;
- analyse de sécurité des dépendances ;
- déploiement après validation.

## Règle

Une commande qui fonctionne localement doit être reproductible dans CI autant que possible.
