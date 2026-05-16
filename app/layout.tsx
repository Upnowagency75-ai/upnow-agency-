import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://upnow.agency"),
  title: "UpNow Agency — Agence Marketing Digital International",
  description:
    "UpNow Agency : publicité digitale, réseaux sociaux, création de sites web, design graphique et marketing physique en France et à l'international.",
  openGraph: {
    title: "UpNow Agency — Agence Marketing Digital International",
    description:
      "UpNow Agency : publicité digitale, réseaux sociaux, création de sites web, design graphique et marketing physique en France et à l'international.",
    url: "https://upnow.agency",
    siteName: "UpNow Agency",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UpNow Agency — Agence Marketing Digital International",
    description:
      "UpNow Agency : publicité digitale, réseaux sociaux, création de sites web, design graphique et marketing physique en France et à l'international.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
