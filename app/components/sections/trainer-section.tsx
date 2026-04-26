import Image from 'next/image';

const trainerData = {
  所有資格: "JSA-CSTP（日本ストレッチ協会ストレッチングトレーナーパートナー）",
  経歴: "大阪リゾート&スポーツ専門学校",
  趣味: "サウナ、露天風呂、フットサル",
  一言: "ストレッチが生活習慣に取り入れられるようストレッチの楽しさや良さをお伝えできればと思います！いつまでも若い身体でいられるように全力でサポートさせていただきます！",
};

const TrainerSection = () => (
  <div className="flex flex-col md:flex-row items-start gap-10 md:gap-14 lg:gap-20">
    {/* 画像 */}
    <div className="w-full md:w-5/12 flex justify-center shrink-0">
      <div className="relative">
        {/* 背景装飾 */}
        <div className="absolute -z-10 w-full h-full rounded-2xl bg-linear-to-br from-cyan-100 to-cyan-200 translate-x-3 translate-y-3" />
        <Image
          src="/images/trainer.jpg"
          alt="トレーナー 田島樹騎邪"
          width={380}
          height={480}
          className="relative rounded-2xl object-cover shadow-[0_8px_30px_rgba(6,182,212,0.18)] w-full h-auto"
          priority={true}
        />
      </div>
    </div>

    {/* テキスト */}
    <div className="w-full md:w-7/12 text-left space-y-6">
      {/* 名前 */}
      <div>
        <p className="text-[11px] font-bold text-cyan-600 tracking-[0.18em] uppercase mb-2">Trainer</p>
        <h3 className="heading-jp text-3xl md:text-4xl font-black text-slate-800 leading-none">
          <ruby>田島<rt className="text-[10px] font-normal">たしま</rt></ruby>
          {' '}
          <ruby>樹騎邪<rt className="text-[10px] font-normal">じゅきや</rt></ruby>
        </h3>
        <div className="mt-3 w-12 h-0.5 rounded-full bg-linear-to-r from-cyan-400 to-cyan-600" />
      </div>

      {/* 資格バッジ */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 bg-cyan-50 border border-cyan-200 text-cyan-700 text-[11px] font-semibold px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
          JSA-CSTP 認定
        </span>
        <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-semibold px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
          大阪リゾート&スポーツ専門学校 卒
        </span>
      </div>

      {/* 詳細情報 */}
      <div className="space-y-4">
        {Object.entries({
          '所有資格': trainerData.所有資格,
          '経歴':     trainerData.経歴,
          '趣味':     trainerData.趣味,
        }).map(([key, value]) => (
          <div key={key} className="border-l-2 border-cyan-300 pl-4">
            <p className="text-[11px] font-bold text-cyan-600 tracking-widest uppercase mb-0.5">{key}</p>
            <p className="text-slate-600 text-sm leading-relaxed">{value}</p>
          </div>
        ))}
      </div>

      {/* メッセージ */}
      <blockquote className="relative bg-linear-to-br from-cyan-50 to-white border border-cyan-100 rounded-2xl p-5 md:p-6 shadow-cyan-sm">
        <div className="absolute -top-3 left-5 text-4xl text-cyan-300 leading-none font-serif select-none">&ldquo;</div>
        <p className="text-slate-600 text-sm md:text-base leading-[1.9] pt-3">
          {trainerData.一言}
        </p>
        <p className="mt-3 text-right text-xs text-cyan-600 font-semibold">— 田島 樹騎邪</p>
      </blockquote>
    </div>
  </div>
);

export default TrainerSection;
