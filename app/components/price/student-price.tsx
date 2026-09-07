import { GraduationCap, Info } from "lucide-react";
import { COURSES, STUDENT_DISCOUNT_RATE } from "@/app/lib/constants";
import { calcStudentPrice, discountLabel, formatYen } from "@/app/lib/pricing";

/**
 * 学生割引（20%OFF）。
 * ★単発のみ適用。回数券には適用されないため、その旨をブロック内に必ず明示する。
 */
const StudentPrice = () => (
  <div className="rounded-2xl border border-cyan-100 bg-linear-to-br from-cyan-50/60 to-white p-6 md:p-8">
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
      <div className="w-11 h-11 rounded-2xl bg-cyan-100 flex items-center justify-center shrink-0">
        <GraduationCap className="w-5.5 h-5.5 text-cyan-700" />
      </div>
      <div>
        <h3 className="heading-jp text-xl font-bold text-slate-800">
          学生割引 {discountLabel(STUDENT_DISCOUNT_RATE)}
        </h3>
        <p className="text-sm text-slate-500 mt-0.5">学生の方は単発料金が20%OFFになります。</p>
      </div>
    </div>

    <div className="grid gap-3 sm:grid-cols-3">
      {COURSES.map((course) => (
        <div
          key={course.id}
          className="rounded-xl bg-white border border-cyan-100/80 px-5 py-4 flex items-center justify-between sm:flex-col sm:items-start sm:gap-1"
        >
          <div>
            <p className="text-sm font-bold text-slate-700">{course.label}</p>
            <p className="text-[11px] text-slate-400">
              通常 <span className="line-through">¥{formatYen(course.basePrice)}</span>
            </p>
          </div>
          <p className="text-2xl font-black text-cyan-700 tabular-nums">
            ¥{formatYen(calcStudentPrice(course))}
          </p>
        </div>
      ))}
    </div>

    {/* 適用範囲の注記（学生 × 回数券は仕様として存在しない） */}
    <p className="mt-5 flex items-start gap-2 text-xs text-slate-500 leading-relaxed">
      <Info className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
      <span>
        学生割引は<strong className="font-bold text-slate-700">単発（都度払い）のみ</strong>のご提供です。
        回数券には適用されません。また、初回体験50%OFFとの併用もできません
        （初回は50%OFF、2回目以降に学生割引が適用されます）。
      </span>
    </p>
  </div>
);

export default StudentPrice;
