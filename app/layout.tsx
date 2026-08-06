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
  metadataBase: new URL("https://vnutrennyaya-opora.circlealgorythm.chatgpt.site"),
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${cormorant.variable} ${golos.variable}`}>{children}</body>
    </html>
  );
}
