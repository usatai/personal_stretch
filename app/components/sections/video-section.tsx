import Image from "next/image";
import { Play } from "lucide-react";
import VideoPlayer from "@/app/components/ui/video-player";
import { INTRO_VIDEO, INTRO_VIDEO_PLACEHOLDER } from "@/app/lib/constants";

/**
 * 動画を差し込むための枠。
 *
 * ★ここに紹介文・肩書き・資格などを足さないこと。
 *   トレーナーのプロフィールは /trainer が担当しており、
 *   ここに書くと文言がそのまま重複する（CLAUDE.md「同じ内容を複数ページに置かない」）。
 *   このコンポーネントの役割は「動画を置く」ことだけに限る。
 *
 * 描画の優先順位:
 *   1. INTRO_VIDEO がある     → 本物のプレーヤー
 *   2. プレースホルダが有効   → 見た目確認用のダミー（★公開前に必ず切る）
 *   3. どちらも無い           → 何も描画しない
 */
const VideoSection = () => {
  if (INTRO_VIDEO) return <VideoPlayer video={INTRO_VIDEO} />;
  if (!INTRO_VIDEO_PLACEHOLDER) return null;

  const { poster, width, height } = INTRO_VIDEO_PLACEHOLDER;

  return (
    // ★見た目の確認用。クリックしても何も起きない（押せるように見せて動かないのを避けるため、
    //   button ではなく div にしている）。本番の動画が入ったらこの分岐ごと不要になる。
    <div
      className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-cyan"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={poster}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        loading="lazy"
        className="object-cover"
      />
      <span className="absolute inset-0 bg-slate-900/40" />

      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/95 shadow-cyan-lg">
          <Play className="w-6 h-6 text-cyan-800 fill-cyan-800 translate-x-0.5" />
        </span>
        <span className="text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
          ここに紹介動画が入ります
        </span>
      </span>

      {/* 本番素材と取り違えないための印 */}
      <span className="absolute top-3 left-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold tracking-widest text-white uppercase">
        Demo
      </span>
    </div>
  );
};

export default VideoSection;
