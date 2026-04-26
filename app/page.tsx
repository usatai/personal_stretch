import HeroSection from './components/sections/hero-section';
import ConcernsSection from "./components/sections/concerns-section";
import FeaturesSection from './components/sections/features-section';
import TrainerSection from './components/sections/trainer-section';
import PriceSection from "./components/sections/price-section";
import BodyChangeSection from "./components/sections/bodychange-section";
import AreaSection from "./components/sections/area-section";
import ContactSection from "./components/sections/contact-section";
import FooterSection from './components/sections/footer-section';
import { ScrollReveal } from './components/ui/scroll-reveal';

interface SectionProps {
  id: string;
  subTitle: string;
  mainTitle: string;
  children: React.ReactNode;
  className?: string;
}

const Section = ({ id, subTitle, mainTitle, children, className = "" }: SectionProps) => (
  <section id={id} className={`py-24 sm:py-28 ${className}`}>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal className="text-center mb-16 md:mb-20">
        <span className="eyebrow">{subTitle}</span>
        <h2 className="heading-jp mt-4 text-3xl md:text-4xl lg:text-[2.6rem] font-black text-slate-800 leading-tight">
          {mainTitle}
        </h2>
        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-cyan-300 rounded-full" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          <div className="h-px w-8 bg-cyan-300 rounded-full" />
        </div>
      </ScrollReveal>
      <div>{children}</div>
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      <HeroSection />
      <ConcernsSection />
      <FeaturesSection />

      {/* TRAINER */}
      <Section
        id="trainer"
        subTitle="TRAINER"
        mainTitle="トレーナー紹介"
        className="bg-white"
      >
        <ScrollReveal>
          <TrainerSection />
        </ScrollReveal>
      </Section>

      {/* CHANGES */}
      <Section
        id="purpose"
        subTitle="CHANGES"
        mainTitle="お客様の変化"
        className="bg-linear-to-br from-cyan-50/70 to-white"
      >
        <ScrollReveal>
          <BodyChangeSection
            cases={[
              { beforeSrc: "/images/before1.png", afterSrc: "/images/after1.png" },
              { beforeSrc: "/images/before2.png", afterSrc: "/images/after2.png" },
              { beforeSrc: "/images/before3.png", afterSrc: "/images/after3.png" },
            ]}
          />
        </ScrollReveal>
      </Section>

      {/* AREA */}
      <Section
        id="area"
        subTitle="AREA"
        mainTitle="出張エリア"
        className="bg-white"
      >
        <ScrollReveal>
          <AreaSection />
        </ScrollReveal>
      </Section>

      {/* PRICE */}
      <Section
        id="price"
        subTitle="PRICE"
        mainTitle="料金・コース"
        className="bg-linear-to-br from-cyan-50/70 to-white"
      >
        <ScrollReveal>
          <PriceSection />
        </ScrollReveal>
      </Section>

      {/* CONTACT */}
      <Section
        id="contact"
        subTitle="CONTACT"
        mainTitle="ご予約・お問い合わせ"
        className="bg-white"
      >
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
      </Section>

      <FooterSection />
    </>
  );
}
