import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

interface CtaBandProps {
  /** 見出し（省略時は既定文言） */
  title?: string;
  /** 補足文 */
  lead?: string;
  /** 関連ページへの導線 */
  links?: { label: string; href: string }[];
}

/**
 * 各ページ末尾に置く共通CTA。
 * ページ分割による回遊率の低下を防ぐため、予約導線と関連ページリンクを必ず併置する。
 */
const CtaBand = ({
  title = "まずは一度、体験してみませんか？",
  lead = "初めての方は全コース50%OFF。ご相談だけでもお気軽にどうぞ。",
  links = [],
}: CtaBandProps) => (
  <section className="relative overflow-hidden bg-linear-to-br from-cyan-600 to-cyan-800">
    <div className="absolute -top-16 -right-10 w-72 h-72 rounded-full bg-cyan-400/20 blur-[100px] pointer-events-none" />
    <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-cyan-300/15 blur-[100px] pointer-events-none" />

    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
      <h2 className="heading-jp text-2xl md:text-3xl font-black text-white leading-snug">{title}</h2>
      <p className="mt-4 text-cyan-100 text-sm md:text-base leading-relaxed">{lead}</p>

      <div className="mt-8 flex justify-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2.5 bg-white text-cyan-700 hover:bg-cyan-50 font-bold text-base px-8 py-4 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-250"
        >
          <Calendar className="w-4.5 h-4.5" />
          ご予約・お問い合わせ
          <ArrowRight className="w-4.5 h-4.5" />
        </Link>
      </div>

      {links.length > 0 && (
        <div className="mt-10 pt-8 border-t border-white/15 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-1.5 text-cyan-100 hover:text-white text-sm font-medium transition-colors"
            >
              {l.label}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ))}
        </div>
      )}
    </div>
  </section>
);

export default CtaBand;
