import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PriceSummary from "@/app/components/price/price-summary";

/**
 * トップページ用の料金ダイジェスト。
 *
 * ★単発料金の「金額だけ」を見せる。特徴リストやコース別の予約ボタンは /price の仕事。
 *   ここに SinglePriceCards（/price の詳細カード）を置かないこと。
 * ★FirstTimeBanner も置かないこと。この Section の lead と PriceSummary の初回価格で
 *   50%OFF はすでに2回伝わっており、バナーを足すと同じ画面で3回繰り返すことになる。
 *   バナーは /price 側の見出しとして使う。
 */
const PriceSection = () => (
  <div className="w-full">
    <PriceSummary />

    {/* 回数券・学生割引への導線 */}
    <div className="mt-8 rounded-2xl border border-cyan-100 bg-linear-to-br from-cyan-50/70 to-white px-6 py-6 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1">
        <p className="text-base font-bold text-slate-700">回数券・学生割引もご用意しています</p>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed">
          新規限定3回券（15%OFF）、4回・8回・12回券（最大9%OFF）、学生割引（20%OFF）。
        </p>
      </div>
      <Link
        href="/price"
        className="btn-cyan inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-full text-base shrink-0"
      >
        料金をすべて見る
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>

    <p className="mt-6 text-center text-sm text-slate-500">
      ※ 表示価格はすべて税込です。出張費は対象エリアによって異なる場合があります。
    </p>
  </div>
);

export default PriceSection;
