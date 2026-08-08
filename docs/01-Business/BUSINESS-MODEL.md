# Modèle métier

## Groupe

Un groupe est l'espace fonctionnel principal. Il possède des membres, des règles de cotisation, des séances, des responsables et un historique.

## Séance

Une séance représente une occurrence de réunion ou de cotisation. Elle peut être planifiée, ouverte, clôturée, annulée ou archivée selon les règles métier.

## Cotisation

Une cotisation est une obligation financière rattachée à un membre et à une échéance. Son état doit permettre de distinguer au minimum : attendue, en attente de paiement, payée, partielle, en retard, annulée et remboursée lorsque le métier le permet.

## Paiement

Le paiement est un objet financier distinct de l'obligation de cotisation. Une cotisation peut être associée à un ou plusieurs événements de paiement selon les règles du fournisseur et du métier.

## Rapport

Un rapport de séance est généré à partir des données persistées. La génération doit être idempotente ou versionnée afin de ne pas produire des incohérences lorsqu'elle est répétée.

## Automatisation

Le système doit préférer les règles calculables : échéances, notifications, retards, synthèses et contrôles de cohérence.

## Permissions

Les rôles donnent un ensemble initial de capacités. Des règles contextuelles peuvent ajouter ou retirer une capacité sans multiplier inutilement les rôles humains.
