import Image from "next/image";
import Link from "next/link";
import { Bullet, Button, Container, Eyebrow, Lead, Photo, PhoneIcon, PinIcon, SectionTitle, Stars } from "@/components/ui";
import { ArrowLink } from "@/components/PrestationsCard";
import { ChantiersTabs } from "@/components/ChantiersTabs";
import { ReviewCards } from "@/components/ReviewCards";
import { DevisSection } from "@/components/DevisSection";
import { renovationItems, sealsBar, steps, surMesure, whyEdouard, zones } from "@/lib/content";
import { mapsDirectionsUrl, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-dark text-white">
        <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-[64%]">
          <Image src="/images/hero-mains.jpg" alt="" fill priority sizes="(min-width: 768px) 70vw, 100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-dark/50 md:bg-gradient-to-r md:from-dark md:via-dark/25 md:to-transparent" />
        </div>
        <Container className="pb-16 pt-24 md:pb-20 md:pt-32">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">Menuisier-ébéniste · Bordeaux</p>
          <h1 className="mt-6 max-w-[11em] text-[clamp(2.4rem,5vw,3.6rem)] font-normal leading-[1.08] tracking-[-0.01em]">
            Le sur-mesure au millimètre.
            <em className="block">L'ancien sauvé, pas remplacé.</em>
          </h1>
          <p className="mt-6 max-w-[32rem] text-[15px] leading-relaxed text-white/85">
            Édouard Randretsa fabrique vos meubles, placards et bureaux, et restaure les portes, volets et fenêtres des maisons bordelaises. Un artisan indépendant, joignable, dont les devis tiennent parole.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={site.phoneHref} variant="white"><PhoneIcon /> Appeler le {site.phone}</Button>
            <Button href="/contact" variant="outline-light">Demander un devis <span aria-hidden>→</span></Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-[11px]">
            <p className="flex items-center gap-2 border border-white/20 bg-white/10 px-3 py-2"><Stars className="!text-white/80" /> {site.rating}/5 · {site.reviewCount} avis Google</p>
            <p className="flex items-center gap-2 px-1 py-2 uppercase tracking-[0.16em] text-white/70"><PinIcon /> 5 rue de Bègles, Bordeaux</p>
          </div>
        </Container>
      </section>

      <div className="border-b border-line">
        <Container className="flex flex-wrap justify-between gap-x-6 gap-y-2 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-body">
          {sealsBar.map((s) => (<span key={s}>{s}</span>))}
        </Container>
      </div>

      {/* Deux métiers */}
      <section className="py-20 md:py-24">
        <Container>
          <Eyebrow>Deux métiers, un seul artisan</Eyebrow>
          <SectionTitle className="mt-4 max-w-[13em]">Ce qui sort de l'atelier, et ce qui repart sur pied</SectionTitle>
          <Lead className="mt-5 max-w-[36rem] !text-[15px]">Le neuf et l'ancien demandent le même geste juste : des assemblages qui tiennent, des bois choisis pour leur usage, des finitions qui vieillissent bien.</Lead>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              { img: "/images/placard.jpg", alt: "Placard de chambre en chêne massif, portes à lames verticales", tag: "Fabriquer", title: "Sur mesure", text: "Des meubles dessinés pour votre pièce, pas pour un catalogue. On part d'une photo, d'un croquis ou d'un recoin perdu.", items: surMesure.items, href: "/sur-mesure", link: "Le sur-mesure en détail" },
              { img: "/images/porte.jpg", alt: "Porte d'entrée ancienne en bois dans une façade de pierre", tag: "Réparer", title: "Rénovation & réparation", text: "Portes d'immeuble, volets persiennés, fenêtres de maisons bordelaises : le bois d'origine se répare plus souvent qu'on ne le croit.", items: renovationItems, href: "/renovation", link: "La rénovation en détail" },
            ].map((c) => (
              <article key={c.title} className="flex flex-col border border-line bg-card">
                <Photo src={c.img} alt={c.alt} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[8/5]" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-moss">{c.tag}</p>
                  <h3 className="mt-2 text-[24px]">{c.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-body">{c.text}</p>
                  <ul className="mt-5 flex-1 space-y-2 text-[13px] text-ink/85">{c.items.map((t) => (<li key={t} className="flex gap-3"><Bullet />{t}</li>))}</ul>
                  <div className="mt-6"><ArrowLink href={c.href}>{c.link}</ArrowLink></div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Avant / après */}
      <section className="bg-sand py-20 md:py-24">
        <Container>
          <Eyebrow>Avant / après</Eyebrow>
          <SectionTitle className="mt-4 max-w-[12em]">Glissez pour voir ce que le bois avait encore à dire</SectionTitle>
          <Lead className="mt-5 max-w-[34rem] !text-[15px]">Deux chantiers typiques des maisons bordelaises : une porte d'entrée que d'autres jugeaient perdue, et des persiennes qui ne tenaient plus.</Lead>
          <div className="mt-10"><ChantiersTabs /></div>
        </Container>
      </section>

      {/* Pourquoi Édouard */}
      <section className="py-20 md:py-24">
        <Container>
          <Eyebrow>Pourquoi Édouard</Eyebrow>
          <SectionTitle className="mt-4 max-w-[12em]">Un artisan qu'on rappelle, et qu'on recommande</SectionTitle>
          <Lead className="mt-5 max-w-[34rem] !text-[15px]">Ce que les clients décrivent dans leurs avis tient en peu de mots : il répond, il tient parole, il travaille proprement. C'est rare, et c'est exactement le métier.</Lead>
          <div className="mt-12 grid gap-x-10 gap-y-2 md:grid-cols-2">
            {whyEdouard.map((w) => (
              <div key={w.title} className="border-t border-line py-6">
                <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" className="text-body"><path d={w.icon} /></svg>
                <h3 className="mt-3 text-[19px]">{w.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-body">{w.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Étapes */}
      <section className="bg-sand py-20 md:py-24">
        <Container>
          <Eyebrow>Comment ça se passe</Eyebrow>
          <SectionTitle className="mt-4">Cinq étapes, aucune zone d'ombre</SectionTitle>
          <Lead className="mt-4 !text-[15px]">Du premier appel à la dernière vis, vous savez où en est votre projet.</Lead>
          <ol className="mt-10 grid divide-y divide-line border border-line bg-card md:grid-cols-5 md:divide-x md:divide-y-0">
            {steps.map((s, i) => (
              <li key={s.title} className="p-5">
                <span className="font-serif text-[26px] font-light text-moss/80">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[15px] leading-snug">{s.title}</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-body">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Avis */}
      <section className="py-20 md:py-24">
        <Container>
          <Eyebrow>Avis clients</Eyebrow>
          <SectionTitle className="mt-4 max-w-[11em]">40 avis Google, 5 étoiles, aucun sans réponse</SectionTitle>
          <Lead className="mt-4 !text-[15px]">Extraits reformulés en français à partir des avis publiés sur Google.</Lead>
          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-body">
            <Stars /> <strong className="font-medium text-ink">{site.rating}/5</strong> <span>{site.reviewCount} avis Google · Bordeaux</span>
            <Link href={site.googleUrl} className="border-b border-ink/40 text-ink hover:border-ink">Lire les avis sur Google <span aria-hidden className="text-[10px]">↗</span></Link>
          </p>
          <div className="mt-6"><ReviewCards /></div>
          <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.18em] text-muted">Avis Google reformulés — noms d'affichage et mois de visite à confirmer avec Édouard avant publication</p>
        </Container>
      </section>

      {/* Zone d'intervention */}
      <section className="pb-20 md:pb-24">
        <Container>
          <Eyebrow>Zone d'intervention</Eyebrow>
          <SectionTitle className="mt-4">Bordeaux et sa couronne</SectionTitle>
          <Lead className="mt-4 max-w-[36rem] !text-[15px]">L'atelier est au 5 rue de Bègles, côté Bordeaux Bègles. Les chantiers se font dans Bordeaux et les communes autour, dans un rayon raisonnable pour rester réactif.</Lead>
          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1fr] md:gap-10">
            <div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-6 text-[14px]">
                {[zones.left, zones.right].map((col, k) => (
                  <ul key={k} className="space-y-3">
                    {col.map((z) => (<li key={z} className="flex items-start gap-2.5"><PinIcon className="mt-0.5 shrink-0 text-muted" />{z}</li>))}
                  </ul>
                ))}
              </div>
              <p className="mt-6 text-[12px] text-muted">Un doute sur votre commune ? Appelez : la réponse prend dix secondes.</p>
            </div>
            <div className="border border-line bg-card p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-moss">L'atelier</p>
              <p className="mt-3 font-serif text-[19px] font-medium leading-snug">{site.address[0]}<br />{site.address[1]}</p>
              <p className="mt-3 text-[13px] text-body">{site.opening} — Horaires complets à confirmer</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href={mapsDirectionsUrl} external className="!px-4 !py-2.5 !text-[12px]">Itinéraire <span aria-hidden className="text-[10px]">↗</span></Button>
                <Button href="/contact" variant="ghost" className="!px-4 !py-2.5 !text-[12px]">Poser une question</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <DevisSection />
    </>
  );
}
