# Conception des données

## PostgreSQL

PostgreSQL est la source de vérité transactionnelle du système initial.

## Identifiants

Les identifiants techniques doivent être non réutilisables. UUID est le choix recommandé pour les entités exposées ou distribuées.

## Audit

Les entités critiques doivent conserver createdAt, updatedAt et, lorsque pertinent, deletedAt ainsi que les informations d'acteur de modification.

## Soft delete

Le soft delete est prévu pour les utilisateurs, membres et autres objets dont l'historique doit rester consultable. Les événements financiers irréversibles ne doivent pas être effacés pour simuler une correction.

## Intégrité

Les contraintes PostgreSQL doivent protéger les invariants simples : unicité, références, non-nullité et contraintes de montant lorsque possible. Les invariants métier complexes restent dans le domaine.

## Migrations

Les changements de schéma doivent être versionnés et reproductibles. Aucune modification manuelle de production ne doit devenir la seule source de vérité.
