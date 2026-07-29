import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vnutrennyaya-opora.circlealgorythm.chatgpt.site"),
  title: "Внутренняя опора — офлайн-программа Айсу Кам",
  description: "Трёхдневная офлайн-программа в Москве: от зависимости от результата — к свободе действовать. 3–5 сентября 2026.",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: "/favicon.ico",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Внутренняя опора",
    description: "От зависимости от результата — к свободе действовать. Москва · 3–5 сентября 2026.",
    url: "/",
    siteName: "Внутренняя опора · Айсу Кам",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/og.png", width: 1729, height: 910, alt: "Внутренняя опора — Москва, 3–5 сентября 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Внутренняя опора",
    description: "Офлайн-программа Айсу Кам · Москва · 3–5 сентября 2026.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d281f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${cormorant.variable} ${manrope.variable}`}>{children}</body>
    </html>
  );
}
