import type { Metadata } from "next";
import { Bullet, Breadcrumb, Button, Container, Eyebrow, Lead, Photo, PhoneIcon, SectionTitle } from "@/components/ui";
import { ChantiersTabs } from "@/components/ChantiersTabs";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rénovation et réparation de portes, volets et fenêtres à Bordeaux",
  description: "Restauration de portes d'entrée et d'immeuble, volets persiennés, fenêtres anciennes, dépannage et pose de serrure à Bordeaux par Édouard Randretsa.",
};

// Page reconstituée : aucune capture de /renovation n'a été fournie. Titres et regroupements déduits de l'accueil et du footer.
const groups = [
  { id: "portes", title: "Portes", items: ["Restauration de portes d'entrée et d'immeuble", "Isolation et étanchéité de portes anciennes"] },
  { id: "volets", title: "Volets", items: ["Grands volets persiennés, volets intérieurs"] },
  { id: "fenetres", title: "Fenêtres", items: ["Réparation de fenêtres, y compris après effraction"] },
  { id: "depannage", title: "Dépannage", items: ["Pose de serrure, dépannage rapide"] },
];

export default function RenovationPage() {
  return (
    <>
      <section className="border-b border-line pb-16 pt-10">
        <Container>
          <Breadcrumb current="Rénovation" />
          <div className="mt-8 grid items-center gap-10 md:grid-cols-[1.05fr_1fr] md:gap-14">
            <div>
              <Eyebrow>Rénovation · Réparation</Eyebrow>
              <SectionTitle as="h1" className="mt-4 max-w-[11em]">Rénover plutôt que remplacer, à Bordeaux</SectionTitle>
              <Lead className="mt-5 max-w-[32rem] !text-[15px]">Portes d'immeuble, volets persiennés, fenêtres de maisons bordelaises : le bois d'origine se répare plus souvent qu'on ne le croit.</Lead>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={site.phoneHref}><PhoneIcon /> {site.phone}</Button>
                <Button href="/contact" variant="outline">Demander un devis <span aria-hidden>→</span></Button>
              </div>
            </div>
            <Photo src="/images/porte.jpg" alt="Porte d'entrée ancienne en bois dans une façade de pierre" sizes="(min-width: 768px) 44vw, 100vw" priority className="aspect-[8/5]" />
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container className="grid gap-8 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.id} id={g.id} className="scroll-mt-28 border border-line bg-card p-6 md:p-8">
              <h2 className="text-[22px]">{g.title}</h2>
              <ul className="mt-4 space-y-2.5 text-[14px] text-ink/85">{g.items.map((t) => (<li key={t} className="flex gap-3"><Bullet />{t}</li>))}</ul>
            </div>
          ))}
          <p className="text-[12px] text-muted md:col-span-2">[À COMPLÉTER] Le détail de cette page n'était pas sur les captures fournies : à reprendre du site d'origine.</p>
        </Container>
      </section>

      <section className="bg-sand py-20 md:py-24">
        <Container>
          <Eyebrow>Avant / après</Eyebrow>
          <SectionTitle className="mt-4 mb-10 max-w-[12em]">Ce que le bois avait encore à dire</SectionTitle>
          <ChantiersTabs />
        </Container>
      </section>

      <CtaBand title={<>Votre porte, votre volet, votre<br />fenêtre : on regarde ensemble.</>} text="Une photo suffit souvent à savoir si c'est réparable, réalisable, et dans quel ordre de prix." />
    </>
  );
}
