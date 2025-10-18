import Image from 'next/image';

interface FeatureLayoutProps {
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
  reverse?: boolean; // trueにすると画像が右側に配置される
  imageClassName?: string; // 画像に追加する任意のクラス
}

const FeatureLayout = ({ imageSrc, alt, title, description, reverse = false, imageClassName }: FeatureLayoutProps) => {
  // reverseプロパティに応じてflex-directionを切り替える
  const flexDirection = reverse ? 'md:flex-row-reverse' : 'md:flex-row';

  return (
    <div className={`flex flex-col ${flexDirection} items-center gap-10 md:gap-16`}>
      {/* 画像エリア */}
      <div className="md:w-1/2 w-full">
      <Image
        src={imageSrc}
        alt={alt}
        width={600}
        height={400}
          className={`object-contain w-full h-auto ${imageClassName ? imageClassName : ''}`}
        />
      </div>

      {/* テキストエリア */}
      <div className="md:w-1/2 w-full text-left">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureLayout;