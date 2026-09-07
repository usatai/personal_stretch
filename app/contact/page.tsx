import type { Metadata } from "next";
import PageHero from "@/app/components/layout/page-hero";
import Section from "@/app/components/layout/section";
import ContactSection from "@/app/components/sections/contact-section";
import { ScrollReveal } from "@/app/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "ご予約・お問い合わせ",
  description:
    "Reborn Stretch のご予約・お問い合わせフォーム。ご希望のコースと日時をご入力ください。初回は全コース50%OFF。ご相談だけでも承ります。",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "ご予約・お問い合わせ｜Reborn Stretch",
    description: "ご希望の日時とコースをご入力ください。初回は全コース50%OFF。",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="ご予約・お問い合わせ"
        lead="下記フォームよりご予約を承ります。ご相談・ご質問のみでも構いません。内容を確認のうえ、担当者より折り返しご連絡いたします。"
      />

      {/* 見出しは PageHero の h1 とフォームカードのヘッダー帯に委ねる */}
      <Section className="bg-white">
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
      </Section>
    </>
  );
}
