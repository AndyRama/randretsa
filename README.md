# Randretsa — Menuiserie / Ébénisterie (Next.js)

Next.js (App Router), TypeScript, Tailwind v3. Polices auto-hébergées (Fraunces + Work Sans via fontsource).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Pages
`/` · `/sur-mesure` · `/renovation` · `/realisations` · `/a-propos` · `/contact` · `/mentions-legales` · `/confidentialite`

## Où modifier quoi
- `lib/site.ts` : téléphone, adresse, horaires, note Google, navigation (`googleUrl` et email à renseigner)
- `lib/content.ts` : services, étapes, avis, chantiers avant/après, FAQ
- `components/` : header, footer, formulaire de devis, sections · `tailwind.config.ts` : palette

## À faire
- **Formulaire** (`components/DevisForm.tsx`) : mise en page seule, il n'envoie rien. Prévu : react-hook-form + zod, route handler, Brevo/SMTP, stockage privé des photos.
- **Images** (`public/images`) : rognées depuis les captures, basse définition. Les avant/après sont des composites (libellés et poignée intégrés) : à remplacer par un vrai curseur avec les deux originaux (`components/ChantiersTabs.tsx`). Le hero est un remplacement (texte incrusté dans la capture).
- **Contenus absents des captures** : page Rénovation (reconstituée), réponses des FAQ (`[Réponse à compléter]`), options du select « Type de besoin ».
- **Légal** : l'hébergeur n'est plus Base44, à renseigner dans les mentions légales. La page confidentialité affirme « aucun bandeau de consentement nécessaire » : à revoir si l'iframe Google Maps est conservée (traceurs tiers).
