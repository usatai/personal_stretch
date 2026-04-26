import Image from 'next/image';
import { ScrollReveal } from '@/app/components/ui/scroll-reveal';
import { Check, Zap, Wind } from 'lucide-react';

const feature1Desc =
  'あなたの身体の状態や目標に合わせて、経験豊富なトレーナーが最適なストレッチプログラムをオーダーメイドで作成します。一人ひとりの身体の癖や可動域を正確に見極め、根本的な改善を目指します。';

const feature2Desc =
  '店舗に通う必要はありません。ご指定の場所にトレーナーがお伺いするため、移動の手間や時間を完全にカットできます。リラックスできるプライベートな空間で、最高のコンディショニングをご体験ください。';

const dynamicDesc =
  '体を動かしながら筋肉を伸ばし、関節の可動域を広げるウォーミングアップに最適なストレッチ。運動前の準備に最適です。';

const staticDesc =
  '反動をつけずに筋肉をゆっくり気持ちよく伸ばし、そのまま静止するストレッチ方法で1回あたり30秒程度キープします。';

const FeaturesSection = () => (
  <section id="first-time" className="overflow-hidden bg-white">

    {/* ─── セクションヘッダー ─── */}
    <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 pt-24 pb-16 md:pb-20">
      <ScrollReveal>
        <span className="eyebrow">FEATURES</span>
        <h2 className="heading-jp mt-4 text-3xl md:text-4xl lg:text-[2.6rem] font-black text-slate-900 leading-tight">
          Reborn Stretchの特徴
        </h2>
        <div className="mt-5 flex items-center gap-3">
          <div className="h-px w-8 bg-cyan-300 rounded-full" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          <div className="h-px w-8 bg-cyan-300 rounded-full" />
        </div>
      </ScrollReveal>
    </div>

    {/* ─── Feature 01: マンツーマン指導 ─── */}
    <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 pb-24 md:pb-32">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* 画像 */}
        <ScrollReveal direction="left" className="relative">
          <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl bg-cyan-100/50 -z-10" />
          <div className="relative overflow-hidden rounded-3xl aspect-square shadow-[0_20px_60px_rgba(6,182,212,0.14)]">
            <Image
              src="/images/pro-stretch-new.jpeg"
              alt="トレーナーがマンツーマンで指導している様子"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-tr from-cyan-900/20 to-transparent" />
          </div>
        </ScrollReveal>

        {/* テキスト */}
        <ScrollReveal direction="right">
          <span className="font-mono text-[10px] font-black text-cyan-500 tracking-[0.3em] uppercase mb-5 block">
            FEATURE 01
          </span>
          <h3 className="heading-jp text-2xl md:text-3xl lg:text-[2rem] font-black text-slate-900 leading-snug mb-5">
            プロのトレーナーによる<br />完全マンツーマン指導
          </h3>
          <div className="w-10 h-0.5 bg-linear-to-r from-cyan-400 to-cyan-600 mb-6 rounded-full" />
          <p className="text-slate-500 leading-[1.9] text-sm md:text-base mb-8">
            {feature1Desc}
          </p>
          <div className="flex flex-wrap gap-2">
            {["オーダーメイドプログラム", "可動域の精密分析", "根本的な改善"].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 bg-cyan-50 border border-cyan-200 text-cyan-700 text-[11px] font-semibold px-3 py-1.5 rounded-full"
              >
                <Check className="w-3 h-3" />
                {t}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>

    {/* ─── Stretch Types: コントラストパネル ─── */}
    <ScrollReveal>
      <div className="relative">
        <div className="grid md:grid-cols-2">

          {/* Dynamic（ダーク） */}
          <div className="relative bg-slate-900 px-8 sm:px-12 lg:px-16 py-16 md:py-20 overflow-hidden">
            {/* 背景グロー */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

            <p className="font-mono text-[9px] font-black text-cyan-500 tracking-[0.3em] uppercase mb-4">TYPE 01</p>
            <h3 className="heading-jp text-3xl md:text-4xl font-black text-white leading-tight mb-2">
              ダイナミック<br />ストレッチ
            </h3>
            <p className="text-cyan-400/80 text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
              Dynamic Stretch
            </p>
            <div className="w-8 h-px bg-cyan-500 mb-6" />
            <p className="text-slate-400 leading-[1.9] text-sm md:text-base max-w-xs mb-8">
              {dynamicDesc}
            </p>
            <span className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold px-4 py-2 rounded-full border border-cyan-500/20">
              <Zap className="w-3 h-3" />
              運動前・ウォームアップ向け
            </span>
          </div>

          {/* Static（ライト） */}
          <div className="relative bg-cyan-50 px-8 sm:px-12 lg:px-16 py-16 md:py-20 overflow-hidden">
            {/* 背景ライングロー */}
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-cyan-200/40 rounded-full blur-3xl pointer-events-none" />

            <p className="font-mono text-[9px] font-black text-cyan-600 tracking-[0.3em] uppercase mb-4">TYPE 02</p>
            <h3 className="heading-jp text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-2">
              スタティック<br />ストレッチ
            </h3>
            <p className="text-cyan-600/80 text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
              Static Stretch
            </p>
            <div className="w-8 h-px bg-cyan-500 mb-6" />
            <p className="text-slate-600 leading-[1.9] text-sm md:text-base max-w-xs mb-8">
              {staticDesc}
            </p>
            <span className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 text-[11px] font-bold px-4 py-2 rounded-full border border-cyan-200">
              <Wind className="w-3 h-3" />
              疲労回復・柔軟性向上向け
            </span>
          </div>
        </div>

        {/* 融合バッジ（PCのみ）*/}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center pointer-events-none gap-1">
          <div className="w-px h-6 bg-linear-to-b from-transparent via-white/50 to-white/50" />
          <div className="flex flex-col items-center bg-white shadow-lg border border-cyan-100 rounded-2xl px-3 py-2 gap-0.5">
            <span className="text-[9px] font-black text-cyan-500 tracking-[0.2em] uppercase">Fusion</span>
            <span className="text-lg font-black text-transparent bg-clip-text bg-linear-to-b from-slate-700 to-cyan-500 leading-none">+</span>
          </div>
          <div className="w-px h-6 bg-linear-to-b from-white/50 via-white/50 to-transparent" />
        </div>

        {/* 区切り文 */}
        <div className="bg-white/90 backdrop-blur-sm text-center py-5 px-4">
          <p className="text-xs text-slate-400 font-medium">
            2種類を融合させることで
            <span className="text-cyan-600 font-bold mx-1">相乗効果</span>
            が生まれ、柔軟性・疲労回復・パフォーマンス向上を同時に実現します
          </p>
        </div>
      </div>
    </ScrollReveal>

    {/* ─── Feature 02: 移動時間ゼロ ─── */}
    <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-24 md:py-32">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* テキスト（左） */}
        <ScrollReveal direction="left">
          <span className="font-mono text-[10px] font-black text-cyan-500 tracking-[0.3em] uppercase mb-5 block">
            FEATURE 02
          </span>
          <h3 className="heading-jp text-2xl md:text-3xl lg:text-[2rem] font-black text-slate-900 leading-snug mb-5">
            移動時間ゼロ
          </h3>
          <div className="w-10 h-0.5 bg-linear-to-r from-cyan-400 to-cyan-600 mb-6 rounded-full" />

          {/* スタット */}
          <div className="flex items-baseline gap-2 mb-8">
            <span className="font-black text-8xl leading-none text-gradient">0</span>
            <div>
              <p className="font-black text-xl text-slate-300">分</p>
              <p className="text-xs text-slate-400 font-medium whitespace-nowrap">の移動時間</p>
            </div>
          </div>

          <p className="text-slate-500 leading-[1.9] text-sm md:text-base mb-8">
            {feature2Desc}
          </p>

          <div className="flex flex-wrap gap-2">
            {["ご自宅", "ホテル", "オフィス"].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-semibold px-3 py-1.5 rounded-full"
              >
                <Check className="w-3 h-3 text-cyan-500" />
                {t}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* 画像（右） */}
        <ScrollReveal direction="right" className="flex justify-center">
          <div className="relative">
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl bg-cyan-100/60 -z-10" />
            <div className="relative overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(6,182,212,0.12)] bg-linear-to-br from-cyan-50 to-white p-4">
              <Image
                src="/images/stretch-bed2.png"
                alt="ストレッチベッド持参"
                width={373}
                height={315}
                className="w-full max-w-150 h-auto object-contain mx-auto"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
