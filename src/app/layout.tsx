import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Velora Digital | Beautiful Websites for Local Businesses",
  description:
    "We design fast, mobile-friendly websites for cafes, restaurants, shops, clinics, and local businesses. Get more customers with professional web design and SEO optimization. Starting at ₹4,999.",
  keywords: [
    "web design",
    "local business website",
    "cafe website",
    "restaurant website",
    "salon website",
    "SEO optimization",
    "affordable web design",
    "Velora Digital",
    "mobile-friendly website",
    "small business website",
  ],
  authors: [{ name: "Velora Digital" }],
  openGraph: {
    title: "Velora Digital | Beautiful Websites for Local Businesses",
    description:
      "We design fast, mobile-friendly websites for cafes, restaurants, shops, clinics, and local businesses that want more customers and better online visibility.",
    type: "website",
    locale: "en_IN",
    siteName: "Velora Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velora Digital | Beautiful Websites for Local Businesses",
    description:
      "We design fast, mobile-friendly websites for cafes, restaurants, shops, clinics, and local businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0e1a" />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
