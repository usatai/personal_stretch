import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";

type BodyChangeCase = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  /**
   * 画像の実寸。★実際の縦横比と一致させること。
   * 比がずれていると object-cover が姿勢写真の頭や足を切り落とす。
   */
  width: number;
  height: number;
};

type BodyChangeSectionProps = {
  cases?: BodyChangeCase[];
};

const BodyChangeSection = ({ cases = [] }: BodyChangeSectionProps) => (
  <section aria-labelledby="bodychange-title" className="w-full">
    <div className="mb-8 flex flex-col sm:flex-row sm:items-end gap-2">
      <div>
        <h2 id="bodychange-title" className="heading-jp text-2xl font-bold text-slate-800">
          Before / After
        </h2>
      </div>
      <span className="sm:ml-auto text-sm text-slate-500 sm:pb-0.5">※ ストレッチ時間 15分</span>
    </div>

    <div className="space-y-8">
      {cases.map((c, index) => (
        <div key={index} className="grid gap-3 md:gap-5 md:grid-cols-[1fr_auto_1fr] items-start">
          {/* Before */}
          <article className="relative rounded-2xl overflow-hidden card-premium">
            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 bg-slate-800/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Before
            </div>
            <Image
              src={c.beforeSrc}
              alt={c.beforeAlt ?? `施術前（Before ${index + 1}）`}
              width={c.width}
              height={c.height}
              sizes="(max-width: 768px) 100vw, 45vw"
              className="w-full h-auto"
              priority={index === 0}
            />
          </article>

          {/* Arrow: SP = 下向き / PC = 右向き */}
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-cyan shrink-0">
              {/* SP: 縦矢印 */}
              <ArrowDown className="w-5 h-5 text-white stroke-2 md:hidden" />
              {/* PC: 横矢印 */}
              <ArrowRight className="w-5 h-5 text-white stroke-2 hidden md:block" />
            </div>
          </div>

          {/* After */}
          <article className="relative rounded-2xl overflow-hidden card-premium ring-1 ring-cyan-200">
            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 bg-cyan-700/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-200" />
              After
            </div>
            <Image
              src={c.afterSrc}
              alt={c.afterAlt ?? `施術後（After ${index + 1}）`}
              width={c.width}
              height={c.height}
              sizes="(max-width: 768px) 100vw, 45vw"
              className="w-full h-auto"
              priority={index === 0}
            />
          </article>
        </div>
      ))}
    </div>

    <p className="mt-8 text-center text-sm text-slate-500">
      ※ 写真はイメージです。効果には個人差があります。
    </p>
  </section>
);

export default BodyChangeSection;
