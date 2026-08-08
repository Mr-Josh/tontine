# Architecture Mobile

## Stack

React Native avec Expo et TypeScript.

## Organisation

```text
apps/mobile/
├── app/
├── features/
├── components/
├── services/
├── hooks/
├── providers/
├── store/
└── utils/
```

Le mobile consomme les mêmes contrats API que le Web. Les opérations sensibles sont exécutées par le backend.

L'application doit tenir compte des connexions instables et du coût des données : cache, pagination, reprise réseau et files locales peuvent être introduits lorsque les fonctionnalités l'exigent.
