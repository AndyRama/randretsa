import { Button, Container, PhoneIcon } from "./ui";
import { site } from "@/lib/site";

export function CtaBand({ title, text, cta = "Demander un devis" }: { title: React.ReactNode; text: string; cta?: string }) {
  return (
    <section className="bg-dark text-white">
      <Container className="grid items-end gap-8 py-16 md:grid-cols-[1fr_auto]">
        <div className="max-w-[34rem]">
          <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] leading-[1.15] tracking-[-0.01em]">{title}</h2>
          <p className="mt-4 text-[14px] leading-relaxed text-white/70">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={site.phoneHref} variant="white"><PhoneIcon /> {site.phone}</Button>
          <Button href="/contact" variant="outline-light">{cta}</Button>
        </div>
      </Container>
    </section>
  );
}
