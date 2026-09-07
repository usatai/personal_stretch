import type { Metadata } from "next";
import PageHero from "@/app/components/layout/page-hero";
import Section from "@/app/components/layout/section";
import CtaBand from "@/app/components/layout/cta-band";
import FaqSection from "@/app/components/sections/faq-section";
import { ScrollReveal } from "@/app/components/ui/scroll-reveal";
import { FAQ_ITEMS } from "@/app/lib/constants";

export const metadata: Metadata = {
  title: "よくある質問",
  description:
    "Reborn Stretch によくいただくご質問。回数券の種類・学生割引の適用範囲・初回体験50%OFFとの併用可否・出張費・服装や持ち物についてお答えします。",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "よくある質問｜Reborn Stretch",
    description: "料金・回数券・学生割引・出張エリアなど、よくいただくご質問にお答えします。",
    url: "/faq",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        eyebrow="FAQ"
        title="よくある質問"
        lead="料金・回数券・学生割引・出張エリアなど、よくいただくご質問をまとめました。こちらで解決しない場合はお気軽にお問い合わせください。"
      />

      {/* 見出しは PageHero の h1 に一本化している */}
      <Section className="bg-white">
        <ScrollReveal>
          <FaqSection />
        </ScrollReveal>
      </Section>

      <CtaBand
        title="ご不明な点はお気軽にご相談ください"
        lead="ご予約フォームからご質問だけでもお送りいただけます。"
        links={[
          { label: "料金・コースを見る", href: "/price" },
          { label: "出張エリアを確認する", href: "/area" },
        ]}
      />
    </>
  );
}
