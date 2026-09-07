import type { Metadata } from "next";
import PageHero from "@/app/components/layout/page-hero";
import Section from "@/app/components/layout/section";
import CtaBand from "@/app/components/layout/cta-band";
import BodyChangeSection from "@/app/components/sections/bodychange-section";
import { ScrollReveal } from "@/app/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "お客様の変化",
  description:
    "Reborn Stretch の施術によるビフォーアフター事例。わずか15分のストレッチでも姿勢や可動域に変化が現れます。写真で変化をご覧ください。",
  alternates: { canonical: "/results" },
  openGraph: {
    title: "お客様の変化｜Reborn Stretch",
    description: "写真でわかるビフォーアフター。施術による身体の変化を直感的にご覧いただけます。",
    url: "/results",
  },
};

const cases = [
  { beforeSrc: "/images/before1.png", afterSrc: "/images/after1.png" },
  { beforeSrc: "/images/before2.png", afterSrc: "/images/after2.png" },
  { beforeSrc: "/images/before3.png", afterSrc: "/images/after3.png" },
];

export default function ResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="CHANGES"
        title="お客様の変化"
        lead="実際に施術を受けられたお客様の写真です。わずか15分のストレッチでも、姿勢や可動域に変化が現れます。"
      />

      {/* 見出しは PageHero の h1 と BodyChangeSection 内の見出しに委ねる */}
      <Section className="bg-linear-to-br from-cyan-50/70 to-white">
        <ScrollReveal>
          <BodyChangeSection cases={cases} />
        </ScrollReveal>
      </Section>

      <CtaBand
        links={[
          { label: "料金・コースを見る", href: "/price" },
          { label: "トレーナーを見る", href: "/trainer" },
        ]}
      />
    </>
  );
}
