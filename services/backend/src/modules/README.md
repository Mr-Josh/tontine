# Modules métier

Chaque domaine métier doit être isolé dans son propre module. Exemples prévus : auth, users, organizations, members, meetings, contributions, payments, notifications, reports et audit.

Un module expose des cas d'usage et contrats explicites. Les dépendances entre domaines passent par des interfaces ou événements lorsque cela améliore le découplage.
