import Image from 'next/image';

interface FeatureLayoutProps {
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
  reverse?: boolean;
  imageClassName?: string;
  index?: number;
}

const FeatureLayout = ({
  imageSrc, alt, title, description, reverse = false, imageClassName, index,
}: FeatureLayoutProps) => {
  const flexDir = reverse ? 'md:flex-row-reverse' : 'md:flex-row';
  const num = index !== undefined ? String(index).padStart(2, '0') : null;

  return (
    <div className={`flex flex-col ${flexDir} items-center gap-10 md:gap-16 lg:gap-20`}>
      {/* 画像 */}
      <div className="md:w-1/2 w-full relative">
        {/* 装飾：背景の四角 */}
        <div className={`hidden md:block absolute -z-10 w-full h-full rounded-2xl bg-cyan-100/40 ${reverse ? 'translate-x-4 -translate-y-4' : '-translate-x-4 -translate-y-4'}`} />
        <Image
          src={imageSrc}
          alt={alt}
          width={600}
          height={420}
          className={`relative object-cover w-full h-auto rounded-2xl shadow-[0_8px_32px_rgba(6,182,212,0.15)] ${imageClassName ?? ''}`}
          priority={true}
        />
      </div>

      {/* テキスト */}
      <div className="md:w-1/2 w-full text-left">
        {num && (
          <span className="block font-black text-[3rem] md:text-[4rem] leading-none text-cyan-100 mb-2 select-none">
            {num}
          </span>
        )}
        <h3 className="heading-jp text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mb-5 leading-snug">
          {title}
        </h3>
        <div className="w-10 h-0.5 rounded-full bg-linear-to-r from-cyan-400 to-cyan-600 mb-5" />
        <p className="text-slate-500 leading-[1.9] whitespace-pre-line text-sm md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureLayout;
