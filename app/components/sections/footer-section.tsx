import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { NAV_ITEMS, SITE_CONFIG } from "@/app/lib/constants";

const FooterSection = () => (
  <footer className="bg-linear-to-br from-cyan-900 to-slate-900 text-white">
    {/* 上部区切り */}
    <div className="h-1 bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-400" />

    <div className="max-w-5xl mx-auto px-6 py-14 flex flex-col items-center gap-8">
      {/* ブランドロゴ */}
      <Link href="/" className="flex flex-col items-center gap-1 group" aria-label="Reborn Stretch トップページ">
        <div className="w-14 h-14 rounded-full bg-linear-to-br from-cyan-400 to-cyan-600 flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(6,182,212,0.5)] group-hover:scale-105 transition-transform duration-300">
          <span className="text-white font-black text-[9px] leading-none">Reborn</span>
          <span className="text-white font-black text-[9px] leading-none">Stretch</span>
          <span className="text-white/70 text-[6px] leading-none mt-0.5">訪問ストレッチ</span>
        </div>
        <p className="text-xs text-cyan-300 tracking-[0.2em] uppercase font-semibold mt-2">Reborn Stretch</p>
        <p className="text-[11px] text-slate-400 mt-1">大阪の訪問パーソナルストレッチ</p>
      </Link>

      {/* サイト内リンク */}
      <nav aria-label="フッターナビゲーション" className="w-full">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {[...NAV_ITEMS, { label: "ご予約・お問い合わせ", href: "/contact" }].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[13px] text-slate-300 hover:text-cyan-300 transition-colors duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 営業情報 */}
      <p className="text-[11px] text-slate-400 text-center leading-relaxed">
        受付時間 9:00〜21:00（最終受付20:00）／ 大阪市内・北摂・東大阪・八尾・堺エリア対応
      </p>

      {/* SNS */}
      <div className="flex items-center gap-2">
        <a
          href={SITE_CONFIG.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagramでプロフィールを見る"
          className="flex items-center gap-2.5 bg-white/8 hover:bg-linear-to-r hover:from-pink-500 hover:to-purple-600 border border-white/10 hover:border-transparent text-slate-300 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
        >
          <FaInstagram size={18} />
          <span>Instagram</span>
        </a>
      </div>

      {/* 区切り線 */}
      <div className="w-full h-px bg-white/10" />

      {/* コピーライト */}
      <p className="text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Reborn Stretch. All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default FooterSection;
