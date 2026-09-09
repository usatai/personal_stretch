# 動画アセット

紹介動画をここに置く。置いたあと `app/lib/constants.ts` の `INTRO_VIDEO` を、
同ファイル内にコメントアウトしてあるオブジェクトに差し替える。

| ファイル | 要件 |
|---|---|
| `intro.mp4` | 60〜90秒。H.264 / 720p / 約2Mbps / AAC。**`-movflags +faststart` 必須**。15MB以下 |
| `intro.vtt` | **日本語字幕（必須）**。WCAG 2.1 レベルA（1.2.2）の要件 |
| `../images/intro-poster.webp` | ポスター画像。動画と同じ縦横比 |

```bash
ffmpeg -i input.mov -vf "scale=-2:720" -c:v libx264 -preset slow -crf 24 \
  -c:a aac -b:a 128k -movflags +faststart public/videos/intro.mp4
```

`INTRO_VIDEO` が `null` のあいだは、トップの動画枠は **Section ごと描画されない**。
写真などの代替物で枠を埋めないこと。
