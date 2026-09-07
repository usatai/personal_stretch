import { ArrowRight, Repeat, Sparkles } from "lucide-react";
import { COURSES, NEWCOMER_TICKET_PLAN } from "@/app/lib/constants";
import { calcFirstTimePrice, calcTicketPrice, discountLabel, formatYen } from "@/app/lib/pricing";

/**
 * 初めての方向けの2つの割引（初回体験50%OFF / 新規限定3回券15%OFF）の使い分けガイド。
 * 併存するため、どちらを選ぶべきか迷わせないようページ上で明示する。
 */
const NewcomerGuide = () => {
  const shortest = COURSES[0]; // 40分コース＝最も安い価格例として提示
  const newcomerTier = calcTicketPrice(shortest, NEWCOMER_TICKET_PLAN);

  const options = [
    {
      badge: "まず1回試したい方",
      title: "初回体験 50%OFF",
      Icon: Sparkles,
      priceLabel: `${shortest.label} ¥${formatYen(calcFirstTimePrice(shortest))}〜`,
      body: "初めてご利用の方の1回目のみ、全コース半額でお試しいただけます。まずは施術を体験してから続けるか決めたい方に。",
      accent: "cyan" as const,
    },
    {
      badge: "続けるつもりの方",
      title: `${NEWCOMER_TICKET_PLAN.label} ${discountLabel(NEWCOMER_TICKET_PLAN.discountRate)}`,
      Icon: Repeat,
      priceLabel: `${shortest.label} ¥${formatYen(newcomerTier.total)}〜（1回 ¥${formatYen(newcomerTier.perSession)}）`,
      body: "身体の変化は継続によって定着します。最初から続ける前提の方は、3回分をまとめてお得にご購入いただけます。",
      accent: "orange" as const,
    },
  ];

  const accentStyles = {
    cyan: {
      card: "border-cyan-200 bg-linear-to-br from-cyan-50/70 to-white",
      icon: "bg-cyan-100 text-cyan-700",
      badge: "bg-cyan-600 text-white",
      price: "text-cyan-700",
    },
    orange: {
      card: "border-orange-200 bg-linear-to-br from-orange-50/70 to-white",
      icon: "bg-orange-100 text-orange-600",
      badge: "bg-orange-500 text-white",
      price: "text-orange-600",
    },
  };

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {options.map(({ badge, title, Icon, priceLabel, body, accent }) => {
          const s = accentStyles[accent];
          return (
            <article key={title} className={`rounded-2xl border p-6 md:p-7 ${s.card}`}>
              <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-4 ${s.badge}`}>
                {badge}
              </span>
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.icon}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="heading-jp text-lg font-bold text-slate-800 leading-snug">{title}</h3>
                  <p className={`text-sm font-bold mt-0.5 tabular-nums ${s.price}`}>{priceLabel}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-[1.9]">{body}</p>
            </article>
          );
        })}
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500 text-center">
        <ArrowRight className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
        初回体験でお試しいただいた後に、新規限定3回券や回数券へお進みいただくこともできます（割引の併用は不可）。
      </p>
    </div>
  );
};

export default NewcomerGuide;
