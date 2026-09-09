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
        // ★「コース名＋バッジ」と「金額」を必ず別の入れ物に分けること。
        //   4要素を flex-wrap に直接並べると、人気バッジのある行だけ幅を超えて
        //   折り返し、その行だけ2行になって他の行とずれる。
        <li
          key={course.id}
          className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-5 sm:px-6 py-4"
        >
          {/* 左: コース名＋バッジ */}
          <div className="flex items-center gap-2">
            <span className="heading-jp text-lg font-bold text-slate-800">
              {course.label}
            </span>
            {course.isPopular && (
              <span className="text-xs font-bold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-full">
                人気
              </span>
            )}
          </div>

          {/* 右: 金額。SPでは2行目に回し、全行で同じ位置に揃える */}
          <div className="flex items-baseline gap-3 sm:ml-auto">
            <span className="text-xl font-black text-slate-900 tabular-nums">
              ¥{formatYen(course.basePrice)}
            </span>
            <span className="text-sm text-slate-600 whitespace-nowrap">
              初回{" "}
              <span className="font-black text-orange-700 tabular-nums">
                ¥{formatYen(calcFirstTimePrice(course))}
              </span>
            </span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default PriceSummary;
