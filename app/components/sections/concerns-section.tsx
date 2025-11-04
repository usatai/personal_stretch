import Image from 'next/image';
import { ConcernItem } from '@/app/lib/types';

//各お悩みカードのデータ
const concernsData : ConcernItem[] = [
    {
      text: "肩こりや腰痛が慢性化している",
      imageSrc: "/images/back pain-amico.svg",
      alt: "肩こりに悩む人のイラスト",
    },
    {
      text: "マッサージに行ってもすぐに元に戻ってしまう",
      imageSrc: "/images/Stress-pana.svg",
      alt: "一時的な効果に悩む人のイラスト",
    },
    {
      text: "運動不足だが、何をすればいいかわからない",
      imageSrc: "/images/Questions-amico.svg",
      alt: "運動方法がわからない人のイラスト",
    },
    {
      text: "自宅で気軽にプロのケアを受けたい",
      imageSrc: "/images/Personal Trainer-rafiki.svg",
      alt: "自宅でリラックスする人のイラスト",
    },
  ];
  
  const ConcernsSection = () => {
    return (
      // セクション全体 (背景色を薄いグレーに設定)
      <section id="concerns" className="bg-gradient-to-br from-cyan-100 to-cyan-150 bg-fixed py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4">
          {/* セクションタイトル */}
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-800">
              このようなお悩みありませんか？
            </h2>
            <p className="mt-4 text-cyan-700">
              一つでも当てはまったら、ぜひ当店のパーソナルストレッチをお試しください。
            </p>
          </div>
  
          {/* お悩みカードのグリッド表示 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {concernsData.map((concern, index) => (
              <div key={index} className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                {/* カード内のイラスト */}
                <div className="relative h-40 mb-4 flex items-center justify-center">
                  {/* NOTE: 画像は /public/images/ 以下に配置する必要があります。
                    例: /public/images/concern-pain.svg
                  */}
                  <Image
                    src={concern.imageSrc}
                    alt={concern.alt}
                    width={150}
                    height={150}
                    style={{ objectFit: 'contain' }}
                    className="drop-shadow-md"
                    priority={true}
                  />
                </div>
                {/* カード内のテキスト */}
                <p className="text-lg font-semibold text-gray-700 leading-relaxed">
                  {concern.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ConcernsSection;