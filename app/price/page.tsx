import type { Metadata } from "next";
import PageHero from "@/app/components/layout/page-hero";
import Section from "@/app/components/layout/section";
import CtaBand from "@/app/components/layout/cta-band";
import { ScrollReveal } from "@/app/components/ui/scroll-reveal";
import FirstTimeBanner from "@/app/components/price/first-time-banner";
import SinglePriceCards from "@/app/components/price/single-price-cards";
import NewcomerGuide from "@/app/components/price/newcomer-guide";
import NewcomerTicket from "@/app/components/price/newcomer-ticket";
import TicketTable from "@/app/components/price/ticket-table";
import StudentPrice from "@/app/components/price/student-price";
import DiscountRules from "@/app/components/price/discount-rules";
import PriceNotes from "@/app/components/price/price-notes";

export const metadata: Metadata = {
  title: "料金・コース",
  description:
    "Reborn Stretch の料金一覧。40分6,000円／60分9,000円／80分12,000円。初回体験は全コース50%OFF、新規限定3回券15%OFF、4回・8回・12回券は最大9%OFF、学生割引20%OFF（単発のみ）。",
  alternates: { canonical: "/price" },
  openGraph: {
    title: "料金・コース｜Reborn Stretch",
    description:
      "単発料金・初回体験50%OFF・新規限定3回券・回数券・学生割引まで、Reborn Stretch の料金をすべて掲載しています。",
    url: "/price",
  },
};

export default function PricePage() {
  return (
    <>
      <PageHero
        eyebrow="PRICE"
        title="料金・コース"
        lead="40分・60分・80分の3コースをご用意しています。単発（都度払い）のほか、続けやすい回数券と学生割引もございます。"
      />

      {/* 初回体験バナー */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <ScrollReveal>
          <FirstTimeBanner />
        </ScrollReveal>
      </div>

      {/* 単発料金 */}
      <Section
        id="single"
        subTitle="SINGLE"
        mainTitle="単発料金（都度払い）"
        lead="まずは1回試したい方、ご自身のペースで通いたい方向けの都度払いです。"
        className="bg-white"
      >
        <ScrollReveal>
          <SinglePriceCards />
        </ScrollReveal>
      </Section>

      {/* 初めての方へ */}
      <Section
        id="newcomer"
        subTitle="FOR BEGINNERS"
        mainTitle="初めての方へ"
        lead="初めてご利用の方には2つのお得なプランをご用意しています。目的に合わせてお選びください。"
        className="bg-linear-to-br from-cyan-50/70 to-white"
      >
        <ScrollReveal>
          <NewcomerGuide />
        </ScrollReveal>
        <ScrollReveal className="mt-14">
          <NewcomerTicket />
        </ScrollReveal>
      </Section>

      {/* 回数券 */}
      <Section
        id="ticket"
        subTitle="TICKET"
        mainTitle="回数券"
        lead="継続してご利用いただく方向けの回数券です。回数が多いほど1回あたりの料金がお得になります。"
        className="bg-white"
      >
        <ScrollReveal>
          <TicketTable />
        </ScrollReveal>
      </Section>

      {/* 学生割引 */}
      <Section
        id="student"
        subTitle="STUDENT"
        mainTitle="学生割引"
        lead="学生の方は単発料金が20%OFF。部活動やスポーツに取り組む方のコンディショニングにもご利用いただけます。"
        className="bg-linear-to-br from-cyan-50/70 to-white"
      >
        <ScrollReveal>
          <StudentPrice />
        </ScrollReveal>
      </Section>

      {/* 割引ルール・注意事項 */}
      <Section
        id="rules"
        subTitle="NOTES"
        mainTitle="割引の適用ルール"
        lead="各割引の併用はできません。ご不明な点はお気軽にお問い合わせください。"
        className="bg-white"
      >
        <ScrollReveal>
          <DiscountRules />
        </ScrollReveal>
        <ScrollReveal className="mt-10">
          <h3 className="heading-jp text-lg font-bold text-slate-800 mb-4">ご利用にあたって</h3>
          <PriceNotes />
        </ScrollReveal>
      </Section>

      <CtaBand
        title="ご希望のコースが決まりましたら"
        lead="ご予約フォームからお気軽にお申し込みください。ご相談だけでも承ります。"
        links={[
          { label: "よくある質問を見る", href: "/faq" },
          { label: "出張エリアを確認する", href: "/area" },
        ]}
      />
    </>
  );
}
