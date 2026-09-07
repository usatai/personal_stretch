import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  /** 英字ラベル（例: "PRICE"） */
  eyebrow: string;
  /** ページ見出し（例: "料金・コース"） */
  title: string;
  /** 補足文 */
  lead?: string;
}

/**
 * 下層ページ共通の見出しヘッダー。
 * パンくず（トップ > 現在地）を含む。
 */
const PageHero = ({ eyebrow, title, lead }: PageHeroProps) => (
  <section className="relative overflow-hidden bg-linear-to-br from-cyan-50 via-white to-cyan-50/40 border-b border-cyan-100/60">
    <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-cyan-200/25 blur-[110px] pointer-events-none" />
    <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-cyan-100/40 blur-[110px] pointer-events-none" />

    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 md:pt-16 md:pb-20">
      {/* パンくず */}
      <nav aria-label="パンくずリスト" className="mb-6">
        <ol className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <li>
            <Link href="/" className="hover:text-cyan-600 transition-colors">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true" className="flex items-center">
            <ChevronRight className="w-3 h-3" />
          </li>
          <li className="text-slate-600 font-medium">{title}</li>
        </ol>
      </nav>

      <p className="font-mono text-[10px] font-black text-cyan-500 tracking-[0.3em] uppercase mb-3">
        {eyebrow}
      </p>
      <h1 className="heading-jp text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 leading-tight">
        {title}
      </h1>
      <div className="mt-5 w-12 h-0.5 rounded-full bg-linear-to-r from-cyan-400 to-cyan-600" />
      {lead && (
        <p className="mt-6 max-w-2xl text-sm md:text-base text-slate-500 leading-[1.9]">{lead}</p>
      )}
    </div>
  </section>
);

export default PageHero;
