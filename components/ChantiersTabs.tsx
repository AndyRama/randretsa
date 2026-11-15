"use client";

import Image from "next/image";
import { useState } from "react";
import { chantiers } from "@/lib/content";

// Les visuels avant/après sont des images composites (avec libellés et poignée intégrés) tirées des captures.
// TODO : remplacer par un vrai curseur (deux images avant / après) quand les originaux sont disponibles.
export function ChantiersTabs() {
  const [i, setI] = useState(0);
  const c = chantiers[i];
  return (
    <div className="grid items-center gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14">
      <figure>
        <div className="relative aspect-[4/3] overflow-hidden bg-sand">
          <Image key={c.image} src={c.image} alt={c.alt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
        </div>
        <figcaption className="mt-3 text-[9px] font-medium uppercase tracking-[0.2em] text-muted">Visuels d'illustration — les photos des chantiers d'Édouard prennent place ici</figcaption>
      </figure>
      <div>
        <div role="group" aria-label="Choisir un chantier" className="flex">
          {chantiers.map((x, k) => (
            <button key={x.tab} type="button" aria-pressed={i === k} onClick={() => setI(k)} className={`border px-3.5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors ${i === k ? "border-dark bg-dark text-white" : "border-line text-body hover:text-ink"}`}>
              {x.tab}
            </button>
          ))}
        </div>
        <h3 className="mt-6 text-[24px] leading-snug">{c.title}</h3>
        <p className="mt-3 text-[14px] leading-relaxed text-body">{c.text}</p>
        {c.quote && <blockquote className="mt-5 border-l border-ink/30 pl-4 font-serif text-[15px] italic leading-relaxed">« {c.quote} »</blockquote>}
      </div>
    </div>
  );
}
