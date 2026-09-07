import type { Metadata } from "next";
import PageHero from "@/app/components/layout/page-hero";
import Section from "@/app/components/layout/section";
import CtaBand from "@/app/components/layout/cta-band";
import TrainerSection from "@/app/components/sections/trainer-section";
import { ScrollReveal } from "@/app/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "トレーナー紹介",
  description:
    "Reborn Stretch のトレーナー 田島樹騎邪をご紹介します。JSA-CSTP（日本ストレッチ協会ストレッチングトレーナーパートナー）認定、大阪リゾート&スポーツ専門学校卒。",
  alternates: { canonical: "/trainer" },
  openGraph: {
    title: "トレーナー紹介｜Reborn Stretch",
    description: "JSA-CSTP認定トレーナーが、完全マンツーマンであなたの身体をサポートします。",
    url: "/trainer",
  },
};

export default function TrainerPage() {
  return (
    <>
      <PageHero
        eyebrow="TRAINER"
        title="トレーナー紹介"
        lead="施術を担当するトレーナーのプロフィールです。保有資格・経歴と、施術で大切にしている考え方をご紹介します。"
      />

      {/* 見出しは PageHero の h1 に一本化している（重複を避けるため） */}
      <Section className="bg-white">
        <ScrollReveal>
          <TrainerSection />
        </ScrollReveal>
      </Section>

      <CtaBand
        links={[
          { label: "サービス紹介を見る", href: "/about" },
          { label: "お客様の変化を見る", href: "/results" },
        ]}
      />
    </>
  );
}
