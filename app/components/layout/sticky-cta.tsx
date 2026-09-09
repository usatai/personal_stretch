"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * SP・タブレット専用の固定予約バー。
 *
 * ヘッダーの予約CTAは `hidden lg:flex` のため、スマートフォンでは
 * ハンバーガーを開かない限り予約導線が画面上に存在しない。
 * 新しい訴求を足すのではなく、既存のCTAを常時見える位置へ再配置している。
 *
 * - Hero を通過してから出す（ファーストビューのCTAと重ねない）
 * - /contact では出さない（フォームの送信ボタンと競合するため）
 */
const SHOW_AFTER_PX = 400;

const StickyCta = () => {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 予約フォームのページでは重複するため出さない
  if (pathname === "/contact") return null;

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 motion-reduce:transition-none ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-xl border-t border-cyan-100 shadow-[0_-2px_20px_rgba(6,182,212,0.12)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 leading-tight">初回は全コース50%OFF</p>
            <p className="text-xs text-slate-500 leading-tight mt-0.5">ご相談だけでも承ります</p>
          </div>
          <Link
            href="/contact"
            className="btn-cyan inline-flex items-center justify-center gap-2 min-h-12 px-5 rounded-full text-base shrink-0"
          >
            <Calendar className="w-4 h-4" />
            ご予約
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StickyCta;
