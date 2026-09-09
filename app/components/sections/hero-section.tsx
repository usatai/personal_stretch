import { ArrowRight, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

const heroBGSrc = "/images/pro-stretch.jpeg";

const HeroSection: FC = () => {
  const textContent = (
    <>
      {/* バッジ */}
      <div className="anim-fade-left mb-5 md:mb-7">
        <span className="inline-flex items-center gap-2.5 bg-linear-to-r from-cyan-500 to-cyan-600 text-white text-xs md:text-sm font-bold px-5 py-2 rounded-full shadow-[0_4px_16px_rgba(6,182,212,0.45)] tracking-wide">
          <Home className="w-3.5 h-3.5 shrink-0" />
          訪問パーソナルストレッチ
        </span>
      </div>

      {/* メインコピー */}
      <h1 className="heading-jp anim-fade-up delay-100 text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.2rem] font-black text-slate-800 leading-[1.2] mb-5 md:mb-6">
        体の芯から<br />
        <span className="text-gradient">本物のストレッチ体験</span>
        <span className="text-slate-800">を。</span>
      </h1>

      {/* サブコピー */}
      <p className="anim-fade-up delay-200 text-base text-slate-600 leading-relaxed mb-8 md:mb-10 font-medium">
        大手企業で培った技術を持つトレーナーによるパーソナル施術で<br className="hidden lg:inline" />
        柔軟性・姿勢・疲労感を根本から改善。<br />
        <span className="text-cyan-700 font-semibold">初回体験キャンペーン実施中。</span>今すぐご予約を。
      </p>

      {/* CTAボタン */}
      <div className="anim-fade-up delay-300 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Link
          href="/contact"
          className="btn-cyan inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold"
          aria-label="ご予約・お問い合わせページへ"
        >
          無料相談・ご予約はこちら
          <ArrowRight className="w-5 h-5 stroke-2" />
        </Link>
        <span className="text-sm text-slate-500 font-medium">
          初回 <span className="text-cyan-700 font-bold">50% OFF</span>
        </span>
      </div>

      {/* 実績バッジ群 */}
      <div className="anim-fade-up delay-400 mt-8 flex flex-wrap gap-2">
        {[
          { label: '実績豊富',   sub: 'JSA公認資格保持' },
          { label: '完全訪問型', sub: 'ご自宅まで伺います' },
          { label: '大阪全域',   sub: '出張費無料エリアあり' },
        ].map((b) => (
          <div key={b.label} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-cyan-100 rounded-full px-3 py-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
            <span className="text-xs font-bold text-slate-700">{b.label}</span>
            <span className="text-xs text-slate-500">{b.sub}</span>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <section className="relative w-full min-h-[88svh] flex items-center justify-center overflow-hidden">

      {/* 背景画像レイヤー */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBGSrc}
          alt="ストレッチ施術のイメージ"
          fill
          sizes="100vw"
          className="object-cover object-[50%_15%] scale-[1.15] transition-none"
          priority
        />

        {/* SP: 全体に白をかぶせてテキストを読みやすく */}
        <div className="absolute inset-0 bg-white/80 md:hidden" />
        {/* PC: 左から白グラデーション */}
        <div className="absolute inset-0 hidden md:block bg-linear-to-r from-white/96 via-white/85 to-white/30" />
        {/* 上下の縁なじませ */}
        <div className="absolute inset-0 bg-linear-to-t from-white/40 via-transparent to-white/20" />
        {/* シアンの色調 */}
        <div className="absolute inset-0 bg-cyan-600/5" />
      </div>

      {/* 装飾ライン（PCのみ） */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10 opacity-25 hidden md:flex flex-col items-center gap-3">
        <div className="w-px h-24 bg-linear-to-b from-transparent via-cyan-400 to-transparent" />
        <span className="text-xs tracking-[0.25em] text-cyan-700 font-bold uppercase rotate-90 whitespace-nowrap origin-center translate-y-2">Personal Stretch</span>
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-24 md:py-28">
        <div className="max-w-2xl">
          {textContent}
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs tracking-widest uppercase text-slate-500 font-semibold">Scroll</span>
        <div className="w-px h-7 bg-linear-to-b from-cyan-400 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
