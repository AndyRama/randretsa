import Link from "next/link";
import { Container, PhoneIcon, PinIcon, Stars } from "./ui";
import { Logo } from "./Logo";
import { mapsDirectionsUrl, prestations, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-[#F7F5F3]">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-[19rem] text-[13px] leading-relaxed text-body">Menuiserie et ébénisterie à Bordeaux. Le sur-mesure au millimètre, l'ancien restauré avec patience — par un artisan qui vous répond.</p>
          <p className="mt-5 flex items-center gap-2 text-[13px] text-body"><Stars className="text-[12px]" /> {site.rating}/5 · {site.reviewCount} avis Google</p>
        </div>
        <nav aria-label="Prestations">
          <h3 className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Prestations</h3>
          <ul className="mt-5 space-y-2.5 text-[13px] text-body">
            {prestations.map((p) => (<li key={p.label}><Link href={p.href} className="hover:text-ink">{p.label}</Link></li>))}
          </ul>
        </nav>
        <div>
          <h3 className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Atelier</h3>
          <address className="mt-5 space-y-1 text-[13px] not-italic text-body">
            <p>{site.address[0]}<br />{site.address[1]}</p>
            <p>Plus Code : {site.plusCode}</p>
            <p className="pt-2">{site.opening}</p>
          </address>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={site.phoneHref} className="inline-flex items-center gap-2 border border-line px-3.5 py-2 text-[12px] hover:border-ink/40"><PhoneIcon className="text-body" /> {site.phone}</a>
            <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-line px-3.5 py-2 text-[12px] hover:border-ink/40"><PinIcon className="text-body" /> Itinéraire <span aria-hidden className="text-[10px]">↗</span></a>
          </div>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="grid gap-4 py-6 text-[11px] text-body md:grid-cols-[1.4fr_2.2fr]">
          <p>© {new Date().getFullYear()} Menuiserie / Ébénisterie Randretsa — Édouard Randretsa, Menuisier-ébéniste à Bordeaux.</p>
          <div>
            <p className="flex gap-6">
              <Link href="/mentions-legales" className="hover:text-ink">Mentions légales</Link>
              <Link href="/confidentialite" className="hover:text-ink">Confidentialité</Link>
              <Link href="/realisations" className="hover:text-ink">Réalisations</Link>
            </p>
            <p className="mt-2">{site.address[0]}, {site.address[1]}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
