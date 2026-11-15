export const site = {
  name: "Randretsa",
  tagline: "Menuiserie · Ébénisterie",
  owner: "Édouard Randretsa",
  phone: "06 38 69 55 01",
  phoneHref: "tel:+33638695501",
  email: "[À COMPLÉTER]",
  address: ["5 Rue de Bègles", "33800 Bordeaux"],
  plusCode: "RCHJ+HQ Bordeaux",
  opening: "Ouvert à partir de 10h",
  rating: "5,0",
  reviewCount: 40,
  googleUrl: "#", // TODO : lien de la fiche Google
} as const;

const q = encodeURIComponent("5 Rue de Bègles 33800 Bordeaux");
export const mapsEmbedUrl = `https://www.google.com/maps?q=${q}&output=embed`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

export const nav = [
  { label: "Sur mesure", href: "/sur-mesure" },
  { label: "Rénovation", href: "/renovation" },
  { label: "Réalisations", href: "/realisations" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

export const prestations = [
  { label: "Portes", href: "/portes" },
  { label: "Volets", href: "/volets" },
  { label: "Fenêtres", href: "/fenetres" },
  { label: "Meubles", href: "/meubles" },
  { label: "Placards", href: "/placards" },
  { label: "Dépannage", href: "/depannage" },
] as const;
