import Image from 'next/image';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import type { FC } from 'react';

// 動画・画像のパスはpropsで受け取れるよう拡張も可能（現状は動画優先で仮パス）
const imageSrc = "/images/stretch.png";
const spImageSrc = "/images/stretchSmartPhone.png";

const HeroSection: FC = () => {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center bg-white overflow-hidden py-16 md:py-24">
      {/* 背景動画 or 画像 */}
      <div className="absolute inset-0 z-0">
        {/* PC用画像 (mdサイズ以上で表示) */}
        <Image
            src={imageSrc}
            alt="ストレッチ施術のイメージ"
            fill
            className="hidden md:block object-cover object-[50%_35%] md:object-center brightness-95"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
            quality={85}
        />
        {/* スマホ用画像 (mdサイズ未満で表示) */}
        <Image
            src={spImageSrc} // ★ 新しく用意したスマホ用の画像パス
            alt="ストレッチ施術のイメージ"
            fill
            className="block md:hidden object-cover object-center brightness-95"
            priority
            sizes="(max-width: 768px) 100vw"
            quality={80} // スマホなので少し品質を下げても良い
        />
            
        {/* グラデーションレイヤー */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80" />
      </div>
      {/* コンテンツ */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl md:max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8 drop-shadow-xl leading-tight">
          体の芯から<br /><span className="text-blue-500">本物のストレッチ体験</span>を。
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-10 leading-relaxed font-medium">
          大手企業で培った技術を持つトレーナーによるパーソナル施術で<br className="hidden md:inline" />柔軟性・姿勢・疲労感を根本から改善。<br className="hidden md:inline" />
          初回体験キャンペーン実施中。今すぐご予約を！
        </p>
        <Button className="text-lg md:text-xl px-10 py-5 shadow-lg gap-2 group" variant="primary" aria-label="予約ページへ">
          予約する
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5] group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
