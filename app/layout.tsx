import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const siteUrl = "https://www.reborn-stretch.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Reborn Stretch｜大阪の訪問パーソナルストレッチ",
    template: "%s｜Reborn Stretch",
  },
  description:
    "大阪・北摂・東大阪・堺エリア対応。大手企業で培った技術を持つプロトレーナーによる完全マンツーマンの訪問パーソナルストレッチ。柔軟性・姿勢・疲労感を根本から改善。初回体験50%OFF。出張費無料。",
  keywords: [
    "訪問パーソナルストレッチ",
    "出張ストレッチ",
    "大阪 ストレッチ",
    "パーソナルストレッチ 大阪",
    "訪問 ストレッチ 大阪",
    "北摂 ストレッチ",
    "東大阪 ストレッチ",
    "堺 ストレッチ",
    "マンツーマン ストレッチ",
    "柔軟性改善",
    "姿勢改善",
    "Reborn Stretch",
  ],
  authors: [{ name: "Reborn Stretch" }],
  creator: "Reborn Stretch",
  publisher: "Reborn Stretch",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "Reborn Stretch",
    title: "Reborn Stretch｜大阪の訪問パーソナルストレッチ",
    description:
      "大阪・北摂・東大阪・堺エリア対応。プロトレーナーによる完全マンツーマンの訪問パーソナルストレッチ。初回体験50%OFF・出張費無料。",
    images: [
      {
        url: "/images/stretchPC.png",
        width: 1200,
        height: 630,
        alt: "Reborn Stretch - 大阪の訪問パーソナルストレッチ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reborn Stretch｜大阪の訪問パーソナルストレッチ",
    description:
      "大阪・北摂・東大阪・堺エリア対応。プロトレーナーによる完全マンツーマンの訪問パーソナルストレッチ。初回体験50%OFF。",
    images: ["/images/stretchPC.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": siteUrl,
  name: "Reborn Stretch",
  description:
    "大阪・北摂・東大阪・堺エリア対応の訪問パーソナルストレッチサービス。プロトレーナーによる完全マンツーマン指導。",
  url: siteUrl,
  priceRange: "¥¥",
  image: `${siteUrl}/images/trainer.jpg`,
  address: {
    "@type": "PostalAddress",
    addressRegion: "大阪府",
    addressCountry: "JP",
  },
  areaServed: [
    { "@type": "City", name: "大阪市" },
    { "@type": "AdministrativeArea", name: "北摂エリア" },
    { "@type": "City", name: "東大阪市" },
    { "@type": "City", name: "堺市" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "21:00",
  },
  offers: [
    {
      "@type": "Offer",
      name: "40分コース（初回体験）",
      price: "3000",
      priceCurrency: "JPY",
      description: "初回体験50%OFF。気になる部位を集中ケア。",
    },
    {
      "@type": "Offer",
      name: "60分コース（初回体験）",
      price: "4500",
      priceCurrency: "JPY",
      description: "初回体験50%OFF。全身をしっかりメンテナンス。",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerifJP.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
