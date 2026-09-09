import { ScrollReveal } from "@/app/components/ui/scroll-reveal";

interface SectionProps {
  id?: string;
  /**
   * 英字サブタイトル／日本語見出し。
   * ★ページ内に下位区分が複数あるときだけ指定する。
   *   コンテンツが1ブロックしかないページでは見出しを PageHero の h1 に一本化し、
   *   ここは省略すること（同じ文言が2度出るのを防ぐため）。
   */
  subTitle?: string;
  mainTitle?: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * 各ページ共通のセクション枠。
 * subTitle / mainTitle を省略すると見出しブロックを描画せず、
 * 余白とコンテンツ幅だけを与えるラッパーとして機能する。
 */
const Section = ({ id, subTitle, mainTitle, lead, children, className = "" }: SectionProps) => {
  const hasHeading = Boolean(mainTitle);

  return (
    <section id={id} className={`${hasHeading ? "py-20 sm:py-24" : "py-14 sm:py-16"} ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {hasHeading && (
          <ScrollReveal className="text-center mb-14 md:mb-16">
            {subTitle && <span className="eyebrow">{subTitle}</span>}
            <h2 className="heading-jp mt-4 text-3xl md:text-4xl lg:text-[2.6rem] font-black text-slate-800 leading-tight">
              {mainTitle}
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-cyan-300 rounded-full" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              <div className="h-px w-8 bg-cyan-300 rounded-full" />
            </div>
            {lead && (
              <p className="mt-6 text-base text-slate-600 leading-[1.9] max-w-2xl mx-auto">
                {lead}
              </p>
            )}
          </ScrollReveal>
        )}
        <div>{children}</div>
      </div>
    </section>
  );
};

export default Section;
