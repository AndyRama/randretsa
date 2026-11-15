# Six service pages — content and asset provenance

## Sources and boundaries

The supplied screenshots are the primary source for visible service copy and layout. No original site URL or hidden FAQ responses could be recovered from the repository: its initial history has one setup commit and the README explicitly records missing FAQ answers. The Git remote points to this clone's source repository, not an archived Base44 site. No claim is made that the original site or closed accordion content has been recovered.

| Route | User-provided screenshot | Reviews selected |
| --- | --- | --- |
| `/portes` | `img_243da7143185.jpg` | Devis respecté, Sauvé |
| `/volets` | `img_f91354a93db6.jpg` | Sauvé |
| `/fenetres` | `img_998598d7854d.jpg` | Réactivité, Devis respecté |
| `/meubles` | `img_41a245de084f.jpg` | Suivi photo, Conseils |
| `/placards` | `img_7d7770492e07.jpg` | Suivi photo |
| `/depannage` | `img_fc76bb2356ae.jpg` | Réactivité, Sauvé |

All screenshots reside under `/opt/data/cache/images/` in the implementation environment. They are references, not new production assets.

## Screenshot transcription vs new editorial copy

`tests/fixtures/screenshots.json` was collected before production implementation. It records six source-derived page records, twelve body paragraphs, thirty-four bullets, twenty-two subsection panels and twenty closed FAQ questions. It is an independent SSR expectation, not imported by production. Furniture copy already present on `/sur-mesure` was checked visually against its screenshot and retained.

The screenshots are low-resolution. Typography and whitespace are normalized; the doors page cave panel's final low-legibility clause after “on ne voit pas la différence” is omitted rather than invented. Its fourth FAQ question concerning apartment-building doors and copropriété has lower transcription confidence and needs owner confirmation against a higher-resolution source. The fixture records the best readable wording, not a claim of verified original HTML. The door cave panel is otherwise retained, not replaced with generic filler.

**Every FAQ answer in `lib/services.ts` is newly written conservative editorial copy.** None is described as a screenshot transcription. The answers explain only visible service claims, scope and choices; quote-specific prices, guaranteed emergency slots, fixed restoration deadlines, insurance arrangements, certifications and warranty terms are not invented. Unknown travel fees and insurance conditions are explicitly referred back to the artisan/insurer. The four furniture answers also serve the preserved `/sur-mesure` page. Legacy string-only contact FAQ callers remain supported with a safe invitation to clarify their project; their questions and surrounding page/form are unchanged.

Review selection and counts match the screenshot references. Existing excerpts are reused without new names or attribution. The full “Sauvé” excerpt comes from the supplied doors/volets screenshot (the existing `chantiers.quote` contained its opening sentence). New service pages label these as supplied excerpts, not newly independently verified Google reviews. The legacy rating/count and unresolved Google link are preserved as repository configuration, not revalidated business facts.

## Images and static comparison truthfulness

All existing local assets remain byte-identical. No images were invented or downloaded. Doors use the existing `porte.jpg`; furniture uses `bureau.jpg`; cupboards use `placard.jpg`; windows use `atelier.jpg`; emergency service uses the existing substitute `hero-mains.jpg` (the baseline README already identifies the hero as a replacement).

Only composite before/after JPEGs exist for doors and shutters. Both comparison sections show the complete asset with `object-contain` and the explicit caption **“Visuel comparatif statique”**, explaining embedded labels/handle and missing originals. No range input, fake slider, drag instruction, split crop or simulated interaction is added. Because there is no separate clean shutter photo, the shutter hero also displays the full available composite and the same disclosure. It is not an exact clean-hero reproduction of the screenshot; replacing it requires a real original photo. Other legacy comparison UI remains outside this scoped change.

## Verification and preserved scope

Native Node tests compile real TS/TSX exports through the installed Next SWC compiler and render actual React/Next Image components with `react-dom/server`. No new test packages or dependency changes are required. Run:

```sh
node --test tests/services.test.cjs
npx tsc --noEmit
```

Observed per-slice RED/GREEN logs and the source snapshot are stored in `/opt/data/output/randretsa-services/`. Coverage includes all route exports, full recorded source text, closed FAQs with substantive non-placeholder answers, distinct metadata, existing image assets, static comparison disclosure, selected review counts, related links, footer destinations and byte-preservation of unrelated tracked files. A narrow normalization test permits only the furniture FAQ wiring/import and related-service destination changes; it protects all remaining old furniture source. Existing renovation anchor IDs and both `/sur-mesure` and `/renovation` routes remain intact.

These are component/data SSR checks, not built HTTP/mobile-browser verification. The parent task owns final production build, six-route desktop/mobile review, FAQ keyboard interaction and loaded-image checks. No provider, submission, backend, legal-page or form behavior has been changed; existing prelaunch placeholders outside these six service pages remain outside scope.
