import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function Page() {
  return (
    <LegalPage
      crumb="Confidentialité"
      eyebrow="Données personnelles"
      title="Politique de confidentialité"
      lead="Ce site ne collecte que ce qui est nécessaire pour répondre à votre demande."
      sections={[
        { title: "Ce que nous collectons", lines: ["Uniquement les informations saisies dans le formulaire de contact : nom, téléphone, email si vous le renseignez, type de besoin, description, et les photos que vous choisissez de joindre."] },
        { title: "Pourquoi", lines: ["Ces informations servent à répondre à votre demande, établir un devis et, si le projet se fait, à organiser le chantier. Elles ne sont ni revendues, ni utilisées à des fins publicitaires."] },
        { title: "Combien de temps", lines: ["Les demandes sans suite sont conservées le temps nécessaire au traitement, puis supprimées. Les dossiers de chantier sont conservés selon les obligations légales et comptables."] },
        { title: "Qui y a accès", lines: ["L'atelier uniquement. Les photos envoyées sont stockées de façon privée : elles ne sont pas accessibles publiquement sur internet."] },
        { title: "Cookies et mesure d'audience", lines: ["Ce site ne dépose pas de cookie publicitaire et n'utilise pas d'outil de suivi intrusif. Aucun bandeau de consentement n'est donc nécessaire."] },
        {
          title: "Vos droits",
          lines: ["Vous pouvez demander l'accès, la rectification ou la suppression des informations vous concernant, ainsi que vous opposer à leur utilisation. Il suffit d'appeler le 06 38 69 55 01 ou d'écrire à [À COMPLÉTER — email d'Édouard]."],
          note: "Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).",
        },
        { title: "Cartographie", lines: ["La carte affichée sur la page de contact est fournie par un service tiers, qui peut déposer ses propres traceurs lors de l'affichage."] },
      ]}
    />
  );
}
