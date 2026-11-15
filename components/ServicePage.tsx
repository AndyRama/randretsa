import Image from "next/image";
import Link from "next/link";
import { Breadcrumb, Button, Check, Container, Eyebrow, Lead, Photo, PhoneIcon, SectionTitle, Stars } from "./ui";
import { Faq } from "./Faq";
import { CtaBand } from "./CtaBand";
import { chantiers } from "@/lib/content";
import { serviceReviews, type Service } from "@/lib/services";
import { site } from "@/lib/site";

const labels: Record<string, string> = { portes: "Portes", volets: "Volets", fenetres: "Fenêtres", meubles: "Meubles", placards: "Placards", depannage: "Dépannage" };
const comparisonCaption = "Visuel comparatif statique — image composite issue des captures, poignée et libellés intégrés. Les deux photos originales ne sont pas disponibles.";

export function ServicePage({ service: s }: { service: Service }) {
  const comparison = s.comparison === null ? null : chantiers[s.comparison];
  const googleUrl = site.googleUrl === "#"
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name} ${site.address.join(' ')}`)}`
    : site.googleUrl;
  return (
    <>
      <section className="border-b border-line pb-16 pt-10">
        <Container>
          <Breadcrumb current={s.label} />
          <div className="mt-8 grid items-center gap-10 md:grid-cols-[1.05fr_1fr] md:gap-14">
            <div>
              <Eyebrow>{s.eyebrow}</Eyebrow>
              <SectionTitle as="h1" className="mt-4 max-w-[11em]">{s.title}</SectionTitle>
              <Lead className="mt-5 max-w-[32rem] !text-[15px]">{s.intro}</Lead>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={site.phoneHref}><PhoneIcon /> {site.phone}</Button>
                <Button href="/contact" variant="outline">Demander un devis <span aria-hidden>→</span></Button>
              </div>
            </div>
            {s.slug === "volets" ? (
              <figure>
                <div className="relative aspect-[5/4] bg-sand">
                  <Image src={s.image} alt={s.alt} fill priority sizes="(min-width: 768px) 44vw, 100vw" className="object-contain" />
                </div>
                <figcaption className="mt-3 text-[11px] leading-relaxed text-muted">{comparisonCaption}</figcaption>
              </figure>
            ) : <Photo src={s.image} alt={s.alt} sizes="(min-width: 768px) 44vw, 100vw" priority className="aspect-[5/4]" />}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <div>
            <div className="max-w-[28rem] space-y-5 text-[15px] leading-[1.75] text-ink/85">
              {s.paragraphs.map(p => <p key={p}>{p}</p>)}
            </div>
            <div className="mt-8 border-l border-line pl-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">{s.bulletTitle}</p>
              <ul className="mt-4 space-y-2.5 text-[13px] text-ink/85">
                {s.bullets.map(item => <li key={item} className="flex gap-3"><Check />{item}</li>)}
              </ul>
            </div>
          </div>
          <div className="self-start border border-line bg-card">
            {s.panels.map((panel, i) => (
              <div key={panel.title} className={`p-6 ${i ? "border-t border-line" : ""}`}>
                <h2 className="text-[19px] leading-snug">{panel.title}</h2>
                <p className="mt-2 text-[13px] leading-relaxed text-body">{panel.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {comparison && <section className="bg-sand py-20 md:py-24">
        <Container className="grid items-center gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14">
          <figure>
            <div className="relative aspect-[4/3] bg-sand">
              <Image src={comparison.image} alt={comparison.alt} fill sizes="(min-width: 768px) 52vw, 100vw" className="object-contain" />
            </div>
            <figcaption className="mt-3 text-[11px] leading-relaxed text-muted">{comparisonCaption}</figcaption>
          </figure>
          <div>
            <Eyebrow>Avant / après</Eyebrow>
            <h2 className="mt-3 text-[26px] leading-snug">{comparison.title}</h2>
            <p className="mt-3 max-w-[28rem] text-[14px] leading-relaxed text-body">{comparison.text}</p>
          </div>
        </Container>
      </section>}

      <section className="py-20 md:py-24">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-10">
          <div>
            <Eyebrow>Ils en parlent mieux que moi</Eyebrow>
            <h2 className="mt-3 text-[26px] leading-snug">{site.rating}/5 sur {site.reviewCount} avis Google</h2>
            <Link href={googleUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block border-b border-ink/40 text-[13px] hover:border-ink">Voir la fiche Google <span aria-hidden className="text-[10px]">↗</span></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {s.reviewKeys.map(key => {
              const r = serviceReviews[key];
              return <figure key={key} className="flex flex-col border border-line bg-paper p-5">
                <div className="flex items-center justify-between gap-3"><Stars className="text-[12px]" /><span className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted">{r.tag}</span></div>
                <blockquote className="mt-4 flex-1 font-serif text-[16px] leading-[1.6]">« {r.text} »</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4"><span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-full bg-sand text-[10px] font-medium text-body">G</span><span className="text-[11px] leading-tight text-body">Extrait d'avis fourni<br />{r.date}</span></figcaption>
              </figure>;
            })}
          </div>
        </Container>
      </section>

      <section className="bg-sand py-20 md:py-24">
        <Container className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
          <div>
            <Eyebrow>Bon à savoir</Eyebrow>
            <h2 className="mb-6 mt-2 text-[26px]">Vos questions sur ce sujet</h2>
            <Faq items={s.faqs} />
          </div>
          <aside className="self-start border border-line bg-paper p-6 md:p-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Autres prestations</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {s.related.map(slug => <li key={slug}><Link href={`/${slug}`} className="flex items-center justify-between py-3.5 text-[14px] hover:text-moss">{labels[slug]}<span aria-hidden className="text-[10px] text-muted">↗</span></Link></li>)}
            </ul>
            <Button href="/realisations" variant="ghost" className="mt-6 !px-4 !py-2.5 !text-[12px]">Voir les réalisations</Button>
          </aside>
        </Container>
      </section>
      <CtaBand title={<>Un projet, une réparation : le<br />plus simple est d'en parler.</>} text="Appelez Édouard, ou envoyez quelques photos avec votre message. Vous saurez rapidement si c'est faisable, dans quel délai, et pour quel prix." cta="Demander un devis gratuit" />
    </>
  );
}
