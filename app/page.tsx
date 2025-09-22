import Image from "next/image";
import HeroSection from './components/sections/hero-section';

const Section = ({ id, title, children }: { id: string; title: string; children?: React.ReactNode }) => (
  <section id={id} className="max-w-5xl mx-auto py-20 px-4 border-b border-gray-100">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">{title}</h2>
    {children || <p className="text-gray-600">（このセクションは現在準備中です）</p>}
  </section>
);

export default function Home() {
  return (
    <>
      <HeroSection />
      <Section id="first-time" title="初めてのご利用の方" />
      <Section id="purpose" title="お悩みや目的から選ぶ" />
      <Section id="area" title="出張エリア" />
      <Section id="trainer" title="トレーナー" />
      <Section id="price" title="料金" />
      <Section id="reserve" title="おためし予約" />
      <Section id="contact" title="お問い合わせ" />
    </>
  );
}
