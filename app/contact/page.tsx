import type { Metadata } from "next";
import { Breadcrumb, Container, Eyebrow, Lead, SectionTitle } from "@/components/ui";
import { DevisSection } from "@/components/DevisSection";
import { Faq } from "@/components/Faq";
import { faqContact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact et devis menuiserie à Bordeaux",
  description: "Contactez Édouard Randretsa, menuisier-ébéniste à Bordeaux : téléphone, formulaire de devis avec photos, atelier rue de Bègles.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line bg-sand pb-14 pt-10">
        <Container>
          <Breadcrumb current="Contact" />
          <Eyebrow className="mt-8">Parlons-en</Eyebrow>
          <SectionTitle as="h1" className="mt-4 max-w-[10em]">Un projet, une réparation, une question</SectionTitle>
          <Lead className="mt-5 max-w-[36rem]">Le téléphone reste le plus rapide. Le formulaire est là pour décrire un projet tranquillement, photos à l'appui.</Lead>
        </Container>
      </section>
      <DevisSection id="formulaire" className="!bg-paper !pt-16" />
      <section className="bg-sand py-20 md:py-24">
        <Container className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <Eyebrow>Avant d'écrire</Eyebrow>
            <Lead className="mt-4 max-w-[20rem] !text-[15px]">Les questions qui reviennent le plus souvent, pour gagner du temps.</Lead>
          </div>
          <Faq items={faqContact} />
        </Container>
      </section>
    </>
  );
}
