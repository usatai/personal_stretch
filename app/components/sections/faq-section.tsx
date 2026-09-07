import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/app/lib/constants";

/**
 * よくある質問。
 * ネイティブの <details>/<summary> を使うため JavaScript 不要
 * （サーバーコンポーネントのまま開閉できる）。
 */
const FaqSection = () => (
  <div className="space-y-3">
    {FAQ_ITEMS.map((item) => (
      <details
        key={item.question}
        className="group card-premium rounded-2xl bg-white overflow-hidden [&[open]]:shadow-cyan"
      >
        <summary className="flex items-start gap-4 px-5 sm:px-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <span className="shrink-0 w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 text-[11px] font-black flex items-center justify-center mt-0.5">
            Q
          </span>
          <h2 className="flex-1 text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
            {item.question}
          </h2>
          <ChevronDown className="shrink-0 w-4.5 h-4.5 text-cyan-500 mt-0.5 transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <div className="px-5 sm:px-6 pb-5 pl-14 sm:pl-16">
          <div className="border-l-2 border-cyan-200 pl-4">
            <p className="text-sm text-slate-600 leading-[1.9]">{item.answer}</p>
          </div>
        </div>
      </details>
    ))}
  </div>
);

export default FaqSection;
