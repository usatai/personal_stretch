import { DISCOUNT_RULES } from "@/app/lib/constants";

/** 割引の適用ルール早見表。併用可否を1箇所に集約して当日の行き違いを防ぐ。 */
const DiscountRules = () => (
  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
    {/* PC: 表 */}
    <table className="hidden sm:table w-full border-collapse text-sm">
      <caption className="sr-only">割引の適用ルール</caption>
      <thead>
        <tr className="bg-slate-50 border-b border-slate-200">
          <th scope="col" className="text-left font-bold text-slate-600 px-5 py-3">割引</th>
          <th scope="col" className="text-left font-bold text-slate-600 px-5 py-3">適用対象</th>
          <th scope="col" className="text-left font-bold text-slate-600 px-5 py-3">併用</th>
        </tr>
      </thead>
      <tbody>
        {DISCOUNT_RULES.map((rule) => (
          <tr key={rule.name} className="border-b border-slate-100 last:border-b-0">
            <th scope="row" className="text-left font-bold text-slate-800 px-5 py-3.5">{rule.name}</th>
            <td className="text-slate-600 px-5 py-3.5">{rule.target}</td>
            <td className="text-slate-500 px-5 py-3.5">{rule.combinable}</td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* SP: 定義リスト */}
    <dl className="sm:hidden divide-y divide-slate-100">
      {DISCOUNT_RULES.map((rule) => (
        <div key={rule.name} className="px-5 py-4">
          <dt className="font-bold text-slate-800 text-sm">{rule.name}</dt>
          <dd className="mt-1.5 text-xs text-slate-600 leading-relaxed">
            適用対象：{rule.target}
            <br />
            併用：{rule.combinable}
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

export default DiscountRules;
