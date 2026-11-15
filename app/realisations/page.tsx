import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb, Container, Eyebrow, Lead, Photo, SectionTitle } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { chantiers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Réalisations : menuiserie et restauration à Bordeaux",
  description: "Portes d'entrée restaurées, volets persiennés remis à neuf, placards et bureaux sur mesure : quelques chantiers d'Édouard Randretsa à Bordeaux.",
};

const apercus = [
  { img: "/images/placard-portrait.jpg", alt: "Placard de chambre en chêne massif à portes staves", title: "Placard de chambre sur mesure", text: "Chêne massif, portes staves, poignées laiton" },
  { img: "/images/bureau-portrait.jpg", alt: "Bureau en chêne avec tiroir en queue d'aronde, devant une fenêtre", title: "Bureau sur mesure", text: "Plateau chêne, tiroir en queue d'aronde" },
  { img: "/images/atelier-portrait.jpg", alt: "Établi de l'atelier de la rue de Bègles", title: "L'atelier", text: "5 Rue de Bègles, Bordeaux" },
];

export default function RealisationsPage() {
  return (
    <>
      <section className="border-b border-line bg-sand pb-14 pt-10">
        <Container>
          <Breadcrumb current="Réalisations" />
          <Eyebrow className="mt-8">Le travail</Eyebrow>
          <SectionTitle as="h1" className="mt-4 max-w-[11em]">Ce qui a changé, et ce qui a été conservé</SectionTitle>
          <Lead className="mt-5 max-w-[36rem] !text-[15px]">Des chantiers bordelais typiques : une porte d'immeuble, une paire de persiennes, un meuble qui n'existait dans aucun catalogue.</Lead>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container className="space-y-20">
          {chantiers.map((c, i) => (
            <article key={c.title} className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div className={`relative aspect-[4/3] overflow-hidden bg-sand ${i % 2 ? "md:order-2" : ""}`}>
                <Image src={c.image} alt={c.alt} fill sizes="(min-width: 768px) 46vw, 100vw" className="object-cover" />
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-moss">{c.tab}</p>
                <h2 className="mt-3 text-[clamp(1.6rem,2.6vw,2rem)] leading-snug">{c.title}</h2>
                <p className="mt-3 max-w-[28rem] text-[14px] leading-relaxed text-body">{c.text}</p>
                <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.2em] text-muted">Glissez le curseur pour comparer</p>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section className="bg-sand py-20 md:py-24">
        <Container>
          <Eyebrow>Aperçus</Eyebrow>
          <SectionTitle className="mt-4">Sur mesure et atelier</SectionTitle>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {apercus.map((a) => (
              <figure key={a.title}>
                <Photo src={a.img} alt={a.alt} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/5]" />
                <figcaption className="mt-4">
                  <p className="font-serif text-[17px] font-medium">{a.title}</p>
                  <p className="mt-1 text-[12px] text-body">{a.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title={<>Votre porte, votre volet, votre<br />meuble : on regarde ensemble.</>} text="Une photo suffit souvent à savoir si c'est réparable, réalisable, et dans quel ordre de prix." />
    </>
  );
}
