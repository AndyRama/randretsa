import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb, Button, Container, Eyebrow, Lead, Photo, PhoneIcon, SectionTitle, Stars } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos d'Édouard Randretsa, menuisier-ébéniste à Bordeaux",
  description: "Édouard Randretsa, menuisier-ébéniste indépendant à Bordeaux Bègles : meubles sur mesure et restauration de portes, volets et fenêtres anciennes.",
};

const paragraphs = [
  "Édouard Randretsa est menuisier-ébéniste indépendant, installé à Bordeaux Bègles. Son atelier travaille deux matières qui n'ont pas les mêmes exigences : le bois neuf, qu'on dessine et qu'on assemble, et le bois ancien, qu'on écoute avant de le toucher.",
  "C'est ce qui fait la particularité de son travail : il fabrique des meubles, des placards et des bureaux sur mesure, et il restaure les portes, volets et fenêtres des maisons bordelaises — souvent là où d'autres ont renoncé.",
  "Le reste, ce sont des choses simples que les clients répètent dans leurs avis : il répond au téléphone, il arrive à l'heure, il envoie des photos pendant la fabrication, il annonce un prix et il le tient.",
  "L'atelier reste un atelier : on y entre par la rue de Bègles, on y voit des planches, des rabots et de la sciure. C'est là que passent les devis, les coupes et les finitions.",
];

export default function AProposPage() {
  return (
    <>
      <section className="border-b border-line pb-16 pt-10">
        <Container>
          <Breadcrumb current="À propos" />
          <div className="mt-8 grid items-start gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14">
            <div className="md:pt-6">
              <Eyebrow>L'artisan</Eyebrow>
              <SectionTitle as="h1" className="mt-4 max-w-[10em]">Édouard Randretsa, menuisier-ébéniste à Bordeaux</SectionTitle>
              <Lead className="mt-5 max-w-[32rem]">Un atelier au 5 rue de Bègles, une seule paire de mains, et l'idée qu'une porte de cent ans mérite souvent mieux qu'un remplacement.</Lead>
            </div>
            <Photo src="/images/atelier.jpg" alt="Établi d'atelier avec rabots, ciseaux à bois et caisses d'outils, planches de chêne le long du mur" sizes="(min-width: 768px) 42vw, 100vw" priority className="aspect-[4/3]" />
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container className="grid gap-12 md:grid-cols-[1.25fr_1fr] md:gap-16">
          <div>
            <div className="max-w-[34rem] space-y-5 text-[16px] leading-[1.75] text-ink/85">
              {paragraphs.map((p) => (<p key={p.slice(0, 20)}>{p}</p>))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/sur-mesure" variant="ghost" className="!px-4 !py-2.5 !text-[12px]">Le sur-mesure</Button>
              <Button href="/renovation" variant="ghost" className="!px-4 !py-2.5 !text-[12px]">La restauration</Button>
              <Button href="/realisations" variant="ghost" className="!px-4 !py-2.5 !text-[12px]">Les réalisations</Button>
            </div>
          </div>
          <aside className="self-start border border-line bg-card p-6 md:p-8">
            <p className="flex items-center gap-3 text-[15px]"><Stars className="text-[14px]" /> <strong className="font-medium">{site.rating}/5</strong></p>
            <p className="mt-1 text-[12px] text-body">{site.reviewCount} avis Google · Bordeaux</p>
            <span aria-hidden className="mt-6 block font-serif text-2xl leading-none text-body/50">“</span>
            <blockquote className="mt-2 font-serif text-[17px] italic leading-[1.7]">« Deux autres menuisiers m'avaient dit que la porte était trop abîmée. Il l'a reprise, les moulures sont identiques à l'origine. »</blockquote>
            <p className="mt-4 text-[11px] text-body">Avis Google · septembre 2024</p>
            <div className="mt-6 border-t border-line pt-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-moss">L'atelier</p>
              <p className="mt-3 text-[14px] leading-relaxed text-body">{site.address[0]}<br />{site.address[1]}<br />{site.opening}</p>
              <Button href={site.phoneHref} className="mt-5 !px-4 !py-2.5 !text-[12px]">Appeler le {site.phone}</Button>
            </div>
          </aside>
        </Container>
      </section>

      <CtaBand title={<>Vous avez un projet,<br />ou juste une question ?</>} text="Un appel de deux minutes suffit souvent à savoir si ça vaut le coup de creuser." />
    </>
  );
}
