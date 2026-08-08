# Roadmap

## Phase 0 — Fondations

- [x] Dépôt GitHub de référence `Mr-Josh/tontine`
- [x] Monorepo pnpm
- [x] Turborepo
- [x] Documentation initiale
- [x] 200 règles métier initiales
- [x] Architecture et ADR de base
- [x] Stack locale PostgreSQL / Redis / Mailpit
- [ ] Harmoniser les projets Web, Mobile et Backend du workspace
- [ ] Lockfile et builds reproductibles
- [ ] Qualité de code partagée

## Phase 1 — Core backend

- [ ] Configuration
- [ ] Database
- [ ] Logger
- [ ] Health checks
- [ ] Audit
- [ ] Authentification
- [ ] Autorisation

## Phase 2 — Métier MVP

- [ ] Groupes
- [ ] Membres
- [ ] Séances
- [ ] Cotisations
- [ ] Paiements
- [ ] Notifications
- [ ] Rapports

## Phase 3 — Robustesse

- [ ] Jobs asynchrones
- [ ] Idempotence complète des paiements
- [ ] Observabilité
- [ ] Tests d'intégration
- [ ] Tests end-to-end
- [ ] CI/CD

## Phase 4 — Évolution

- [ ] Extraction des domaines nécessitant une indépendance réelle
- [ ] Contrats inter-services
- [ ] Broker d'événements si nécessaire
- [ ] Services indépendants selon les besoins de charge et d'ownership
