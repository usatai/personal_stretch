import { Sparkles } from "lucide-react";
import { COURSES, NEWCOMER_TICKET_PLAN } from "@/app/lib/constants";
import { calcTicketPrice, discountLabel, formatYen } from "@/app/lib/pricing";

/**
 * 新規限定3回券（15%OFF）。
 * 通常の回数券（シアン）と区別するため、限定訴求としてオレンジ系をアクセントに使う。
 */
const NewcomerTicket = () => {
  const plan = NEWCOMER_TICKET_PLAN;

  return (
    <div>
      {/* 見出し帯 */}
      <div className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(249,115,22,0.18)] mb-6">
        <div className="bg-linear-to-r from-orange-700 to-orange-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <Sparkles className="w-4.5 h-4.5 text-white shrink-0" />
          <span className="text-white font-black text-lg md:text-xl tracking-wide">{plan.label}</span>
          <span className="bg-white text-orange-800 font-black text-lg md:text-xl px-4 py-0.5 rounded-full">
            {discountLabel(plan.discountRate)}
          </span>
          <span className="text-orange-50 text-base">— {plan.note}</span>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {COURSES.map((course) => {
          const tier = calcTicketPrice(course, plan);
          return (
            <article
              key={course.id}
              className="flex flex-col rounded-2xl bg-white border border-orange-200/80 shadow-[0_2px_16px_rgba(249,115,22,0.08)] p-6 md:p-7"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="heading-jp text-xl font-bold text-slate-800">{course.label}</h3>
                <span className="text-xs font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                  全{plan.sessions}回
                </span>
              </div>
              <div className="w-8 h-0.5 rounded-full bg-linear-to-r from-orange-400 to-orange-600 mb-4" />

              {/* 割引前 */}
              <p className="text-sm text-slate-500 mb-1">
                通常 <span className="line-through">¥{formatYen(tier.listPrice)}</span>
              </p>

              {/* 総額 */}
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl md:text-4xl font-black text-slate-900">¥{formatYen(tier.total)}</span>
                <span className="text-slate-600 text-sm">（税込）</span>
              </div>

              {/* 1回あたり・お得額 */}
              <dl className="mt-4 space-y-1.5 text-base">
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500">1回あたり</dt>
                  <dd className="font-bold text-slate-700">¥{formatYen(tier.perSession)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500">お得額</dt>
                  <dd className="font-bold text-orange-700">−¥{formatYen(tier.saved)}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default NewcomerTicket;
