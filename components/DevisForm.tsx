"use client";

import type { FormEvent } from "react";

// Mise en page seulement : le formulaire n'envoie rien pour l'instant.
// TODO (2e temps) : react-hook-form + zod, route handler (/api/contact), envoi Brevo/SMTP, stockage privé des photos.

const field = "w-full border border-line bg-white px-3.5 py-3 text-[14px] text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none";
const label = "block text-[10px] font-medium uppercase tracking-[0.2em] text-body";
const types = ["Sur mesure", "Rénovation", "Restauration", "Dépannage", "Autre"]; // TODO : options d'origine à confirmer

export function DevisForm() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className={`${label} mb-2`}>Votre nom *</label>
          <input id="nom" name="nom" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="tel" className={`${label} mb-2`}>Téléphone *</label>
          <input id="tel" name="tel" type="tel" required autoComplete="tel" placeholder="06 …" className={field} />
        </div>
        <div>
          <label htmlFor="email" className={`${label} mb-2`}>Email (facultatif)</label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor="besoin" className={`${label} mb-2`}>Type de besoin</label>
          <select id="besoin" name="besoin" defaultValue="Sur mesure" className={field}>
            {types.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="projet" className={`${label} mb-2`}>Votre projet *</label>
        <textarea id="projet" name="projet" required rows={4} placeholder="Ex. : porte d'entrée de 1930 qui ne ferme plus, volet cassé côté rue, placard sous escalier à créer…" className={`${field} resize-y`} />
      </div>
      <div>
        <span className={`${label} mb-2`}>Photos (jusqu'à 5)</span>
        <label className="inline-flex cursor-pointer items-center gap-2 border border-dashed border-ink/25 px-4 py-2.5 text-[13px] text-body transition-colors hover:border-ink focus-within:outline focus-within:outline-2 focus-within:outline-moss">
          <svg aria-hidden width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 5h2.5l1-1.5h5L11.5 5H14v8H2zM8 11.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" /></svg>
          Ajouter des photos
          <input type="file" name="photos" multiple accept="image/*" className="sr-only" />
        </label>
        <p className="mt-2 text-[11px] text-muted">Une photo prise au téléphone suffit souvent à comprendre le problème. Les fichiers restent privés.</p>
      </div>
      <label className="flex items-start gap-3 text-[12px] leading-relaxed text-body">
        <input type="checkbox" name="consentement" required className="mt-0.5 h-4 w-4 shrink-0 accent-dark" />
        J'accepte d'être recontacté au sujet de ma demande. Mes coordonnées servent uniquement à répondre et ne sont jamais revendues.
      </label>
      <div>
        <button type="submit" className="bg-dark px-6 py-3.5 text-[13px] font-medium text-white transition-colors hover:bg-dark/85">Envoyer ma demande</button>
        <p className="mt-4 text-[11px] text-muted">Devis gratuit et sans engagement · Réponse rapide, souvent le jour même.</p>
      </div>
    </form>
  );
}
