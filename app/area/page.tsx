import type { Metadata } from "next";
import PageHero from "@/app/components/layout/page-hero";
import Section from "@/app/components/layout/section";
import CtaBand from "@/app/components/layout/cta-band";
import AreaSection from "@/app/components/sections/area-section";
import { ScrollReveal } from "@/app/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "出張エリア",
  description:
    "Reborn Stretch の出張エリア。大阪市内・北摂（豊中/吹田/茨木/高槻）・東大阪・八尾・堺・南大阪に対応。東大阪・八尾エリアは出張費無料。受付9:00〜21:00。",
  alternates: { canonical: "/area" },
  openGraph: {
    title: "出張エリア｜Reborn Stretch",
    description: "大阪全域に対応。ご自宅・ホテル・オフィスまでトレーナーがお伺いします。",
    url: "/area",
  },
};

export default function AreaPage() {
  return (
    <>
      <PageHero
        eyebrow="AREA"
        title="出張エリア"
        lead="対応エリアと出張費、受付時間をご案内します。記載のないエリアでも対応できる場合がありますので、まずはご相談ください。"
      />

      {/* 見出しは PageHero の h1 に一本化している */}
      <Section className="bg-white">
        <ScrollReveal>
          <AreaSection />
        </ScrollReveal>
      </Section>

      <CtaBand
        title="対応可能かご不明な場合もご相談ください"
        lead="記載のないエリアでも対応できる場合があります。お気軽にお問い合わせください。"
        links={[
          { label: "料金・コースを見る", href: "/price" },
          { label: "よくある質問を見る", href: "/faq" },
        ]}
      />
    </>
  );
}
