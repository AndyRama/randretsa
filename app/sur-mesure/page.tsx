import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb, Button, Check, Container, Eyebrow, Lead, Photo, PhoneIcon, SectionTitle, Stars } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { faqMeubles, meublesList, prendEnCharge, reviews } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Meuble sur mesure à Bordeaux : bureaux, tables, étagères",
  description: "Bureaux, tables de chevet, rallonges de table, meubles à étagères et rails : meubles sur mesure dessinés pour votre pièce par Édouard Randretsa, à Bordeaux.",
};

export default function SurMesurePage() {
  const avis = [reviews[2], reviews[3]];
  return (
    <>
      <section className="border-b border-line pb-16 pt-10">
        <Container>
          <Breadcrumb current="Meubles" />
          <div className="mt-8 grid items-center gap-10 md:grid-cols-[1.05fr_1fr] md:gap-14">
            <div>
              <Eyebrow>Sur mesure · Mobilier</Eyebrow>
              <SectionTitle as="h1" className="mt-4 max-w-[10em]">Meuble sur mesure à Bordeaux, dessiné pour votre pièce</SectionTitle>
              <Lead className="mt-5 max-w-[32rem] !text-[15px]">Un bureau qui va jusqu'au mur, une table rallongée pour recevoir, une étagère qui tient dans 40 cm : le sur mesure existe pour les pièces qui ne rentrent dans aucun catalogue.</Lead>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={site.phoneHref}><PhoneIcon /> {site.phone}</Button>
                <Button href="/contact" variant="outline">Demander un devis <span aria-hidden>→</span></Button>
              </div>
            </div>
            <Photo src="/images/bureau.jpg" alt="Bureau en chêne avec tiroir, devant une fenêtre et un mur vert sauge" sizes="(min-width: 768px) 44vw, 100vw" priority className="aspect-[5/4]" />
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <div>
            <div className="max-w-[28rem] space-y-5 text-[15px] leading-[1.75] text-ink/85">
              <p>On part souvent de peu de chose : une photo, un croquis sur un coin de nappe, un tronc d'arbre qu'on ne veut pas jeter. Je prends les mesures, je propose une solution réalisable, et on ajuste ensemble avant de couper la première planche.</p>
              <p>Vous choisissez l'essence et la finition, je m'occupe du reste. Pendant la fabrication, je vous envoie des photos à chaque étape — utile quand vous êtes loin ou quand vous ne pouvez pas passer à l'atelier.</p>
            </div>
            <div className="mt-8 border-l border-line pl-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Ce que je prends en charge</p>
              <ul className="mt-4 space-y-2.5 text-[13px] text-ink/85">
                {prendEnCharge.map((t) => (<li key={t} className="flex gap-3"><Check />{t}</li>))}
              </ul>
            </div>
          </div>
          <div className="self-start border border-line bg-card">
            {meublesList.map((m, i) => (
              <div key={m.title} className={`p-6 ${i ? "border-t border-line" : ""}`}>
                <h2 className="text-[19px] leading-snug">{m.title}</h2>
                <p className="mt-2 text-[13px] leading-relaxed text-body">{m.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-24">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-10">
          <div>
            <Eyebrow>Ils en parlent mieux que moi</Eyebrow>
            <h2 className="mt-3 text-[26px] leading-snug">5,0/5 sur 40 avis Google</h2>
            <Link href={site.googleUrl} className="mt-3 inline-block border-b border-ink/40 text-[13px] hover:border-ink">Voir la fiche Google <span aria-hidden className="text-[10px]">↗</span></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {avis.map((r) => (
              <figure key={r.tag} className="flex flex-col border border-line bg-paper p-5">
                <div className="flex items-center justify-between"><Stars className="text-[12px]" /><span className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted">{r.tag}</span></div>
                <blockquote className="mt-4 flex-1 font-serif text-[16px] leading-[1.6]">« {r.text} »</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4"><span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-full bg-sand text-[10px] font-medium text-body">G</span><span className="text-[11px] leading-tight text-body">Avis Google vérifié<br />{r.date}</span></figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sand py-20 md:py-24">
        <Container className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
          <div>
            <Eyebrow>Bon à savoir</Eyebrow>
            <h2 className="mb-6 mt-2 text-[26px]">Vos questions sur ce sujet</h2>
            <Faq items={faqMeubles} />
          </div>
          <aside className="self-start border border-line bg-paper p-6 md:p-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Autres prestations</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {["Portes", "Volets", "Fenêtres"].map((p) => (
                <li key={p}><Link href={`/renovation#${p.toLowerCase().replace("ê", "e")}`} className="flex items-center justify-between py-3.5 text-[14px] hover:text-moss">{p}<span aria-hidden className="text-[10px] text-muted">↗</span></Link></li>
              ))}
            </ul>
            <Button href="/realisations" variant="ghost" className="mt-6 !px-4 !py-2.5 !text-[12px]">Voir les réalisations</Button>
          </aside>
        </Container>
      </section>

      <CtaBand title={<>Un projet, une réparation : le<br />plus simple est d'en parler.</>} text="Appelez Édouard, ou envoyez quelques photos avec votre message. Vous saurez rapidement si c'est faisable, dans quel délai, et pour quel prix." cta="Demander un devis gratuit" />
    </>
  );
}
