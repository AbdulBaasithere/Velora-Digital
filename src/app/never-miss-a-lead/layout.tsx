import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Never Miss a Lead — Instant WhatsApp & Instagram Replies for Goa Businesses",
  description:
    "Never Miss a Lead answers every WhatsApp and Instagram message the instant it arrives, so salons, clinics, real estate agents and gyms in Goa stop losing customers to slow replies.",
  openGraph: {
    title: "Never Miss a Lead — Instant WhatsApp & Instagram Replies for Goa Businesses",
    description:
      "Never Miss a Lead answers every WhatsApp and Instagram message the instant it arrives, so salons, clinics, real estate agents and gyms in Goa stop losing customers to slow replies.",
    type: "website",
    locale: "en_IN",
    siteName: "Never Miss a Lead",
    images: [
      {
        url: "/velora-logo-hd.png",
        width: 800,
        height: 600,
        alt: "Never Miss a Lead Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Never Miss a Lead — Instant WhatsApp & Instagram Replies for Goa Businesses",
    description:
      "Never Miss a Lead answers every WhatsApp and Instagram message the instant it arrives, so salons, clinics, real estate agents and gyms in Goa stop losing customers to slow replies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function NeverMissALeadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
