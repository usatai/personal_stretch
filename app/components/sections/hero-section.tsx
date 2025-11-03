'use client';

import { ArrowRight, Home } from 'lucide-react';
import type { FC } from 'react';

// 動画・画像のパスはpropsで受け取れるよう拡張も可能（現状は動画優先で仮パス）
const imageSrc = "/images/stretchPC.png";
const spImageSrc = "/images/stretchSmartPhone.png";

const HeroSection: FC = () => {
    const handleReservation = () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        // 固定ヘッダーの高さを考慮したオフセット計算
        const headerHeight =200; // h-20 = 80px
        const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };
  
    return (
      <section className="relative w-full min-h-[60vh] md:min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center bg-white overflow-hidden py-16 md:py-24">
        {/* 背景動画 or 画像 */}
        <div className="absolute inset-0 z-0">
          {/* PC用画像 (mdサイズ以上で表示) */}
          <img
              src={imageSrc}
              alt="ストレッチ施術のイメージ"
              className="hidden md:block absolute inset-0 w-full h-full object-cover object-center brightness-95"
          />
          {/* スマホ用画像 (mdサイズ未満で表示) */}
          <img
              src={spImageSrc}
              alt="ストレッチ施術のイメージ"
              className="block md:hidden absolute inset-0 w-full h-full object-cover object-center brightness-95"
          />
              
          {/* グラデーションレイヤー */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80" />
        </div>
        
        {/* コンテンツ */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl md:max-w-4xl mx-auto text-center px-4">
          {/* スタイリッシュな訪問ストレッチバッジ */}
          <div className="absolute -top-12 md:-top-20 left-3">
            {/* メインバッジ */}
            <div className="relative flex items-center gap-2 md:gap-3 bg-gradient-to-r from-cyan-400 to-sky-500 text-white font-bold px-6 md:px-10 py-2 md:py-3 shadow-xl backdrop-blur-sm">
              {/* 左側のアクセントバー */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white"></div>
              
              {/* アイコン */}
              <Home className="w-4 h-4 md:w-5 md:h-5" />
              
              {/* テキスト */}
              <span className="text-sm md:text-lg tracking-wider font-bold">訪問ストレッチ</span>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-6xl font-bold text-gray-800 mb-8 drop-shadow-xl leading-tight text-left pt-3 pr-10">
            体の芯から<br /><span className="text-cyan-600">本物のストレッチ体験</span>を。
          </h1>
          <p className="text-sm md:text-2xl text-gray-700 mb-10 leading-relaxed font-medium text-left md:text-left text-center">
            大手企業で培った技術を持つトレーナーによるパーソナル施術で<br className="hidden md:inline" />柔軟性・姿勢・疲労感を根本から改善。<br />
            初回体験キャンペーン実施中。今すぐご予約を!
          </p>
          <button 
            className="bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-800 text-white font-semibold md:text-xl px-8 py-4 md:px-12 md:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2" 
            aria-label="予約ページへ"
            onClick={handleReservation}
          >
            予約する
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    );
  };
  
  export default HeroSection;
