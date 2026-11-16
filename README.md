# Randretsa

Site vitrine de **Randretsa — Édouard Randretsa**, menuisier-ébéniste à Bordeaux, consacré au mobilier sur mesure, à la restauration du bois ancien et au dépannage.

Le site présente l’atelier, ses prestations, des réalisations illustrées et ses coordonnées. Il utilise Next.js (App Router), React, TypeScript et Tailwind CSS.

- [Dépôt GitHub](https://github.com/AndyRama/randretsa)
- [Aperçu Vercel déclaré pour le projet](https://randretsa.vercel.app)

> **État du projet :** le formulaire de devis est une interface sans envoi ni stockage serveur. Des coordonnées, contenus et informations légales restent à confirmer. Les visuels avant/après sont des composites statiques, pas des comparateurs interactifs. L’aperçu déclaré ne constitue pas une vérification du déploiement ni une validation de mise en production.

## Fonctionnalités présentes

- Accueil, présentation de l’atelier, pages sur mesure et rénovation, réalisations et contact.
- Pages dédiées aux portes, volets, fenêtres, meubles, placards et dépannage, avec textes de prestations, FAQ, extraits d’avis et liens associés.
- Navigation responsive avec menu mobile, coordonnées et carte Google Maps intégrée.
- Onglets de sélection de chantiers et visuels avant/après statiques : les deux photos originales nécessaires à un vrai curseur ne sont pas disponibles.
- Métadonnées de pages, partage Open Graph et Twitter, langue française et couleur de thème.
- Favicon navigateur, icône PNG et icône Apple selon les conventions de fichiers Next.js.

Les avis, la note et le nombre d’avis sont enregistrés dans les sources, sans synchronisation automatique avec Google ni vérification indépendante récente. Le lien Google central reste à renseigner ; les pages de prestations disposent aussi d’un lien de recherche Google Maps.

## Stack et prérequis

- **Next.js 16.4.6**, **React et React DOM 19.3.1**, versions résolues dans [package-lock.json](package-lock.json).
- **TypeScript 7.0.2** et **Tailwind CSS 3.4.19**, avec PostCSS et Autoprefixer.
- Fraunces et Work Sans variables via les paquets Fontsource importés dans [app/layout.tsx](app/layout.tsx) : fichiers intégrés à l’application et servis localement, sans téléchargement Google Fonts prévu par ces imports. Le paquet Inter est déclaré, mais n’est pas importé par ce layout.
- npm et Node.js satisfaisant la contrainte **`>=20.9.0`** de la version Next.js verrouillée. Privilégier une version LTS maintenue compatible ; la version de `@types/node` n’est pas une exigence de runtime.

Le dépôt ne fixe pas de version Node.js dans un fichier `.nvmrc` ou `.node-version`. Conserver le lockfile et utiliser `npm ci` pour installer les dépendances verrouillées.

## Installation et développement

```bash
git clone https://github.com/AndyRama/randretsa.git
cd randretsa
npm ci
npm run dev
```

Le serveur de développement utilise `http://localhost:3000` par défaut.

La seule variable d’environnement lue dans les sources applicatives est **`NEXT_PUBLIC_SITE_URL`**. Elle définit la base des URLs de métadonnées ; sans configuration, le code retombe sur l’adresse locale de développement. Définir une origine cohérente avec l’environnement publié. Le layout ne déclare pas de lien canonique explicite et le dépôt ne fournit actuellement ni sitemap ni fichier robots dédiés : la base des métadonnées ne les remplace pas.

Aucune base de données ni clé de fournisseur d’e-mail n’est utilisée par le fonctionnement actuel. Les coordonnées sont dans [lib/site.ts](lib/site.ts). [next.config.ts](next.config.ts) contient une origine réseau autorisée pour le développement ; ce réglage ne configure pas le domaine de production.

## Tests et build

Depuis la racine du dépôt, après installation des dépendances :

```bash
# Tests Node.js, avec compilation TS/TSX et rendu React pour les prestations
node --test --test-concurrency=1 tests/*.test.cjs

# Construction de production
npm run build

# Démarrage du build précédemment généré
npm run start
```

Les scripts npm déclarés sont `dev`, `build`, `start` et `lint`. Aucun script `test` n’est défini. **Le script `lint` pointe vers `next lint`, commande supprimée dans Next.js 16 : il est incohérent avec la version verrouillée et ne constitue pas une commande de contrôle utilisable en l’état.** Cette documentation ne modifie pas les scripts.

Les tests de [tests](tests) contrôlent notamment les contenus des prestations, les FAQ, les métadonnées, les destinations, les images statiques, la préservation de sources et la structure des icônes. Ils s’appuient sur [tests/fixtures](tests/fixtures) et le compilateur SWC de Next.js.

**Limite existante à connaître :** un test de préservation dans [tests/services.test.cjs](tests/services.test.cjs) attend une ancienne forme exacte du README. Une refonte documentaire invalide cette assertion, indépendamment du comportement de l’application. Ce test fait aussi référence à un commit historique ; son exécution suppose que cet objet Git soit disponible. Ne pas interpréter ces contraintes comme une validation ou une régression fonctionnelle du site.

Ces commandes n’envoient pas de formulaire, ne migrent pas de base et ne déploient pas l’application. Un build réussi ne garantit ni conformité juridique, ni référencement, ni recette complète du site en ligne.

## Pages principales

- `/` : accueil.
- `/sur-mesure` : mobilier sur mesure, prestations et FAQ associées.
- `/renovation` : présentation de la rénovation, avec ancres `portes`, `volets`, `fenetres` et `depannage`.
- `/portes` : restauration et réparation de portes.
- `/volets` : restauration de volets.
- `/fenetres` : réparation de fenêtres.
- `/meubles` : meubles sur mesure.
- `/placards` : placards et rangements.
- `/depannage` : dépannage et interventions sur les menuiseries.
- `/realisations` : aperçus de réalisations et visuels avant/après.
- `/a-propos` : présentation d’Édouard et de l’atelier.
- `/contact` : coordonnées, carte, FAQ et formulaire sans envoi.
- `/mentions-legales` : mentions légales à compléter.
- `/confidentialite` : politique de confidentialité à mettre en cohérence avec les traitements réels.

Les routes de prestations sont des pages explicites sous `app/`, alimentées par des données partagées, et non une route dynamique `[slug]`. Les pages légales ne déclarent pas actuellement de consigne `noindex` spécifique.

## Organisation du code

```text
app/                 Routes, métadonnées, styles globaux et icônes Next.js
components/          Navigation, logo, formulaire, FAQ et sections réutilisables
lib/                 Coordonnées, navigation, contenus et données des prestations
docs/                Provenance des textes et limites des visuels
public/images/       Photographies et composites d’illustration
tests/               Tests Node.js et fixtures de référence
tailwind.config.ts   Palette et familles typographiques
```

### Modifier les contenus

- **Téléphone, adresse, horaires, note, navigation, e-mail et lien Google :** [lib/site.ts](lib/site.ts). L’e-mail et `googleUrl` restent à renseigner ; `phoneHref` contient des caractères masqués et doit être corrigé avant publication.
- **Services généraux, étapes, avis, chantiers avant/après, zones et questions historiques :** [lib/content.ts](lib/content.ts).
- **Textes détaillés, réponses des FAQ et liens des prestations :** [lib/services.ts](lib/services.ts), rendus par [components/ServicePage.tsx](components/ServicePage.tsx).
- **En-tête, pied de page et sections :** [components](components) ; **palette :** [tailwind.config.ts](tailwind.config.ts) ; **styles globaux :** [app/globals.css](app/globals.css).
- **Formulaire de devis :** [components/DevisForm.tsx](components/DevisForm.tsx).
- **Images :** [public/images](public/images) ; **sélection de chantiers :** [components/ChantiersTabs.tsx](components/ChantiersTabs.tsx).
- **Documents légaux :** [mentions légales](app/mentions-legales/page.tsx) et [confidentialité](app/confidentialite/page.tsx).

[docs/service-sources.md](docs/service-sources.md) distingue les textes visibles dans les captures fournies, les réponses de FAQ rédigées à partir de ces informations et les limites des illustrations. Les réponses actuelles de `lib/services.ts` sont des rédactions éditoriales, pas des transcriptions d’accordéons ouverts. Les anciens appels ne fournissant que des questions affichent une invitation générique à contacter l’atelier ; la constante historique `[Réponse à compléter]` ne décrit donc pas à elle seule le rendu actuel.

La page Rénovation a été reconstituée sans capture dédiée. Les options du sélecteur « Type de besoin » sont également à confirmer, ainsi que les zones encore signalées comme incomplètes. Conserver les textes commerciaux substantiels et vérifier les formulations moins lisibles des captures, notamment la question sur les portes d’immeuble et la copropriété signalée dans le document de provenance.

Les images proviennent de captures et sont de définition limitée. Les composites avant/après intègrent déjà libellés et poignée : ils ne peuvent pas devenir un vrai curseur sans deux originaux distincts. Le hero est un visuel de remplacement, la capture initiale comportant du texte incrusté. Remplacer ces illustrations par des sources adaptées et autorisées, sans les présenter comme des preuves photographiques de chantiers vérifiés.

Le logo est dessiné en SVG dans [components/Logo.tsx](components/Logo.tsx), accompagné du nom et de la signature de l’atelier. [app/favicon.ico](app/favicon.ico), [app/icon.png](app/icon.png) et [app/apple-icon.png](app/apple-icon.png) utilisent les conventions automatiques de Next.js : favicon navigateur, icône générale et icône Apple. Les modifier séparément du composant de logo si l’identité évolue.

## Formulaire : fonctionnement actuel

[components/DevisForm.tsx](components/DevisForm.tsx) intercepte la soumission avec `preventDefault()` et n’exécute aucun envoi. Il affiche des champs nom, téléphone, e-mail facultatif, type de besoin, description, photos et consentement à être recontacté.

- Aucun e-mail ni dossier de demande n’est créé ; aucun route handler d’envoi ou stockage privé n’est implémenté.
- Les photos sélectionnées restent dans le navigateur : pas de téléversement ni de stockage serveur.
- Le texte annonce jusqu’à cinq photos, mais aucune limite de nombre ou de taille n’est appliquée dans le composant.
- Le formulaire utilise `noValidate` : les attributs `required` ne suffisent pas à garantir la validation lors de la soumission actuelle.
- Les mentions de confidentialité, de réponse rapide et le bouton « Envoyer » ne prouvent pas l’existence d’un traitement opérationnel.

Le commentaire de développement prévoit react-hook-form, Zod, un route handler, Brevo ou SMTP et un stockage privé des photos. Ce sont des pistes, pas des intégrations installées ou actives. Avant activation, prévoir validation serveur des champs et fichiers, protection anti-abus, gestion des erreurs, limites effectives et règles de conservation ; puis adapter les textes visibles et la politique de confidentialité au dispositif réellement testé.

## Avant une mise en production

- [ ] Confirmer coordonnées, horaires, zones d’intervention, lien téléphonique, e-mail et fiche Google dans `lib/site.ts`.
- [ ] Valider les prestations, les réponses de FAQ, les options du formulaire et les avis avec l’atelier.
- [ ] Remplacer ou autoriser les illustrations issues des captures ; obtenir les deux originaux avant toute création d’un comparateur interactif.
- [ ] Configurer l’origine des métadonnées et vérifier les URLs, les métadonnées de partage et la stratégie canonique sur l’environnement publié.
- [ ] Compléter e-mail, SIRET, statut, immatriculation, assurance professionnelle, médiateur et coordonnées de l’hébergeur réel ; l’ancienne référence à Base44 n’est pas une configuration d’hébergement actuelle.
- [ ] Faire valider les mentions légales et la politique de confidentialité, notamment les affirmations de collecte et de stockage qui ne correspondent pas au formulaire actuel.
- [ ] Décider si le formulaire reste une maquette clairement signalée ou devient un service testé de bout en bout.
- [ ] Réexaminer l’affirmation « aucun bandeau de consentement nécessaire » au regard de l’iframe Google Maps et des exigences applicables aux services tiers.
- [ ] Traiter séparément l’incohérence du script de lint et l’assertion de préservation du README avant de s’appuyer sur ces contrôles.
- [ ] Contrôler dépendances, liens, images, accessibilité et rendu responsive sur l’environnement effectivement déployé.

La carte intégrée peut contacter Google et déposer des traceurs selon le service tiers ; les liens d’itinéraire ouvrent aussi Google Maps. Un formulaire sans envoi n’implique pas une absence de tout échange de données, et ce README ne constitue pas une garantie SEO ou RGPD.

## Droits et contributions

Le dépôt ne contient actuellement pas de licence générale de réutilisation. Ne pas en déduire que le code, le logo, les textes, les captures ou les images sont librement réutilisables. Les dépendances et polices conservent leurs propres licences ; la provenance et les autorisations des illustrations doivent être vérifiées séparément. Les mentions de propriété intellectuelle du site ne suffisent pas à établir tous les droits sur les ressources tierces.

Pour contribuer, travailler sur une branche, vérifier les changements et les contrôles applicables, puis proposer une pull request. La revue, la fusion et le déploiement sont des étapes distinctes.
