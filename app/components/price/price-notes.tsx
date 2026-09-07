import { CONTACT_INFO, FREE_AREA_LABEL } from "@/app/lib/constants";

/**
 * ご利用にあたっての注意事項。
 * TODO(要確認): 有効期限・支払方法・譲渡/返金の可否が確定したら本文を差し替える
 *               （docs/hp-renewal-plan.md §7-2 Q3・Q4・Q6）。
 */
const notes = [
  "表示価格はすべて税込です。",
  "回数券の有効期限・お支払い方法については、ご購入前にご案内いたします。",
  "各割引の併用はできません。適用条件は上記の早見表をご確認ください。",
  `出張費は対象エリアによって異なる場合があります（${FREE_AREA_LABEL}エリアは無料）。`,
  `受付時間は${CONTACT_INFO.businessHours}です。`,
];

const PriceNotes = () => (
  <ul className="space-y-2.5">
    {notes.map((note) => (
      <li key={note} className="flex items-start gap-2.5 text-sm text-slate-500 leading-relaxed">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
        {note}
      </li>
    ))}
  </ul>
);

export default PriceNotes;
