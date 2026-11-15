import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Mentions légales" };

export default function Page() {
  return (
    <LegalPage
      crumb="Mentions légales"
      eyebrow="Informations"
      title="Mentions légales"
      sections={[
        {
          title: "Éditeur du site",
          lines: [
            "Menuiserie / Ébénisterie Randretsa — Édouard Randretsa, artisan menuisier-ébéniste.",
            "5 Rue de Bègles, 33800 Bordeaux",
            "Téléphone : 06 38 69 55 01",
            "Email : [À COMPLÉTER — email d'Édouard]",
            "SIRET : [À COMPLÉTER — SIRET]",
          ],
          note: "Statut juridique, numéro d'immatriculation et assurance professionnelle à compléter avant la mise en ligne.",
        },
        { title: "Responsable de la publication", lines: ["Édouard Randretsa."] },
        // Le texte d'origine citait la plateforme Base44 : à adapter à l'hébergeur réel.
        { title: "Hébergement", lines: ["Les coordonnées de l'hébergeur sont à ajouter ici avant la mise en ligne : [À COMPLÉTER — nom, adresse et contact de l'hébergeur]."] },
        { title: "Propriété intellectuelle", lines: ["Les textes et les photographies présents sur ce site sont la propriété de leur auteur. Toute reproduction sans autorisation est interdite. Les visuels actuellement en ligne sont des images d'illustration et seront remplacés par les photographies des chantiers de l'atelier."] },
        { title: "Médiation de la consommation", lines: ["Conformément aux articles L.611-1 et suivants du Code de la consommation, le client particulier peut recourir gratuitement à un médiateur de la consommation. Coordonnées du médiateur : [À COMPLÉTER]."] },
        { title: "Liens", lines: ["Ce site renvoie vers la fiche Google de l'atelier et vers un service de cartographie. Ces services tiers appliquent leurs propres conditions d'utilisation."] },
      ]}
    />
  );
}
