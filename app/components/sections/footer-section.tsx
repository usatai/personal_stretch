import { FaInstagram } from "react-icons/fa";

const FooterSection = () => (
  <footer className="bg-linear-to-br from-cyan-900 to-slate-900 text-white">
    {/* 上部区切り */}
    <div className="h-1 bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-400" />

    <div className="max-w-5xl mx-auto px-6 py-14 flex flex-col items-center gap-6">
      {/* ブランドロゴ */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-14 h-14 rounded-full bg-linear-to-br from-cyan-400 to-cyan-600 flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(6,182,212,0.5)]">
          <span className="text-white font-black text-[9px] leading-none">Reborn</span>
          <span className="text-white font-black text-[9px] leading-none">Stretch</span>
          <span className="text-white/70 text-[6px] leading-none mt-0.5">訪問ストレッチ</span>
        </div>
        <p className="text-xs text-cyan-300 tracking-[0.2em] uppercase font-semibold mt-2">Reborn Stretch</p>
        <p className="text-[11px] text-slate-400 mt-1">大阪の訪問パーソナルストレッチ</p>
      </div>

      {/* SNS */}
      <div className="flex items-center gap-2">
        <a
          href="https://www.instagram.com/reborn_stretch?igsh=MW83cDRncmZpMDMzZA=="
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
