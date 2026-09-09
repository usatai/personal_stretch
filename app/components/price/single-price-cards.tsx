import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { COURSES } from "@/app/lib/constants";
import { calcFirstTimePrice, formatYen } from "@/app/lib/pricing";

/** 単発（都度払い）の料金カード3枚。初回体験50%OFFのバッジを併記する。 */
const SinglePriceCards = () => (
  <div className="grid gap-5 md:grid-cols-3">
    {COURSES.map((course) => {
      const firstTime = calcFirstTimePrice(course);
      return (
        <article
          key={course.id}
          className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
            course.isPopular
              ? "ring-2 ring-cyan-500 shadow-cyan-lg scale-[1.02] bg-white"
              : "card-premium bg-white"
          }`}
        >
          {course.isPopular && (
            <div className="bg-linear-to-r from-cyan-700 to-cyan-800 text-white text-xs font-bold tracking-widest uppercase text-center py-2 px-4">
              Most Popular
            </div>
          )}

          <div className="p-6 md:p-7 flex flex-col flex-1">
            <h3 className="heading-jp text-xl font-bold text-slate-800 mb-1">{course.label}</h3>
            <div className="w-8 h-0.5 rounded-full bg-linear-to-r from-cyan-400 to-cyan-600 mb-4" />

            {/* 通常価格 */}
            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="text-3xl md:text-4xl font-black text-slate-900">
                ¥{formatYen(course.basePrice)}
              </span>
              <span className="text-slate-600 text-sm">（税込）</span>
            </div>

            {/* 初回体験価格 */}
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-6 self-start">
              <span className="text-xs font-bold text-orange-700">初回限定 50% OFF</span>
              <span className="font-black text-slate-800 text-base">→ ¥{formatYen(firstTime)}</span>
            </div>

            {/* 特徴リスト */}
            <ul className="space-y-2.5 flex-1">
              {course.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2.5 text-base text-slate-600">
                  <span className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-cyan-600 stroke-[2.5]" />
                  </span>
                  {feat}
                </li>
              ))}
            </ul>

            {/* コースを選んだ直後に予約へ進めるようにする。
                ?course= は予約フォームの「希望のコース」の初期値になる。 */}
            <Link
              href={`/contact?course=${course.id}`}
              className="btn-cyan mt-6 inline-flex items-center justify-center gap-2 w-full min-h-12 px-6 rounded-full text-base"
            >
              このコースで予約する
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      );
    })}
  </div>
);

export default SinglePriceCards;
