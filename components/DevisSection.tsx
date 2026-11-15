import { Button, Container, Eyebrow, Lead, PhoneIcon, PinIcon, SectionTitle } from "./ui";
import { DevisForm } from "./DevisForm";
import { mapsDirectionsUrl, mapsEmbedUrl, site } from "@/lib/site";

export function DevisSection({ id = "devis", className = "" }: { id?: string; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-24 bg-sand py-20 md:py-24 ${className}`}>
      <Container className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        <div>
          <Eyebrow>Demander un devis</Eyebrow>
          <SectionTitle className="mt-4 max-w-[13em]">Dites-moi ce qu'il vous faut, une photo suffit pour commencer</SectionTitle>
          <Lead className="mt-5 max-w-[32rem] !text-[15px]">Beaucoup de projets démarrent avec une simple photo prise au téléphone. Décrivez le besoin, joignez ce que vous avez : la réponse arrive vite, avec un devis clair si le projet se précise.</Lead>
          <div className="mt-8"><DevisForm /></div>
        </div>
        <aside className="space-y-5">
          <div className="border border-line bg-card p-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-moss">Le plus direct</p>
            <a href={site.phoneHref} className="mt-3 flex items-center gap-3 text-[26px] tracking-wide hover:text-moss"><PhoneIcon className="text-body" /> {site.phone}</a>
            <p className="mt-3 text-[14px] leading-relaxed text-body">Édouard répond lui-même. Pour un dépannage, un appel vaut mieux qu'un formulaire.</p>
          </div>
          <div className="border border-line bg-card p-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-moss">L'atelier</p>
            <div className="mt-4 flex gap-3 text-[15px]">
              <PinIcon className="mt-1 shrink-0 text-body" />
              <p>{site.address[0]}<br />{site.address[1]}<span className="mt-1 block text-[12px] text-muted">Plus Code : {site.plusCode}</span></p>
            </div>
            <div className="mt-4 flex gap-3 text-[15px]">
              <svg aria-hidden width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="mt-1 shrink-0 text-body"><circle cx="8" cy="8" r="6" /><path d="M8 4.5V8l2.3 1.5" /></svg>
              <p>{site.opening}<span className="mt-1 block text-[12px] text-muted">Horaires complets à confirmer</span></p>
            </div>
            <Button href={mapsDirectionsUrl} variant="ghost" external className="mt-5 !px-4 !py-2.5 !text-[12px]">Voir l'itinéraire <span aria-hidden className="text-[10px]">↗</span></Button>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden border border-line bg-white">
            <iframe title="Carte : atelier Randretsa, 5 rue de Bègles, Bordeaux" src={mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full" />
          </div>
        </aside>
      </Container>
    </section>
  );
}
