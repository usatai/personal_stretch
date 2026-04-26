"use client";

import { Menu, Calendar, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'Reborn Stretchの特徴', href: '#first-time' },
  { label: 'トレーナー', href: '#trainer' },
  { label: 'お客様の変化', href: '#purpose' },
  { label: '出張エリア', href: '#area' },
  { label: '料金・コース', href: '#price' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      if (isMenuOpen) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementPosition - 450, behavior: 'smooth' });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-xl shadow-[0_1px_24px_rgba(6,182,212,0.10)] border-b border-cyan-100/70'
          : 'bg-white/60 backdrop-blur-sm border-b border-cyan-100/30'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-17 md:h-20 px-4 sm:px-6 lg:px-8">

        {/* ロゴ */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group" aria-label="トップへ戻る">
          <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-full bg-linear-to-br from-cyan-400 to-cyan-600 flex flex-col items-center justify-center shadow-[0_4px_14px_rgba(6,182,212,0.40)] group-hover:shadow-[0_6px_20px_rgba(6,182,212,0.55)] transition-all duration-300 group-hover:scale-105 shrink-0">
            <span className="text-white font-black text-[8px] leading-none tracking-tight">Reborn</span>
            <span className="text-white font-black text-[8px] leading-none tracking-tight">Stretch</span>
            <span className="text-white/75 font-medium text-[6px] leading-none mt-0.5">訪問ストレッチ</span>
          </div>
          <div className="hidden sm:flex flex-col leading-none gap-0.5">
            <span className="text-[11px] font-black text-cyan-700 tracking-[0.18em] uppercase">Reborn</span>
            <span className="text-[11px] font-black text-cyan-500 tracking-[0.18em] uppercase">Stretch</span>
          </div>
        </button>

        {/* ナビゲーション（PC） */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="relative text-[13px] font-medium text-slate-600 hover:text-cyan-600 transition-colors duration-200 group py-1 whitespace-nowrap"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-linear-to-r from-cyan-400 to-cyan-600 rounded-full transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* CTA（PC） */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => scrollToSection('#contact')}
            className="btn-cyan flex items-center gap-2 text-sm px-5 py-2.5 rounded-full"
          >
            <Calendar className="w-3.5 h-3.5" />
            ご予約はこちら
          </button>
        </div>

        {/* ハンバーガー（SP） */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-cyan-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen
            ? <X className="w-5 h-5 text-slate-700" />
            : <Menu className="w-5 h-5 text-slate-700" />}
        </button>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/96 backdrop-blur-xl border-t border-cyan-100/50 shadow-lg">
          <nav className="flex flex-col items-center gap-1 py-5 px-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="w-full text-center px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-cyan-600 hover:bg-cyan-50/70 rounded-lg transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 w-full flex justify-center">
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-cyan flex items-center gap-2 text-sm px-7 py-3 rounded-full"
              >
                <Calendar className="w-4 h-4" />
                ご予約はこちら
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
