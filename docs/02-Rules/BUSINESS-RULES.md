# Registre initial des règles métier

> Référentiel de conception v0.1. Ces règles consolident les décisions déjà prises et servent de base de validation. Elles ne doivent pas être considérées comme définitives sans validation métier.

## A. Groupes et organisations

BR-001 — Un utilisateur peut appartenir à plusieurs groupes.
BR-002 — Un groupe possède un identifiant unique.
BR-003 — Un groupe possède un nom obligatoire.
BR-004 — Un groupe possède un administrateur ou président responsable.
BR-005 — Un groupe peut être actif, suspendu, clôturé ou archivé.
BR-006 — Un groupe possède une devise de référence.
BR-007 — La devise par défaut du périmètre initial est le FCFA.
BR-008 — Un groupe possède une politique de cotisation.
BR-009 — Un groupe possède une périodicité de cotisation.
BR-010 — Une périodicité peut être journalière, hebdomadaire ou mensuelle.
BR-011 — Les paramètres financiers d'un groupe sont versionnables lorsque nécessaire.
BR-012 — Une modification critique de configuration doit être auditée.
BR-013 — Un groupe ne doit pas être supprimé physiquement lorsqu'il contient un historique financier.
BR-014 — La suppression fonctionnelle d'un groupe utilise le soft delete lorsque la conservation est requise.
BR-015 — Un groupe clôturé reste consultable selon les permissions.

## B. Utilisateurs

BR-016 — Chaque utilisateur possède un identifiant unique.
BR-017 — Une adresse e-mail ne peut pas être associée à plusieurs comptes actifs selon la politique d'identité retenue.
BR-018 — Un utilisateur peut être actif, suspendu, désactivé ou supprimé logiquement.
BR-019 — La suppression logique ne doit pas effacer l'historique financier.
BR-020 — Les données sensibles d'un utilisateur doivent être protégées.
BR-021 — Un utilisateur doit accepter les conditions applicables avant l'utilisation des fonctions concernées.
BR-022 — Un utilisateur doit pouvoir consulter ses propres informations autorisées.
BR-023 — Un utilisateur ne peut modifier que les données pour lesquelles il possède une permission.
BR-024 — Toute modification sensible du profil doit être auditée.
BR-025 — Un compte désactivé ne peut pas effectuer une nouvelle opération financière.
BR-026 — Un compte désactivé peut rester référencé dans l'historique.
BR-027 — Les identifiants techniques ne doivent pas être réutilisés.
BR-028 — Les dates de création et de modification doivent être conservées.
BR-029 — Les suppressions logiques doivent conserver leur date et leur auteur lorsque disponible.
BR-030 — Un utilisateur peut quitter un groupe sans perdre son historique dans ce groupe.

## C. Rôles et permissions

BR-031 — Le rôle Membre est le rôle fonctionnel de base.
BR-032 — Le rôle Président/Admin gère la configuration autorisée du groupe.
BR-033 — Le rôle Trésorier gère les opérations financières autorisées.
BR-034 — Le rôle Comptable accède aux fonctions de contrôle et de consolidation autorisées.
BR-035 — Le rôle Secrétaire accède aux fonctions administratives autorisées.
BR-036 — Le rôle Censeur est optionnel.
BR-037 — Une permission doit être vérifiée côté serveur.
BR-038 — L'interface ne doit jamais être la seule barrière de sécurité.
BR-039 — Une permission peut être accordée automatiquement par une règle métier.
BR-040 — Une permission automatique doit être déterministe et auditable.
BR-041 — Le système doit éviter la multiplication inutile des rôles.
BR-042 — Une personne peut cumuler plusieurs responsabilités selon les règles du groupe.
BR-043 — Le créateur d'un groupe reçoit le rôle initial défini par la politique du produit.
BR-044 — La révocation d'un rôle doit prendre effet immédiatement selon la politique de sécurité.
BR-045 — Une action interdite doit être refusée côté API.

## D. Membres

BR-046 — Un membre appartient à un groupe via une relation explicite.
BR-047 — Une invitation peut être en attente, acceptée, refusée, expirée ou annulée.
BR-048 — Un membre accepté devient éligible aux cotisations du groupe selon sa date d'entrée.
BR-049 — Les règles d'entrée tardive doivent être configurables.
BR-050 — Un membre suspendu ne doit pas générer de nouvelle obligation si la règle du groupe l'exclut.
BR-051 — Une sortie de groupe doit conserver l'historique des cotisations.
BR-052 — Un membre peut consulter son solde et ses obligations autorisées.
BR-053 — Un membre ne peut pas consulter les données privées d'un autre membre sans permission.
BR-054 — Le nombre de membres d'un groupe doit être calculable sans supprimer les membres historiques.
BR-055 — Les changements de statut d'un membre sont auditables.

## E. Séances

BR-056 — Une séance appartient à un groupe.
BR-057 — Une séance possède une date ou période de référence.
BR-058 — Une séance peut être planifiée.
BR-059 — Une séance peut être ouverte.
BR-060 — Une séance peut être clôturée.
BR-061 — Une séance peut être annulée selon les permissions.
BR-062 — Une séance clôturée ne doit pas être modifiée librement.
BR-063 — Une modification exceptionnelle d'une séance clôturée doit être auditée.
BR-064 — Une séance doit être identifiable de manière unique dans son groupe.
BR-065 — Une séance doit pouvoir servir de source à un rapport.
BR-066 — Les données d'une séance doivent être cohérentes avec la période de cotisation.
BR-067 — Une séance peut regrouper plusieurs obligations de cotisation selon la configuration.
BR-068 — La clôture d'une séance déclenche les traitements prévus par le workflow.
BR-069 — La clôture doit être idempotente.
BR-070 — Une séance annulée ne doit pas être comptabilisée comme séance financière normale.

## F. Cotisations

BR-071 — Une cotisation est rattachée à un groupe.
BR-072 — Une cotisation est rattachée à un membre.
BR-073 — Une cotisation possède une échéance.
BR-074 — Une cotisation possède un montant attendu.
BR-075 — Une cotisation possède un état.
BR-076 — Les états minimaux sont attendue, payée, partielle, en retard et annulée.
BR-077 — Une cotisation payée doit référencer un ou plusieurs événements financiers selon le modèle retenu.
BR-078 — Le montant payé ne doit pas être supérieur au montant autorisé sans règle explicite d'excédent.
BR-079 — Une cotisation partiellement payée reste ouverte jusqu'à satisfaction de la règle de paiement.
BR-080 — Une cotisation arrivée à échéance sans paiement devient en retard selon la timezone du groupe.
BR-081 — Les règles de grâce doivent être configurables.
BR-082 — Les pénalités doivent être explicites et auditables.
BR-083 — Une pénalité ne doit pas être appliquée deux fois pour le même événement.
BR-084 — Une cotisation annulée ne doit pas produire une nouvelle pénalité.
BR-085 — Une obligation doit être calculée avec la version de règle applicable à sa création.
BR-086 — Une modification future de la périodicité ne doit pas réécrire silencieusement les obligations passées.
BR-087 — Les obligations futures peuvent être recalculées selon une procédure explicite.
BR-088 — Un membre nouvellement accepté ne doit recevoir que les obligations prévues par la politique d'entrée.
BR-089 — Une cotisation doit être traçable jusqu'au groupe, membre et période.
BR-090 — Le système doit permettre de calculer le total attendu d'une période.

## G. Paiements

BR-091 — Le paiement est distinct de l'obligation de cotisation.
BR-092 — Un paiement possède un identifiant interne unique.
BR-093 — Une référence fournisseur peut être stockée lorsqu'elle existe.
BR-094 — Un paiement possède un montant et une devise.
BR-095 — Un paiement possède un statut.
BR-096 — Les statuts fournisseur doivent être normalisés dans le domaine.
BR-097 — Un paiement déclaré réussi doit être vérifié avant de solder une obligation.
BR-098 — Une confirmation fournisseur répétée doit être idempotente.
BR-099 — Une même transaction fournisseur ne doit pas être comptabilisée deux fois.
BR-100 — Un paiement échoué ne doit pas solder une cotisation.
BR-101 — Un paiement annulé ne doit pas rester considéré comme encaissé.
BR-102 — Un remboursement doit être lié au paiement d'origine.
BR-103 — Les opérations financières doivent être auditables.
BR-104 — Les secrets de paiement ne doivent jamais être stockés dans le code source.
BR-105 — Le fournisseur de paiement doit être abstrait derrière une interface métier.

## H. Automatisation

BR-106 — Les échéances doivent pouvoir être générées automatiquement.
BR-107 — Les rappels doivent pouvoir être générés automatiquement.
BR-108 — La détection des retards doit être automatisable.
BR-109 — La génération de rapport doit être automatisable.
BR-110 — Les contrôles de cohérence doivent être automatisables.
BR-111 — Une tâche automatique doit être idempotente lorsqu'elle peut être rejouée.
BR-112 — Les tâches automatiques doivent laisser une trace technique exploitable.
BR-113 — Une erreur d'automatisation ne doit pas corrompre silencieusement les données financières.
BR-114 — Les tâches longues doivent pouvoir être exécutées en arrière-plan.
BR-115 — Les opérations asynchrones importantes doivent être reprises ou signalées en cas d'échec.
BR-116 — Les notifications ne doivent pas être envoyées en double pour le même événement logique.
BR-117 — Les règles automatiques doivent respecter les permissions métier.
BR-118 — L'automatisation ne doit pas contourner les contrôles de sécurité.
BR-119 — Les opérations critiques doivent rester explicables à partir de données persistées.
BR-120 — Le système doit privilégier l'automatisation déterministe aux décisions opaques.

## I. Notifications

BR-121 — Une notification est rattachée à un utilisateur.
BR-122 — Une notification peut être liée à un groupe ou une séance.
BR-123 — Les notifications peuvent être informationnelles, de rappel, d'alerte ou transactionnelles.
BR-124 — Une notification transactionnelle doit être déclenchée par un événement métier identifiable.
BR-125 — Les notifications de paiement doivent refléter le statut réellement confirmé.
BR-126 — Les rappels d'échéance doivent respecter la configuration du groupe.
BR-127 — Un utilisateur doit pouvoir gérer ses préférences dans les limites légales et fonctionnelles.
BR-128 — Les notifications critiques peuvent être obligatoires.
BR-129 — Une notification envoyée doit conserver un statut technique.
BR-130 — Les échecs d'envoi doivent être observables.

## J. Rapports

BR-131 — Un rapport de séance est produit à partir de données de la séance.
BR-132 — La secrétaire doit pouvoir générer un rapport en sélectionnant une séance.
BR-133 — Le rapport doit inclure les informations autorisées sur la séance.
BR-134 — Le rapport doit pouvoir présenter les membres attendus.
BR-135 — Le rapport doit pouvoir présenter les paiements reçus.
BR-136 — Le rapport doit pouvoir présenter les montants restants.
BR-137 — Le rapport doit pouvoir présenter les retards selon les permissions.
BR-138 — La génération d'un même rapport doit être idempotente ou versionnée.
BR-139 — Un rapport doit indiquer sa période et son groupe.
BR-140 — Un rapport généré doit pouvoir être archivé.
BR-141 — Un rapport historique ne doit pas être modifié silencieusement.
BR-142 — Une régénération doit produire une version identifiable si le système conserve les versions.
BR-143 — Les données privées doivent être filtrées selon les permissions du demandeur.
BR-144 — L'export doit respecter les droits d'accès.
BR-145 — La génération de rapport doit être traçable.

## K. Comptabilité et trésorerie

BR-146 — Les opérations financières doivent être distinguées des événements métier non financiers.
BR-147 — Les totaux affichés doivent être calculés à partir de données cohérentes.
BR-148 — Une écriture financière corrigée doit conserver l'historique de la correction.
BR-149 — Une correction ne doit pas supprimer la trace de l'état précédent.
BR-150 — Les agrégats financiers doivent pouvoir être recalculés.
BR-151 — Les arrondis monétaires doivent suivre une règle explicite.
BR-152 — Les montants doivent être stockés avec une précision adaptée à la devise.
BR-153 — La devise doit être connue avant l'enregistrement d'une opération financière.
BR-154 — Les données financières doivent être protégées contre les modifications non autorisées.
BR-155 — Le trésorier ne peut exécuter que les opérations permises par le groupe.
BR-156 — Le comptable peut contrôler les données qui lui sont autorisées.
BR-157 — Les divergences détectées doivent pouvoir être signalées.
BR-158 — Une clôture financière doit empêcher les modifications ordinaires après clôture.
BR-159 — Une correction post-clôture doit être explicitement autorisée.
BR-160 — Les opérations post-clôture doivent être auditables.

## L. Audit et soft delete

BR-161 — Les entités critiques doivent disposer d'un mécanisme d'audit.
BR-162 — L'audit doit identifier l'action lorsque cette information est disponible.
BR-163 — L'audit doit identifier la date de l'action.
BR-164 — L'audit doit identifier l'acteur lorsque cela est possible.
BR-165 — Les suppressions logiques doivent conserver l'enregistrement original.
BR-166 — Un enregistrement supprimé logiquement ne doit pas apparaître dans les listes ordinaires.
BR-167 — Une requête d'administration autorisée peut consulter les éléments supprimés.
BR-168 — La restauration doit être une action contrôlée.
BR-169 — Une restauration doit être auditée.
BR-170 — Le soft delete ne doit pas être appliqué aveuglément aux événements financiers irréversibles.
BR-171 — Les références historiques doivent rester valides après suppression logique.
BR-172 — L'audit ne doit pas être supprimé avec l'objet audité.
BR-173 — Les données d'audit doivent être protégées contre les modifications ordinaires.
BR-174 — Une suppression physique exceptionnelle doit être explicitement justifiée.
BR-175 — Les obligations légales de conservation priment sur les préférences applicatives.

## M. API et intégrité

BR-176 — Les clients Web et Mobile utilisent des contrats API explicites.
BR-177 — Les contrats d'API doivent être versionnables.
BR-178 — Une validation serveur est obligatoire pour les entrées externes.
BR-179 — Les erreurs API doivent suivre un format cohérent.
BR-180 — Les endpoints sensibles doivent exiger une authentification.
BR-181 — Les endpoints sensibles doivent exiger une autorisation.
BR-182 — Les opérations répétables doivent utiliser l'idempotence lorsqu'un double traitement est dangereux.
BR-183 — Les interfaces inter-services doivent être explicites.
BR-184 — Un service ne doit pas accéder directement aux tables d'un autre service dans une future architecture microservices.
BR-185 — Les événements inter-services doivent posséder un contrat versionné.
BR-186 — Les événements critiques doivent pouvoir être corrélés à une opération source.
BR-187 — Les transactions locales doivent rester atomiques dans les limites de la base concernée.
BR-188 — Les opérations distribuées ne doivent pas supposer une transaction SQL globale.
BR-189 — Les traitements asynchrones doivent tolérer les retries.
BR-190 — Les données provenant d'un fournisseur externe doivent être considérées comme non fiables jusqu'à validation.

## N. Sécurité et gouvernance

BR-191 — Les secrets doivent être fournis par l'environnement et non committés.
BR-192 — Les mots de passe ne doivent jamais être stockés en clair.
BR-193 — Les tokens doivent avoir une durée de vie et une politique de révocation adaptées.
BR-194 — Les journaux ne doivent pas exposer de secrets ou de données sensibles inutiles.
BR-195 — Les opérations administratives doivent être auditables.
BR-196 — Les permissions doivent être vérifiées côté serveur.
BR-197 — Les contrôles d'accès doivent suivre le principe du moindre privilège.
BR-198 — Les changements d'architecture importants doivent être documentés dans un ADR.
BR-199 — Une modification métier importante doit mettre à jour la documentation correspondante.
BR-200 — Aucune règle métier critique ne doit être introduite uniquement dans l'interface sans équivalent vérifiable côté backend.
