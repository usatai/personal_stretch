import { COURSES } from "@/app/lib/constants";
import { calcFirstTimePrice, formatYen } from "@/app/lib/pricing";

/** 初回体験50%OFFの訴求バナー。トップページと料金ページで共用する。 */
const FirstTimeBanner = () => {
  const cheapest = COURSES.reduce((a, b) => (a.basePrice <= b.basePrice ? a : b));

  return (
    <div className="rounded-2xl overflow-hidden shadow-cyan">
      <div className="bg-linear-to-r from-cyan-700 to-cyan-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
        <span className="text-white font-black text-lg md:text-xl tracking-wide">初回ストレッチ</span>
        <span className="bg-white text-cyan-800 font-black text-lg md:text-xl px-4 py-0.5 rounded-full">
          全コース 50% OFF
        </span>
        <span className="text-cyan-50 text-base">
          — {cheapest.label} ¥{formatYen(calcFirstTimePrice(cheapest))}〜
        </span>
      </div>
    </div>
  );
};

export default FirstTimeBanner;
