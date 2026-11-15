import { Breadcrumb, Container, Eyebrow, SectionTitle } from "./ui";

export type LegalSection = { title: string; lines: string[]; note?: string };

export function LegalPage({ crumb, eyebrow, title, lead, sections }: { crumb: string; eyebrow: string; title: string; lead?: string; sections: LegalSection[] }) {
  return (
    <>
      <section className="border-b border-line bg-sand pb-12 pt-10">
        <Container>
          <Breadcrumb current={crumb} />
          <Eyebrow className="mt-8">{eyebrow}</Eyebrow>
          <SectionTitle as="h1" className="mt-3">{title}</SectionTitle>
          {lead && <p className="mt-4 text-[16px] text-body">{lead}</p>}
        </Container>
      </section>
      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-[48rem] space-y-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-[19px]">{s.title}</h2>
                <p className="mt-3 text-[15px] leading-[1.7] text-ink/85">
                  {s.lines.map((l, i) => (<span key={i} className="block">{l}</span>))}
                </p>
                {s.note && <p className="mt-3 text-[15px] leading-[1.7] text-body">{s.note}</p>}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
