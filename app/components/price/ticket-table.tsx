"use client";

import { useState } from "react";
import { Ticket } from "lucide-react";
import { COURSES, REPEAT_TICKET_PLANS } from "@/app/lib/constants";
import { calcTicketPrice, discountLabel, formatYen } from "@/app/lib/pricing";
import type { CourseId } from "@/app/lib/types";

/**
 * 回数券（4回券 / 8回券 / 12回券）。
 * PC は 3行×3列の比較表、SP はコース切替タブ＋券種カードの縦積みで表示する
 * （表を横スクロールさせないため）。
 */
const TicketTable = () => {
  const [activeCourseId, setActiveCourseId] = useState<CourseId>(
    COURSES.find((c) => c.isPopular)?.id ?? COURSES[0].id
  );
  const activeCourse = COURSES.find((c) => c.id === activeCourseId) ?? COURSES[0];

  return (
    <div>
      {/* ─── PC: 比較表 ─── */}
      <div className="hidden md:block rounded-2xl overflow-hidden border border-cyan-100 shadow-cyan bg-white">
        <table className="w-full border-collapse">
          <caption className="sr-only">コース別・回数券の料金表</caption>
          <thead>
            <tr className="bg-linear-to-r from-cyan-700 to-cyan-800 text-white">
              <th scope="col" className="text-left text-sm font-bold px-6 py-4 w-1/4">
                コース
              </th>
              {REPEAT_TICKET_PLANS.map((plan) => (
                <th key={plan.id} scope="col" className="px-4 py-4 text-center">
                  <span className="block text-base font-black">{plan.shortLabel}</span>
                  <span className="block text-xs font-bold text-cyan-50 mt-0.5">
                    {discountLabel(plan.discountRate)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COURSES.map((course) => (
              <tr key={course.id} className="border-t border-cyan-100/70 even:bg-cyan-50/25">
                <th scope="row" className="text-left px-6 py-5 align-middle">
                  <span className="heading-jp text-lg font-bold text-slate-800">{course.label}</span>
                  <span className="block text-sm text-slate-500 font-normal mt-0.5">
                    単発 ¥{formatYen(course.basePrice)}
                  </span>
                </th>
                {REPEAT_TICKET_PLANS.map((plan) => {
                  const tier = calcTicketPrice(course, plan);
                  return (
                    <td key={plan.id} className="px-4 py-5 text-center align-middle">
                      <span className="block text-xl lg:text-2xl font-black text-slate-900 tabular-nums">
                        ¥{formatYen(tier.total)}
                      </span>
                      <span className="block text-sm text-slate-500 mt-1 tabular-nums">
                        1回あたり ¥{formatYen(tier.perSession)}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── SP: コース切替タブ＋カード ─── */}
      <div className="md:hidden">
        {/* タブ */}
        <div role="tablist" aria-label="コースを選択" className="flex gap-1.5 p-1.5 bg-cyan-50 rounded-2xl mb-5">
          {COURSES.map((course) => {
            const selected = course.id === activeCourseId;
            return (
              <button
                key={course.id}
                type="button"
                role="tab"
                id={`ticket-tab-${course.id}`}
                aria-selected={selected}
                aria-controls={`ticket-panel-${course.id}`}
                onClick={() => setActiveCourseId(course.id)}
                className={`flex-1 min-h-11 py-3 rounded-xl text-base font-bold transition-all duration-200 ${
                  selected
                    ? "bg-white text-cyan-700 shadow-cyan-sm"
                    : "text-slate-600 hover:text-cyan-700"
                }`}
              >
                {course.minutes}分
              </button>
            );
          })}
        </div>

        {/* パネル */}
        <div
          role="tabpanel"
          id={`ticket-panel-${activeCourse.id}`}
          aria-labelledby={`ticket-tab-${activeCourse.id}`}
          className="space-y-3"
        >
          <p className="text-center text-sm text-slate-500">
            {activeCourse.label}（単発 ¥{formatYen(activeCourse.basePrice)}）の回数券
          </p>
          {REPEAT_TICKET_PLANS.map((plan) => {
            const tier = calcTicketPrice(activeCourse, plan);
            return (
              <article
                key={plan.id}
                className="card-premium rounded-2xl bg-white p-5 flex items-center gap-4"
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 flex flex-col items-center justify-center">
                  <Ticket className="w-4 h-4 text-cyan-600" />
                  <span className="text-xs font-black text-cyan-700 mt-0.5">{plan.sessions}回</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-800">{plan.shortLabel}</h3>
                    <span className="text-xs font-bold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-full">
                      {discountLabel(plan.discountRate)}
                    </span>
                  </div>
                  <p className="text-2xl font-black text-slate-900 mt-1 tabular-nums">
                    ¥{formatYen(tier.total)}
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5 tabular-nums">
                    1回あたり ¥{formatYen(tier.perSession)}／お得額 −¥{formatYen(tier.saved)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TicketTable;
