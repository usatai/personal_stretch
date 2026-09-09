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

// width / height は画像の実寸。縦横比がずれると姿勢写真が切り取られるため、
// 画像を差し替えたときは必ず実寸に更新すること。
const cases = [
  { beforeSrc: "/images/before1.webp", afterSrc: "/images/after1.webp", width: 478, height: 770 },
  { beforeSrc: "/images/before2.webp", afterSrc: "/images/after2.webp", width: 606, height: 812 },
  { beforeSrc: "/images/before3.webp", afterSrc: "/images/after3.webp", width: 608, height: 816 },
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
