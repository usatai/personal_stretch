"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Calendar, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/app/lib/constants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ページ遷移したらモバイルメニューを閉じる
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-white/92 backdrop-blur-xl shadow-[0_1px_24px_rgba(6,182,212,0.10)] border-b border-cyan-100/70"
          : "bg-white/60 backdrop-blur-sm border-b border-cyan-100/30"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-17 md:h-20 px-4 sm:px-6 lg:px-8">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Reborn Stretch トップページ">
          <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-full bg-linear-to-br from-cyan-400 to-cyan-600 flex flex-col items-center justify-center shadow-[0_4px_14px_rgba(6,182,212,0.40)] group-hover:shadow-[0_6px_20px_rgba(6,182,212,0.55)] transition-all duration-300 group-hover:scale-105 shrink-0">
            <span className="text-white font-black text-[10px] leading-tight tracking-tight">Reborn</span>
            <span className="text-white font-black text-[10px] leading-tight tracking-tight">Stretch</span>
          </div>
          <div className="hidden sm:flex flex-col leading-none gap-0.5">
            <span className="text-xs font-black text-cyan-700 tracking-[0.18em] uppercase">Reborn</span>
            <span className="text-xs font-black text-cyan-600 tracking-[0.18em] uppercase">Stretch</span>
          </div>
        </Link>

        {/* ナビゲーション（PC） */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative text-sm font-medium transition-colors duration-200 group py-1 whitespace-nowrap ${
                isActive(item.href) ? "text-cyan-700" : "text-slate-600 hover:text-cyan-700"
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] bg-linear-to-r from-cyan-400 to-cyan-600 rounded-full transition-all duration-300 ${
                  isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* CTA（PC） */}
        <div className="hidden lg:flex items-center">
          <Link href="/contact" className="btn-cyan flex items-center gap-2 text-sm px-5 py-2.5 rounded-full">
            <Calendar className="w-3.5 h-3.5" />
            ご予約はこちら
          </Link>
        </div>

        {/* ハンバーガー（SP・タブレット） */}
        <button
          className="lg:hidden flex items-center justify-center min-w-11 min-h-11 rounded-lg hover:bg-cyan-50 transition-colors"
          aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
        </button>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/96 backdrop-blur-xl border-t border-cyan-100/50 shadow-lg">
          <nav className="flex flex-col items-center gap-1 py-5 px-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`flex items-center justify-center w-full min-h-11 px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-cyan-700 bg-cyan-50"
                    : "text-slate-600 hover:text-cyan-700 hover:bg-cyan-50/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 w-full flex justify-center">
              <Link href="/contact" className="btn-cyan flex items-center gap-2 text-sm px-7 py-3 rounded-full">
                <Calendar className="w-4 h-4" />
                ご予約はこちら
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
