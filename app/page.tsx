import Image from "next/image";
import HeroSection from './components/sections/hero-section';
import ConcernsSection from "./components/sections/concerns-section";
import FeatureLayout from './components/feature-layout';
import Contact from './components/contact';
import TrainerSection from './components/sections/trainer-section';
import PriceSection from "./components/sections/price-section";

// Sectionコンポーネントの新しいprops定義
interface SectionProps {
    id: string;
    subTitle: string; // 例: "FEATURES"
    mainTitle: string; // 例: "田島ストレッチの特徴"
    children: React.ReactNode;
    className?: string; // 背景色などを指定するため
  }
  
const Section = ({ id, subTitle, mainTitle, children, className = "" }: SectionProps) => (
    <section id={id} className={`py-20 sm:py-24 ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 中央寄せのタイトルブロック */}
        <div className="text-center mb-16">
          <p className="text-base font-semibold text-blue-600 tracking-wider uppercase">
            {subTitle}
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            {mainTitle}
          </h2>
        </div>
  
        {/* 各セクションの具体的な内容 */}
        <div>
          {children}
        </div>
      </div>
    </section>
);

export default function Home() {
    const feature1Description = `あなたの身体の状態や目標に合わせて、経験豊富なトレーナーが最適なストレッチプログラムをオーダーメイドで作成します。
  一人ひとりの身体の癖や可動域を正確に見極め、根本的な改善を目指します。`;
  
    const feature2Description = `店舗に通う必要はありません。ご指定の場所にトレーナーがお伺いするため、移動の手間や時間を完全にカットできます。
  リラックスできるプライベートな空間で、最高のコンディショニングをご体験ください。`;
  return (
    <>
      <HeroSection />
      <ConcernsSection />

      {/* 3. 新しいSectionとFeatureLayoutを使ってコンテンツを配置 */}
      <Section id="first-time" subTitle="FEATURES" mainTitle="田島ストレッチの特徴" className="bg-white">
        <div className="space-y-20">
          <FeatureLayout
            imageSrc="/images/pro-stretch.jpeg" 
            alt="トレーナーがマンツーマンで指導している様子"
            title="プロのトレーナーによる完全マンツーマン指導"
            description={feature1Description}
            imageClassName="rounded-2xl"
          />
          <FeatureLayout
            imageSrc="/images/stretchBed.png" 
            alt="自宅でリラックスしながらストレッチを受ける様子"
            title="ご自宅で受けられるから、移動時間ゼロ"
            description={feature2Description}
            reverse={true} 
          />
        </div>
      </Section>

      <Section id="purpose" subTitle="SERVICES" mainTitle="お悩みや目的から選ぶ" className="bg-slate-50">
        <p className="text-center text-gray-600">（このセクションは現在準備中です）</p>
      </Section>

      <Section id="area" subTitle="AREA" mainTitle="出張エリア">
         <p className="text-center text-gray-600">（このセクションは現在準備中です）</p>
      </Section>

      <Section id="trainer" subTitle="TRAINER" mainTitle="トレーナー" className="bg-slate-50">
        <TrainerSection />
      </Section>

      <Section id="price" subTitle="PRICE" mainTitle="料金">
        <PriceSection />
      </Section>

      <Section id="contact" subTitle="Contact" mainTitle="お問い合わせ" className="bg-slate-50">
        <div className="space-y-20">
            <Contact />
        </div>
      </Section>
    </>
  );
}
