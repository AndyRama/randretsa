export const sealsBar = ["Devis gratuit et détaillé", "Prix final = prix du devis", "Réponse souvent le jour même", "Suivi en photos"];

export const surMesure = {
  items: ["Placards de chambre et d'entrée, dressings", "Bureaux et plans de travail", "Tables de chevet, à partir d'une photo ou d'un tronc", "Rallonges de table et plateaux agrandis", "Étagères avec rails, meubles d'extérieur pour plantes"],
};
export const renovationItems = ["Restauration de portes d'entrée et d'immeuble", "Isolation et étanchéité de portes anciennes", "Grands volets persiennés, volets intérieurs", "Réparation de fenêtres, y compris après effraction", "Pose de serrure, dépannage rapide"];

export const whyEdouard = [
  { title: "Il répond, et il vient", text: "Au téléphone, c'est lui. Quand c'est urgent — une porte forcée, un volet qui menace — il passe souvent le jour même, et il prévient s'il ne peut pas.", icon: "M9 1.5 3.5 9H8l-1 5.5L12.5 7H8l1-5.5Z" },
  { title: "Le devis, c'est le prix", text: "Un devis détaillé, annoncé sans détour, et un prix final qui correspond. Pas de poste ajouté en cours de route, pas de mauvaise surprise à la livraison.", icon: "M4 1.5h6l2.5 2.5v10.5h-8.5zM6 7h4M6 9.5h4M6 12h2.5" },
  { title: "Des photos pendant la fabrication", text: "Vous suivez l'avancement sans être sur place : photos à chaque étape, y compris quand vous êtes loin pendant le chantier.", icon: "M2 5h2.5l1-1.5h5L11.5 5H14v8H2zM8 11.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" },
  { title: "Il trouve la solution", text: "Des pièces que d'autres jugeaient impossibles à reprendre, des recoins qui ne rentrent dans aucune mesure standard : il cherche, il propose, il explique.", icon: "M8 1.5a4.2 4.2 0 0 0-2.3 7.7V11h4.6V9.2A4.2 4.2 0 0 0 8 1.5ZM6.2 13.2h3.6M7 15h2" },
];

export const steps = [
  { title: "Vous appelez ou écrivez", text: "Décrivez le besoin, envoyez une photo si vous en avez une. C'est suffisant pour démarrer." },
  { title: "Visite ou relevé de cotes", text: "Sur place, ou à partir de vos mesures et photos si vous êtes loin. On regarde le support réel." },
  { title: "Devis clair", text: "Le détail des postes, les essences, les délais. Gratuit, et sans engagement." },
  { title: "Fabrication à l'atelier", text: "À Bordeaux, avec des photos à chaque étape si vous le souhaitez." },
  { title: "Pose et réglages", text: "Pose soignée, réglages, nettoyage. On vérifie ensemble que tout ferme et fonctionne." },
];

export const reviews = [
  { tag: "Réactivité", text: "J'ai appelé le matin pour une porte qui ne fermait plus, il est passé dans la journée. Rapide, efficace, et il a tout rangé avant de partir.", date: "Mars 2025" },
  { tag: "Devis respecté", text: "Devis clair, annoncé sans détour, et au final le prix payé était exactement celui du devis. Ça paraît normal, ça ne l'est pas toujours.", date: "Janvier 2025" },
  { tag: "Suivi photo", text: "Nous étions absents pendant la fabrication : il nous a envoyé des photos à chaque étape. On a suivi le meuble se monter depuis l'autre bout de la France.", date: "Novembre 2024" },
  { tag: "Conseils", text: "De bons conseils sur l'essence et la finition, sans chercher à vendre plus. Il m'a même dit ce que je pouvais faire moi-même.", date: "Juin 2024" },
];

export const chantiers = [
  { tab: "Rénovation", title: "Porte d'entrée ancienne", text: "Décapage complet, reprise des moulures, quincaillerie laiton reposée. La porte d'origine est conservée, pas remplacée.", quote: "Deux autres menuisiers m'avaient dit que la porte était trop abîmée.", image: "/images/avant-apres-porte.jpg", alt: "Porte d'entrée ancienne en bois, avant et après restauration" },
  { tab: "Restauration", title: "Volets persiennés", text: "Persiennes démontées, lames changées à l'identique, peinture et ferrures remises à neuf sur une façade bordelaise.", quote: "", image: "/images/avant-apres-volets.jpg", alt: "Volets persiennés, avant et après restauration" },
] as const;

// Réponses non visibles sur les captures (accordéons fermés) : à reprendre du site d'origine.
export const faqContact = ["Le devis est-il payant ?", "Puis-je envoyer seulement des photos ?", "Combien de temps pour avoir une réponse ?", "Intervenez-vous en dehors de Bordeaux ?"];
export const faqMeubles = ["Peut-on partir d'une simple photo ?", "Quelles essences de bois proposez-vous ?", "Est-ce que je peux suivre la fabrication ?", "Combien coûte un meuble sur mesure ?"];
export const faqAnswerPlaceholder = "[Réponse à compléter]";

export const zones = { left: ["Bordeaux", "Talence", "Le Bouscat", "[autres communes à confirmer]"], right: ["Bègles", "Pessac", "Cenon"] };

export const meublesList = [
  { title: "Bureaux et plans de travail", text: "Bureau sur mesure dans un renfoncement, plateau en chêne, passage de câbles discret, tiroir en queue d'aronde. Un bureau qui s'adapte à la pièce plutôt que l'inverse." },
  { title: "Tables de chevet et petites pièces", text: "Une table de chevet à partir d'une simple photo, ou taillée dans un tronc d'arbre : chaque pièce est unique, dessinée pour sa place exacte, avec la bonne hauteur par rapport au lit." },
  { title: "Rallonges et tables de réception", text: "Rallonge de table pour les repas de famille, allongement d'un plateau existant dans la même essence et la même patine, pour que l'ajout ne se voie pas." },
  { title: "Meubles à étagères et rails", text: "Étagères sur mesure avec rails, bibliothèques qui épousent un mur irrégulier, meubles pour plantes à l'extérieur traité pour tenir dehors." },
  { title: "Rénovation d'espace", text: "Reprendre une pièce en gardant son charme : moulures, parquet, cheminée, et y poser un meuble résolument moderne. Le contraste est calculé, pas subi." },
  { title: "Montage de meubles", text: "Montage et fixation de meubles, y compris les pièces volumineuses ou mal conçues. Fixation sérieuse au mur, réglage des portes, ça ne bouge plus." },
];
export const prendEnCharge = ["Bureaux et plans de travail sur mesure", "Tables de chevet, à partir d'une photo ou d'un tronc", "Rallonges de table et agrandissement de plateau", "Meubles à étagères avec rails", "Meubles d'extérieur pour plantes", "Montage de meubles et fixation murale", "Rénovation d'espace alliant design moderne et charme de l'existant"];
