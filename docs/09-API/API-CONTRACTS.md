# Contrats API

## Principes

1. Les endpoints sont versionnables.
2. Les entrées sont validées côté serveur.
3. Les réponses utilisent une structure cohérente.
4. Les erreurs exposent un code stable et un message sûr.
5. Les opérations sensibles supportent l'idempotence.
6. Les permissions sont vérifiées côté backend.
7. Les contrats inter-services futurs seront indépendants des implémentations internes.

## Évolution

Les contrats doivent être documentés avant qu'une fonctionnalité critique soit considérée comme stable. OpenAPI sera la source technique de référence pour l'API HTTP du backend.
