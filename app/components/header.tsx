"use client";

import Link from 'next/link';
import { Menu,Calendar, X  } from 'lucide-react';
import { useState } from 'react';   

const navItems = [
  { label: 'Reborn Stretchの特徴', href: '#first-time' },
  { label: 'トレーナー', href: '#trainer' },
  { label: 'お客様の変化', href: '#purpose' },
  { label: '出張エリア', href: '#area' },
  { label: '料金・コース', href: '#price' },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            // ハンバーガーメニューが開いている時のみオフセットを適用
            if (isMenuOpen) {
                const headerHeight = 450; // ハンバーガーメニューが開いている時の高さ
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                // 通常時はオフセットなしでスクロール
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        // モバイルメニューを閉じる
        setIsMenuOpen(false);
    };

    return (
        // 1. ヘッダー全体のスタイルを調整 (背景を半透明から白に変更)
        <header className="sticky top-0 z-50 bg-gradient-to-br from-cyan-50 to-cyan-100 backdrop-blur-md border-b border-cyan-100 shadow-sm">
            {/* コンテナの最大幅を広げ、justify-betweenで要素を均等配置 */}
            <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
                
               {/* ロゴ */}
                <div className="flex-shrink-0">
                    <Link href="/" className="flex items-center gap-2 group" aria-label="トップページへ">
                        {/* 丸型ロゴ - 自作版 */}
                        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 flex flex-col items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                            <span className="text-white font-black text-[8px] md:text-[10px] leading-none tracking-tight">Reborn</span>
                            <span className="text-white font-black text-[8px] md:text-[10px] leading-none tracking-tight">Stretch</span>
                            <span className="text-white/90 font-medium text-[6px] md:text-[7px] leading-none mt-0.5">訪問ストレッチ</span>
                        </div>
                    </Link>
                </div>
                {/* ナビゲーション（PC） */}
                <nav className="hidden md:flex items-center space-x-7">
                    {navItems.map((item) => (
                        <button
                            key={item.href}
                            onClick={() => scrollToSection(item.href)}
                            className="text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors"
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* CTAボタン（PC） */}
                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={() => scrollToSection('#contact')}
                        className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-md px-4 py-2 text-sm shadow-sm transition-colors"
                    >
                        <Calendar className="w-4 h-4" />
                        ご予約はこちら
                    </button>
                </div>

                {/* ハンバーガーメニュー（SP） */}
                <div className="md:hidden">
                    <button 
                        className="p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400" 
                        aria-label="メニューを開く"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <X className="w-7 h-7 text-gray-700" /> : <Menu className="w-7 h-7 text-gray-700" />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <nav className="flex flex-col items-center space-y-4 py-6">
                        {navItems.map((item) => (
                            <button 
                                key={item.href} 
                                onClick={() => scrollToSection(item.href)} 
                                className="block px-4 py-3 ttext-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors"
                            >
                                {item.label}
                            </button>
                        ))}
                        <div className="pt-4">
                            <button 
                                onClick={() => scrollToSection('#contact')} 
                                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-md px-4 py-2 text-sm shadow-sm transition-colors"
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