# Architecture Web

## Stack

Next.js + TypeScript + App Router.

## Organisation

Le Web suit une organisation Feature-First. Les fonctionnalités métier ne doivent pas être mélangées aux composants purement visuels.

```text
apps/web/
├── app/
├── features/
├── components/
├── lib/
├── hooks/
├── providers/
├── styles/
└── public/
```

## Principes

- Les appels API passent par une couche cliente dédiée.
- Les types de contrat peuvent provenir de `packages/types`.
- Les permissions reçues du backend déterminent les actions visibles, mais le backend reste l'autorité.
- Les écrans doivent privilégier la simplicité et la rapidité pour les usages sur connexion mobile.
- Les états de chargement, erreur et absence de données doivent être explicitement gérés.
