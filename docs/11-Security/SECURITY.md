# Sécurité

## Principes

- Authentification et autorisation côté serveur.
- Principe du moindre privilège.
- Validation systématique des entrées.
- Secrets hors dépôt.
- Journalisation sans fuite de secrets.
- Soft delete et audit pour préserver la traçabilité.
- Idempotence des opérations financières et callbacks fournisseurs.
- Vérification des signatures ou mécanismes d'authentification des fournisseurs de paiement lorsqu'ils existent.
- Protection contre les doubles traitements.
- Tests des permissions et des cas de contournement.

## Données

Les données financières et personnelles sont considérées comme sensibles. Les exports, rapports et logs doivent appliquer les mêmes contrôles d'accès que l'API.
