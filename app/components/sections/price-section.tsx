'use client';

import { PRICING } from "@/app/lib/constants";
import { Check } from "lucide-react";

const pricing = [
  {
    ...PRICING.trial,
    isPopular: false,
    features: ['気になる部位を集中ケア', '短時間でスッキリしたい方向け', '初回体験に最適'],
  },
  {
    ...PRICING.regular,
    isPopular: true,
    features: ['全身をしっかりメンテナンス', 'バランス良くケアしたい方向け', '最も人気のコース'],
  },
  {
    ...PRICING.highgrade,
    isPopular: false,
    features: ['より集中的なケア', 'ハイグレードな施術内容', 'じっくり時間をかけたい方向け'],
  },
];

const PriceSection = () => (
  <section aria-labelledby="pricing-title" className="w-full">
    {/* 初回割引バナー */}
    <div className="mb-10 rounded-2xl overflow-hidden shadow-cyan">
      <div className="bg-linear-to-r from-cyan-600 to-cyan-700 px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
        <span className="text-white font-black text-lg md:text-xl tracking-wide">
          初回ストレッチ
        </span>
        <span className="bg-white text-cyan-700 font-black text-lg md:text-xl px-4 py-0.5 rounded-full">
          全コース 50% OFF
        </span>
        <span className="text-cyan-100 text-sm">— 当日その場で割引適用</span>
      </div>
    </div>

    <div className="grid gap-5 md:grid-cols-3">
      {pricing.map((plan, index) => (
        <article
          key={index}
          className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
            plan.isPopular
              ? 'ring-2 ring-cyan-500 shadow-cyan-lg scale-[1.02] bg-white'
              : 'card-premium bg-white'
          }`}
        >
          {/* 人気ラベル */}
          {plan.isPopular && (
            <div className="bg-linear-to-r from-cyan-500 to-cyan-600 text-white text-[11px] font-bold tracking-widest uppercase text-center py-2 px-4">
              Most Popular
            </div>
          )}

          <div className="p-6 md:p-7 flex flex-col flex-1">
            {/* コース名 */}
            <h3 className="heading-jp text-xl font-bold text-slate-800 mb-1">{plan.duration}</h3>
            <div className="w-8 h-0.5 rounded-full bg-linear-to-r from-cyan-400 to-cyan-600 mb-4" />

            {/* 通常価格 */}
            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="text-3xl md:text-4xl font-black text-slate-900">
                ¥{plan.price}
              </span>
              <span className="text-slate-500 text-sm">（税込）</span>
            </div>

            {/* 初回割引価格 */}
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-6 self-start">
              <span className="text-[11px] font-bold text-orange-600">初回限定 50% OFF</span>
              <span className="font-black text-slate-800 text-sm">→ ¥{plan.firstprice}</span>
            </div>

            {/* 特徴リスト */}
            <ul className="space-y-2.5 flex-1">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <span className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-cyan-600 stroke-[2.5]" />
                  </span>
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>

    <p className="mt-6 text-center text-xs text-slate-400">
      ※ 出張費は対象エリアによって異なる場合があります。詳しくはお問い合わせください。
    </p>
  </section>
);

export default PriceSection;
