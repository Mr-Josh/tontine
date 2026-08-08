# TSAB1 — Tontine Software Architecture & Business v1

## Purpose

TSAB1 is the master reference for the first architectural and business baseline of Tontine. It consolidates the vision, roles, automation, 200 initial business rules, architecture and evolution strategy.

## Product

Tontine digitalise les cotisations journalières, hebdomadaires et mensuelles d'un groupe, d'une association ou d'une petite réunion. Les membres peuvent effectuer leurs obligations à distance et consulter leur situation sans devoir se déplacer pour chaque séance.

## Actors

- Member
- President / Administrator
- Treasurer
- Accountant
- Secretary
- Optional Censor

## Automation principles

The product must automate recurring work wherever the result is deterministic and auditable: schedules, reminders, overdue detection, payment reconciliation, session summaries, report generation and permission rules.

The secretary's report flow is intentionally simple: choose a session, request the report, receive the generated result.

## Architecture

- Monorepo: pnpm + Turborepo.
- Web: Next.js.
- Mobile: React Native + Expo.
- Backend: NestJS.
- Database: PostgreSQL.
- Cache/technical asynchronous infrastructure: Redis.
- Payment providers behind an internal abstraction.
- Multi-tier architecture with explicit service boundaries.
- Future migration to independent microservices only where justified.

## Data governance

Important records use auditability and soft delete where historical traceability requires it. Physical deletion must never be used as a shortcut to hide a financial or administrative history.

## Documentation

See `docs/INDEX.md` for the full documentation structure and `docs/02-Rules/BUSINESS-RULES.md` for the initial 200-rule registry.

## Status

Baseline v1.0 — architecture and business foundations. Product implementation remains subject to validation of the detailed domain model, security model, payment workflows and final ORM decision.
