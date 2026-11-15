import type { Metadata, Viewport } from "next";
import "@fontsource-variable/work-sans";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const title = "Menuisier-ébéniste à Bordeaux : sur mesure et restauration | Randretsa";
const description =
  "Édouard Randretsa, menuisier-ébéniste à Bordeaux : meubles, placards et bureaux sur mesure, restauration de portes, volets et fenêtres anciennes. Devis gratuit et détaillé.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: title, template: "%s | Randretsa" },
  description,
  openGraph: { type: "website", locale: "fr_FR", siteName: "Menuiserie Randretsa", title, description, images: ["/images/atelier.jpg"] },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#2C2521", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
