import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import FooterSection from "./components/sections/footer-section";
import { COURSES, SITE_CONFIG, TICKET_PLANS } from "./lib/constants";
import { calcFirstTimePrice, calcTicketPrice, discountLabel } from "./lib/pricing";

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

const siteUrl = SITE_CONFIG.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Reborn Stretch｜大阪の訪問パーソナルストレッチ",
    template: "%s｜Reborn Stretch",
  },
  description:
    "店舗不要・出張費無料エリアあり。プロトレーナーがご自宅へ伺う完全マンツーマンの訪問パーソナルストレッチ。大手企業仕込みの技術で柔軟性・姿勢・慢性疲労を根本から改善。大阪・北摂・東大阪・堺対応。初回体験50%OFF、回数券・学生割引あり。",
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
    "ストレッチ 回数券",
    "ストレッチ 学生割引",
    "柔軟性改善",
    "姿勢改善",
    "Reborn Stretch",
  ],
  authors: [{ name: "Reborn Stretch" }],
  creator: "Reborn Stretch",
  publisher: "Reborn Stretch",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "Reborn Stretch",
    title: "Reborn Stretch｜大阪の訪問パーソナルストレッチ",
    description:
      "大阪・北摂・東大阪・堺エリア対応。プロトレーナーによる完全マンツーマンの訪問パーソナルストレッチ。初回体験50%OFF・回数券・学生割引あり。",
    images: [
      {
        url: SITE_CONFIG.ogImage,
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
      "大阪・北摂・東大阪・堺エリア対応。プロトレーナーによる完全マンツーマンの訪問パーソナルストレッチ。初回体験50%OFF・回数券・学生割引あり。",
    images: [SITE_CONFIG.ogImage],
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

/**
 * 構造化データの Offer 一覧。
 * 価格は pricing.ts の算出結果をそのまま使い、ここで数値をハードコードしない。
 */
const offers = [
  ...COURSES.map((course) => ({
    "@type": "Offer" as const,
    name: `${course.label}（単発）`,
    price: String(course.basePrice),
    priceCurrency: "JPY",
    description: course.catchCopy,
  })),
  ...COURSES.map((course) => ({
    "@type": "Offer" as const,
    name: `${course.label}（初回体験 50%OFF）`,
    price: String(calcFirstTimePrice(course)),
    priceCurrency: "JPY",
    description: "初めてご利用の方の1回目のみ適用される体験価格。",
  })),
  ...TICKET_PLANS.flatMap((plan) =>
    COURSES.map((course) => ({
      "@type": "Offer" as const,
      name: `${course.label} ${plan.label}（${discountLabel(plan.discountRate)}）`,
      price: String(calcTicketPrice(course, plan).total),
      priceCurrency: "JPY",
      description: `${course.label}を${plan.sessions}回分まとめてご購入いただけます。`,
    }))
  ),
];

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
  sameAs: [SITE_CONFIG.instagram],
  address: {
    "@type": "PostalAddress",
    addressRegion: "大阪府",
    addressCountry: "JP",
  },
  areaServed: [
    { "@type": "City", name: "大阪市" },
    { "@type": "AdministrativeArea", name: "北摂エリア" },
    { "@type": "City", name: "東大阪市" },
    { "@type": "City", name: "八尾市" },
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
  makesOffer: offers,
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
        <main>{children}</main>
        <FooterSection />
      </body>
    </html>
  );
}
