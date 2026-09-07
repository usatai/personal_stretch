import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FirstTimeBanner from "@/app/components/price/first-time-banner";
import SinglePriceCards from "@/app/components/price/single-price-cards";

/**
 * トップページ用の料金ダイジェスト。
 * 単発料金のみを見せ、回数券・学生割引は /price へ誘導する。
 */
const PriceSection = () => (
  <div className="w-full">
    <div className="mb-10">
      <FirstTimeBanner />
    </div>

    <SinglePriceCards />

    {/* 回数券・学生割引への導線 */}
    <div className="mt-8 rounded-2xl border border-cyan-100 bg-linear-to-br from-cyan-50/70 to-white px-6 py-6 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1">
        <p className="text-sm font-bold text-slate-700">回数券・学生割引もご用意しています</p>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          新規限定3回券（15%OFF）、4回・8回・12回券（最大9%OFF）、学生割引（20%OFF）。
        </p>
      </div>
      <Link
        href="/price"
        className="btn-cyan inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm shrink-0"
      >
        料金をすべて見る
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>

    <p className="mt-6 text-center text-xs text-slate-400">
      ※ 表示価格はすべて税込です。出張費は対象エリアによって異なる場合があります。
    </p>
  </div>
);

export default PriceSection;
