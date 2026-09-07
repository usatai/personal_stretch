import HeroSection from "./components/sections/hero-section";
import ConcernsSection from "./components/sections/concerns-section";
import FeaturesDigestSection from "./components/sections/features-digest-section";
import PriceSection from "./components/sections/price-section";
import Section from "./components/layout/section";
import CtaBand from "./components/layout/cta-band";
import { ScrollReveal } from "./components/ui/scroll-reveal";
import LegacyHashRedirect from "./components/legacy-hash-redirect";

export default function Home() {
  return (
    <>
      {/* 旧LPのアンカーリンク（#price 等）を新ページへ転送する */}
      <LegacyHashRedirect />

      <HeroSection />

      <ConcernsSection />

      {/* 特徴（要約） */}
      <Section
        id="features"
        subTitle="FEATURES"
        mainTitle="Reborn Stretchの特徴"
        lead="プロのトレーナーによる完全マンツーマン指導を、移動時間ゼロでご自宅までお届けします。"
        className="bg-white"
      >
        <ScrollReveal>
          <FeaturesDigestSection />
        </ScrollReveal>
      </Section>

      {/* 料金（抜粋） */}
      <Section
        id="price"
        subTitle="PRICE"
        mainTitle="料金・コース"
        lead="40分・60分・80分の3コース。初めての方は全コース50%OFFでお試しいただけます。"
        className="bg-linear-to-br from-cyan-50/70 to-white"
      >
        <ScrollReveal>
          <PriceSection />
        </ScrollReveal>
      </Section>

      <CtaBand
        links={[
          { label: "サービス紹介", href: "/about" },
          { label: "トレーナー紹介", href: "/trainer" },
          { label: "お客様の変化", href: "/results" },
          { label: "出張エリア", href: "/area" },
          { label: "よくある質問", href: "/faq" },
        ]}
      />
    </>
  );
}
