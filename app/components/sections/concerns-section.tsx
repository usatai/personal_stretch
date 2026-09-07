import Link from 'next/link';
import { ScrollReveal } from '@/app/components/ui/scroll-reveal';
import { ArrowRight } from 'lucide-react';

const concerns = [
  { num: "01", jp: "肩こりや腰痛が慢性化している",           en: "Chronic pain" },
  { num: "02", jp: "マッサージに行ってもすぐ元に戻ってしまう", en: "Temporary relief" },
  { num: "03", jp: "運動不足だが、何をすればいいかわからない", en: "No direction" },
  { num: "04", jp: "自宅で気軽にプロのケアを受けたい",        en: "Need convenience" },
];

const ConcernsSection = () => (
  <section id="concerns" className="relative bg-slate-950 overflow-hidden">
    {/* 装飾グロー */}
    <div className="absolute -top-24 -right-24 w-120 h-120 rounded-full bg-cyan-800/15 blur-[130px] pointer-events-none" />
    <div className="absolute -bottom-16 -left-16 w-[320px] h-80 rounded-full bg-cyan-900/12 blur-[100px] pointer-events-none" />

    <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 py-24 sm:py-32">

      {/* ヘッダー（左揃えでエディトリアル感） */}
      <ScrollReveal className="mb-16 md:mb-20">
        <p className="flex items-center gap-3 text-cyan-500 text-[0.68rem] font-black tracking-[0.28em] uppercase mb-5">
          <span className="w-6 h-px bg-cyan-500 inline-block" />
          CONCERNS
        </p>
        <h2 className="heading-jp text-4xl sm:text-5xl md:text-[3.5rem] font-black text-white leading-[1.1]">
          こんなお悩み<br className="sm:hidden" />ありませんか？
        </h2>
        <p className="mt-5 text-white/35 text-sm max-w-md leading-relaxed">
          身体に関する悩みはひとつでも放置すると慢性化します。<br />
          まずはお気軽にご相談ください。
        </p>
      </ScrollReveal>

      {/* 番号付きリスト */}
      <div className="border-t border-white/8">
        {concerns.map((c, i) => (
          <ScrollReveal key={i} delay={i * 65} direction="left">
            <div className="group relative flex items-center gap-5 md:gap-10 py-8 md:py-10 border-b border-white/8 cursor-default overflow-hidden">

              {/* ホバー背景スウィープ */}
              <div className="absolute inset-0 bg-white/2.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

              {/* 左アクセントバー */}
              <div className="absolute left-0 top-3 bottom-3 w-0.75 bg-linear-to-b from-cyan-400 to-cyan-600 rounded-full origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-350 ease-out" />

              {/* 番号 */}
              <span className="relative shrink-0 w-8 text-right font-mono text-xs font-black text-cyan-700 group-hover:text-cyan-400 tracking-widest transition-colors duration-300">
                {c.num}
              </span>

              {/* テキスト本体 */}
              <div className="relative flex-1 min-w-0">
                <p className="text-xl md:text-2xl lg:text-[1.65rem] font-bold text-white/65 group-hover:text-white transition-colors duration-300 leading-snug">
                  {c.jp}
                </p>
                <p className="mt-1.5 text-[9px] font-bold tracking-[0.25em] uppercase text-white/18 group-hover:text-cyan-500/55 transition-colors duration-300">
                  {c.en}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* フッター */}
      <ScrollReveal className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <p className="text-white/30 text-sm font-medium">ひとつでも当てはまる方へ —</p>
        <Link
          href="/contact"
          className="text-cyan-400 hover:text-cyan-300 font-bold text-sm flex items-center gap-1.5 transition-colors duration-200"
        >
          Reborn Stretch が解決します
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </ScrollReveal>
    </div>
  </section>
);

export default ConcernsSection;
