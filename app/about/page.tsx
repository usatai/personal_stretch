import type { Metadata } from "next";
import PageHero from "@/app/components/layout/page-hero";
import CtaBand from "@/app/components/layout/cta-band";
import FeaturesSection from "@/app/components/sections/features-section";

export const metadata: Metadata = {
  title: "サービス紹介",
  description:
    "Reborn Stretch は大阪の訪問パーソナルストレッチ。プロトレーナーによる完全マンツーマン指導と移動時間ゼロの出張施術で、柔軟性・姿勢・慢性疲労を根本から改善します。",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "サービス紹介｜Reborn Stretch",
    description:
      "完全マンツーマン指導 × 移動時間ゼロの出張施術。ダイナミック／スタティック2種類のストレッチを融合したオーダーメイドプログラム。",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT"
        title="サービス紹介"
        lead="Reborn Stretch の施術内容と、選ばれている2つの理由をご紹介します。ダイナミック／スタティック2種類のストレッチを融合させた、あなただけのプログラムをご提供します。"
      />

      <FeaturesSection />

      <CtaBand
        links={[
          { label: "トレーナーを見る", href: "/trainer" },
          { label: "料金・コースを見る", href: "/price" },
          { label: "お客様の変化を見る", href: "/results" },
        ]}
      />
    </>
  );
}
