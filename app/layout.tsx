import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Golos_Text } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://most.aisukam.ru"),
  alternates: {
    canonical: "/",
  },
  title: "Мост ценностей, офлайн-программа Айсу Кам",
  description: "Трёхдневная офлайн-программа в Москве: от зависимости от результата к свободе действовать и осознанности в принятии решений. 3-5 сентября 2026.",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: "/favicon.ico",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Мост ценностей",
    description: "От зависимости от результата к свободе действовать и осознанности в принятии решений. Москва, 3-5 сентября 2026.",
    url: "/",
    siteName: "Мост ценностей · Айсу Кам",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/og.png", width: 1733, height: 907, alt: "Мост ценностей, Москва, 3-5 сентября 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Мост ценностей",
    description: "Офлайн-программа Айсу Кам. Москва, 3-5 сентября 2026.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d281f",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationEvent",
  "name": "Мост ценностей — офлайн-программа Айсу Кам",
  "description": "Трёхдневная офлайн-программа в Москве: от зависимости от результата к свободе действовать и осознанности в принятии решений. 3-5 сентября 2026.",
  "startDate": "2026-09-03",
  "endDate": "2026-09-05",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "Пространство проведения программы",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Москва",
      "addressCountry": "RU",
    },
  },
  "organizer": {
    "@type": "Person",
    "name": "Айсу Кам",
    "url": "https://aisukam.ru",
  },
  "offers": {
    "@type": "Offer",
    "url": "https://most.aisukam.ru",
    "availability": "https://schema.org/LimitedAvailability",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${cormorant.variable} ${golos.variable}`}>{children}</body>
    </html>
  );
}
