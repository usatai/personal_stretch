"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useRef, useState } from "react";
import type { SiteVideo } from "@/app/lib/types";

/**
 * クリックして初めて動画を読み込むプレーヤー（ファサード方式）。
 *
 * ★自動再生しないこと。ページを開いた時点ではポスター画像1枚しか読み込まず、
 *   再生ボタンを押すまで .mp4 へのリクエストは発生しない。
 *   これにより (1) 通信量を無駄にしない (2) LCP を悪化させない
 *   (3) prefers-reduced-motion 下でも勝手に動かない、の3つを同時に満たす。
 *
 * ★字幕トラックは必須。SiteVideo.captionSrc を任意項目にしないこと
 *   （WCAG 2.1 レベルA / 1.2.2）。
 */
const VideoPlayer = ({ video }: { video: SiteVideo }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-cyan"
      // 実寸から縦横比を確保し、再生前後でレイアウトを動かさない
      style={{ aspectRatio: `${video.width} / ${video.height}` }}
    >
      {playing ? (
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full"
        >
          <track kind="captions" srcLang="ja" label="日本語" src={video.captionSrc} default />
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${video.title}を再生する`}
          className="group absolute inset-0 w-full h-full cursor-pointer"
        >
          <Image
            src={video.poster}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            loading="lazy"
            className="object-cover"
          />
          {/* 再生ボタンを白文字で読ませるための下地 */}
          <span className="absolute inset-0 bg-slate-900/30 transition-colors duration-200 group-hover:bg-slate-900/40" />

          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/95 shadow-cyan-lg transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none">
              <Play className="w-6 h-6 text-cyan-800 fill-cyan-800 translate-x-0.5" />
            </span>
            <span className="text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              再生する
            </span>
          </span>
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
