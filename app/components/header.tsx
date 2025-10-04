"use client";

import Link from 'next/link';
import { Menu,Calendar, Mail, X  } from 'lucide-react';
import { useState } from 'react';   

const navItems = [
  { label: 'Reborn Stretchの特徴', href: '#first-time' },
  { label: 'トレーナー', href: '#trainer' },
  { label: 'お客様の変化', href: '#purpose' },
  { label: '出張エリア', href: '#area' },
  { label: '料金', href: '#price' },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        // 1. ヘッダー全体のスタイルを調整 (背景を半透明から白に変更)
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
            {/* コンテナの最大幅を広げ、justify-betweenで要素を均等配置 */}
            <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
                
                {/* ロゴ */}
                <div className="flex-shrink-0">
                    <Link href="/" className="flex items-center gap-2 group" aria-label="トップページへ">
                    {/* 仮SVGロゴ */}
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="18" cy="18" r="18" fill="#3B82F6" />
                            <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold" dy=".3em">S</text>
                        </svg>
                        {/* ここにロゴ画像ファイルを配置するのが理想です
                        <Image src="/logo.png" alt="ロゴ" width={40} height={40} /> 
                        */}
                        <span className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
                            Reborn Stretch
                        </span>
                    </Link>
                </div>

                {/* ナビゲーション（PC） */}
                <nav className="hidden lg:flex items-center space-x-7">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* CTAボタン（PC） */}
                <div className="hidden md:flex items-center gap-3">
                    <a
                        href="#contact"
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-4 py-2 text-sm shadow-sm transition-colors"
                    >
                        <Calendar className="w-4 h-4" />
                        ご予約はこちら
                    </a>
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
                            <a key={item.href} href={item.href} className="block px-4 py-3 text-gray-700 hover:bg-gray-100">{item.label}</a>
                        ))}
                        <div className="pt-4">
                            <a href="#contact" className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-6 py-3 text-base shadow-sm transition-colors">
                                <Calendar className="w-4 h-4" />
                                ご予約はこちら
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
