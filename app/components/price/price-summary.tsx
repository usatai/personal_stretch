import { COURSES } from "@/app/lib/constants";
import { calcFirstTimePrice, formatYen } from "@/app/lib/pricing";

/**
 * トップページ用の料金要約。
 *
 * ★/price の SinglePriceCards をトップに置かないこと。
 *   以前はトップと /price が同じカードを描画しており、
 *   (1) トップで最も縦に長いブロックになる (2) /price を見る理由が無くなる
 *   という2つの問題があった。トップは「いくらか分かる」までで止め、
 *   特徴リストとコース別の予約ボタンは /price の仕事とする。
 *
 * 金額はハードコードせず pricing.ts の純関数から算出する。
 */
const PriceSummary = () => (
  <div className="overflow-hidden rounded-2xl border border-cyan-100 bg-white shadow-cyan-sm">
    <ul className="divide-y divide-cyan-100/70">
      {COURSES.map((course) => (
        <li
          key={course.id}
          className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 sm:px-6 py-4"
        >
          <span className="heading-jp text-lg font-bold text-slate-800 min-w-24">
            {course.label}
          </span>

          {course.isPopular && (
            <span className="text-xs font-bold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-full">
              人気
            </span>
          )}

          <span className="ml-auto text-xl font-black text-slate-900 tabular-nums">
            ¥{formatYen(course.basePrice)}
          </span>

          <span className="text-sm text-slate-600 whitespace-nowrap">
            初回{" "}
            <span className="font-black text-orange-700 tabular-nums">
              ¥{formatYen(calcFirstTimePrice(course))}
            </span>
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default PriceSummary;
