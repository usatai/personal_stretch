import Link from "next/link";
import { ArrowRight, Home, UserRound, Sparkles } from "lucide-react";

const features = [
  {
    Icon: UserRound,
    title: "完全マンツーマン指導",
    body: "身体の状態や目標に合わせて、経験豊富なトレーナーがオーダーメイドのプログラムを作成します。",
  },
  {
    Icon: Home,
    title: "移動時間ゼロの出張施術",
    body: "ご自宅・ホテル・オフィスへお伺いします。ストレッチベッドも持参するのでご準備は不要です。",
  },
  {
    Icon: Sparkles,
    title: "2種類のストレッチを融合",
    body: "ダイナミックとスタティック、2種類を組み合わせることで柔軟性・疲労回復を同時に実現します。",
  },
];

/** トップページ用の特徴ダイジェスト。詳細は /about へ誘導する。 */
const FeaturesDigestSection = () => (
  <div className="w-full">
    <div className="grid gap-5 md:grid-cols-3">
      {features.map(({ Icon, title, body }) => (
        <article key={title} className="card-premium rounded-2xl bg-white p-6 md:p-7 flex flex-col">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center mb-5">
            <Icon className="w-5.5 h-5.5 text-cyan-600" />
          </div>
          <h3 className="heading-jp text-lg font-bold text-slate-800 leading-snug mb-3">{title}</h3>
          <div className="w-8 h-0.5 rounded-full bg-linear-to-r from-cyan-400 to-cyan-600 mb-4" />
          <p className="text-sm text-slate-500 leading-[1.9] flex-1">{body}</p>
        </article>
      ))}
    </div>

    <div className="mt-8 flex justify-center">
      <Link
        href="/about"
        className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-bold text-sm transition-colors duration-200"
      >
        サービス紹介を詳しく見る
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </div>
);

export default FeaturesDigestSection;
