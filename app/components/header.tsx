import Link from 'next/link';
import { Menu } from 'lucide-react';

const navItems = [
  { label: '初めてのご利用の方', href: '#first-time' },
  { label: 'お悩みや目的から選ぶ', href: '#purpose' },
  { label: '出張エリア', href: '#area' },
  { label: 'トレーナー', href: '#trainer' },
  { label: '料金', href: '#price' },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm border-b border-gray-200">
      <div className="max-w-5xl mx-auto flex items-center justify-between h-20 px-4 md:px-8">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="トップページへ">
          {/* 仮SVGロゴ */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="18" fill="#3B82F6" />
            <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold" dy=".3em">S</text>
          </svg>
          <span className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight group-hover:text-blue-500 transition-colors">ストレッチ専門店</span>
        </Link>
        {/* ナビゲーション（PC） */}
        <nav className="hidden md:flex items-center gap-7 ml-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-blue-500 font-medium transition-colors px-1 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
            >
              {item.label}
            </a>
          ))}
        </nav>
        {/* CTAボタン（PC） */}
        <div className="hidden md:flex items-center gap-3 ml-8">
          <a href="#reserve" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-5 py-2.5 shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
            おためし予約
          </a>
          <a href="#contact" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg px-5 py-2.5 shadow transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
            お問い合わせ
          </a>
        </div>
        {/* ハンバーガーメニュー（SP） */}
        <button className="md:hidden p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400" aria-label="メニューを開く">
          <Menu className="w-7 h-7 text-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default Header;
