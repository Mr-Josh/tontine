# Architecture Backend

## Structure cible

```text
services/backend/
└── src/
    ├── core/
    │   ├── exceptions/
    │   ├── filters/
    │   ├── guards/
    │   ├── interceptors/
    │   ├── middlewares/
    │   ├── pipes/
    │   └── logger/
    ├── common/
    │   ├── constants/
    │   ├── enums/
    │   ├── interfaces/
    │   ├── types/
    │   └── utils/
    ├── config/
    ├── database/
    │   ├── entities/
    │   ├── migrations/
    │   ├── repositories/
    │   └── seeders/
    ├── infrastructure/
    │   ├── cache/
    │   ├── mail/
    │   ├── payment/
    │   ├── queue/
    │   ├── notification/
    │   └── storage/
    ├── shared/
    │   ├── dto/
    │   ├── events/
    │   ├── commands/
    │   └── responses/
    ├── modules/
    │   ├── auth/
    │   ├── users/
    │   ├── organizations/
    │   ├── members/
    │   ├── meetings/
    │   ├── contributions/
    │   ├── payments/
    │   ├── notifications/
    │   ├── reports/
    │   └── audit/
    ├── app.module.ts
    └── main.ts
```

## Règles de dépendance

- Controllers → application/use cases.
- Use cases → domain/interfaces.
- Domain → ne dépend pas des fournisseurs externes.
- Infrastructure → implémente les interfaces.
- Modules métier → ne doivent pas créer de dépendances circulaires.
- Les données externes sont validées avant d'entrer dans le domaine.
