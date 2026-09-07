# Reborn Stretch — UI/UX 改善仕様書

- 作成日: 2026-09-07
- 対象: `jyukiya_lp/stretch-lp`（Next.js 16 / React 19 / Tailwind v4）
- 評価軸: **「お客様が興味を引くHP」= 初めて訪れた人が、読めて・信用できて・迷わず予約に進めるか**
- 参照: 恒久ルールは `design-system/reborn-stretch/MASTER.md`、料金・ページ構成の一次情報は `docs/hp-renewal-plan.md`

> このドキュメントは**実装指示書**である。各項目は「対象 / 現状 / 変更内容 / 完了条件」で構成し、
> 判断を挟まずそのまま実装できる粒度で書いてある。数値（コントラスト比・px）はすべて実測値。

---

## 0. 評価サマリ

| 観点 | 評価 | 根拠 |
|------|------|------|
| 情報設計・回遊 | ◎ | `NAV_ITEMS` 一元管理、全ページ末尾に `CtaBand`、パンくず、見出し重複回避のルール化 |
| ブランド一貫性 | ○ | cyan 系で統一、`globals.css` に共通ユーティリティを集約 |
| SEO / 構造化データ | ◎ | LocalBusiness + Offer + FAQPage、canonical / OG 完備 |
| **視認性（コントラスト）** | **×** | **主要CTAボタンの文字が 2.43:1**。注釈・リード文の主力色が軒並み AA 未達 |
| **アクセシビリティ** | **×** | `prefers-reduced-motion` 0箇所、`focus-visible` 2箇所、フォームに `aria-live`/`aria-invalid` 0箇所 |
| **パフォーマンス（LCP）** | **×** | Hero が `unoptimized`、`/results` が約4.7MBのPNG 6枚を `priority` で一括読込 |
| 予約導線 | △ | SPで常時見える予約導線がない。料金カードから予約に進めない |

**結論: 「作りは丁寧だが、読みづらく・重く・スマホで予約ボタンが消える」HP。**
デザインを作り直す必要はない。本書の P1〜P3 を実施すれば「興味を引く」水準に到達する。

### 設計方針の根拠

`ui-ux-pro-max` の照会結果より、本サービスに該当するパターンは
**Trust & Authority + Conversion**（実績・資格・透明な料金・低摩擦フォーム）、
スタイルは **Soft UI Evolution**（やわらかい影 / 200〜300ms / focus visible / WCAG AA+）。
現状の設計方針はこれと一致しており、**方向性は正しい**。不足しているのは実装品質の詰めのみ。

なお同ツールが返した推奨パレット（ピンク／ラベンダー系 `#EC4899`）は**採用しない**。
既に cyan のブランドが確立しているためで、DBのパレット提案はブランド未確定時向けの初期値である。

---

## P1. 可読性とアクセシビリティ（最優先）

### P1-1. コントラスト是正

WCAG 2.1 AA の基準は **本文 4.5:1 / 大きい文字（18.66px以上の太字 または 24px以上）3:1**。
以下はすべて実測値。「置換先」の列のとおりに機械的に置き換えれば基準を満たす。

#### (a) 最重要 — 主要CTAボタン `.btn-cyan`

| 対象 | 現状 | 比 | 判定 |
|---|---|---|---|
| `app/globals.css` `.btn-cyan` | 白文字 on `linear-gradient(135deg, #06b6d4, #0891b2)` | **2.43 〜 3.68** | ✗ |

ボタン文字は `text-base font-bold`（16px）＝「大きい文字」に該当しないため 4.5:1 が必要。
**サイト全体の主要導線がこの1箇所に集約されている**ため、最優先で是正する。

```css
/* app/globals.css — .btn-cyan */
/* 変更前 */
background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
/* 変更後（白文字で 5.36 〜 7.27 を確保） */
background: linear-gradient(135deg, #0e7490 0%, #155e75 100%);
```

影の色（`rgba(6,182,212,.38)` 等）は変更しない。明度が下がる分の華やかさは影で保たれる。

#### (b) 白・淡色背景の上のテキスト

| 対象ファイル:行 | 現状クラス | 比 | 置換先 | 置換後 |
|---|---|---|---|---|
| `sections/contact-section.tsx:241` | `text-slate-400` | 2.56 | `text-slate-500` | 4.76 |
| `sections/bodychange-section.tsx:23, 74` | `text-slate-400` | 2.46 | `text-slate-500` | 4.57 |
| `sections/features-section.tsx:144, 172` | `text-slate-400` | 2.29 | `text-slate-500` | 4.76 |
| `sections/price-section.tsx:35` | `text-slate-400` | 2.46 | `text-slate-500` | 4.57 |
| `layout/page-hero.tsx:25`（パンくず） | `text-slate-400` | 2.46 | `text-slate-500` | 4.57 |
| `price/newcomer-ticket.tsx:43` | `text-slate-400` | 2.56 | `text-slate-500` | 4.76 |
| `price/student-price.tsx:31` | `text-slate-400` | 2.56 | `text-slate-500` | 4.76 |
| `price/ticket-table.tsx:46, 103` | `text-slate-400` | 2.56 | `text-slate-500` | 4.76 |
| `contact-section.tsx:31` | `placeholder:text-slate-400` | 2.56 | `placeholder:text-slate-500` | 4.76 |
| `layout/page-hero.tsx:38` | `text-cyan-500` | 2.43 | `text-cyan-700` | 5.36 |
| `sections/features-section.tsx:57, 92, 136, 159` | `text-cyan-500` | 2.43 | `text-cyan-700` | 5.36 |
| `sections/hero-section.tsx:94` | `text-cyan-500` | 2.43 | `text-cyan-700` | 5.36 |
| `header.tsx:46` | `text-cyan-500` | 2.43 | `text-cyan-700` | 5.36 |
| `globals.css` `.eyebrow` | `color:#0891b2` @10.9px | 3.68 | `color:#0e7490` + `font-size:.75rem` | 5.36 |
| `price/single-price-cards.tsx:39` | `text-orange-600` on `bg-orange-50` | 3.35 | `text-orange-700` | 4.88 |
| `price/newcomer-ticket.tsx:36` | `text-orange-600` on `bg-orange-50` | 3.35 | `text-orange-700` | 4.88 |
| `price/newcomer-ticket.tsx:19, 61` | `text-orange-600` on 白 | 3.56 | `text-orange-700` | 5.18 |
| `price/newcomer-guide.tsx:41, 43` | `text-orange-600` | 3.56 | `text-orange-700` | 5.18 |

> `sections/features-section.tsx:100` の `text-slate-400` は **`bg-slate-900` の上** にあり
> 6.96:1 で基準を満たしている。**ここは変更しない**（一括置換で壊さないこと）。
> 同様に `features-section.tsx:186` / `newcomer-guide.tsx:73` / `faq-section.tsx:23` の
> `text-cyan-500` は**アイコンの色**であり、装飾要素なので変更しない。

#### (c) 濃色背景の上のテキスト

| 対象ファイル:行 | 現状クラス | 比 | 置換先 | 置換後 |
|---|---|---|---|---|
| `sections/concerns-section.tsx:29`（リード） | `text-white/35` | 3.08 | `text-white/60` | 7.29 |
| `sections/concerns-section.tsx:57`（英字ラベル） | `text-white/18` | **1.61** | `text-white/50` | 5.27 |
| `sections/concerns-section.tsx:68` | `text-white/30` | 2.55 | `text-white/60` | 7.29 |
| `sections/concerns-section.tsx:54`（本文） | `text-white/65` | 8.49 | 変更不要 | — |
| `sections/concerns-section.tsx:48`（番号） | `text-cyan-700` | 3.77 | `text-cyan-500` | 8.31 |
| `sections/footer-section.tsx:19, 39` | `text-slate-400` on cyan-900 | 3.55 | `text-slate-300` | 6.14 |
| `sections/footer-section.tsx:61`（コピーライト） | `text-slate-500` | 2.36 | `text-slate-300` | 6.14 |

#### (d) グラデーション帯の上のテキスト

グラデーションは**最も明るい端**で判定する。

| 対象ファイル:行 | 現状 | 比（明側） | 変更内容 |
|---|---|---|---|
| `price/first-time-banner.tsx:15` の文字 | `text-cyan-100` on `from-cyan-600` | 3.29 | **:10 の帯**を `from-cyan-700 to-cyan-800` に変更（→ 5.15） |
| `price/newcomer-ticket.tsx:22` の文字 | `text-orange-100` on `from-orange-500` | 2.45 | **:16 の帯**を `from-orange-600 to-orange-700` に変更（→ 4.5以上） |
| `price/newcomer-ticket.tsx:17-19` の白文字 | 白文字 on `from-orange-500` | 2.80 | 同上（→ 5.18） |
| `layout/cta-band.tsx:28`（lead）/ `:47`（関連リンク） | `text-cyan-100` on `from-cyan-600` | 3.29 | **:22 の帯**を `from-cyan-700 to-cyan-900` に変更 |
| `sections/contact-section.tsx:113` の文字 | `text-cyan-100` on `from-cyan-600` | 3.29 | **:112 の帯**を `from-cyan-700 to-cyan-800` に変更（→ 5.15） |

**完了条件**: 上記すべてを反映後、主要4ページ（`/` `/price` `/contact` `/results`）を
Chrome DevTools の Lighthouse アクセシビリティ監査にかけ、コントラスト項目の指摘が 0 件であること。

---

### P1-2. 極小フォントの底上げ

`text-[9px]` / `text-[10px]` / `text-[11px]` が **50箇所**存在する。日本語は英字より小さく見えるため、
9〜11px は実質的に読めない。**下限を 12px（`text-xs`）とする。**

| ファイル | 該当数 |
|---|---|
| `sections/features-section.tsx` | 11 |
| `sections/trainer-section.tsx` | 6 |
| `price/ticket-table.tsx` | 6 |
| `sections/hero-section.tsx` | 4 |
| `sections/footer-section.tsx` | 4 |
| `sections/contact-section.tsx` | 3 |
| `sections/area-section.tsx` | 3 |
| `sections/bodychange-section.tsx` / `price/single-price-cards.tsx` / `layout/page-hero.tsx` / `header.tsx` | 各 2 |
| `faq-section.tsx` / `concerns-section.tsx` / `student-price.tsx` / `newcomer-ticket.tsx` / `newcomer-guide.tsx` | 各 1 |

置換ルール:

- `text-[9px]` / `text-[10px]` / `text-[11px]` → **`text-xs`（12px）**
- ただし `tracking-[0.2em]` 以上の英字ラベル（`FEATURE 01` / `TYPE 01` / `Scroll` 等）は
  12px でも視覚的に大きく見えるため `text-xs` のままで良い
- `header.tsx:39-41` / `footer-section.tsx:14-16` の**ロゴ内 6〜8px 文字**は例外扱い。
  丸ロゴの中に3行を詰め込む構造自体に無理があるため、
  「Reborn / Stretch」の2行のみとし `text-[10px]`、「訪問ストレッチ」の行は削除する
  （同じ情報が隣のテキストとフッター本文に出ている）
- 本文の主力が `text-sm`（14px）で49箇所。`Section` の `lead` と各セクションの本文段落は
  **`text-base`（16px）** に引き上げる。主要顧客層（肩こり・腰痛を抱えた層）を考慮した判断

**完了条件**: `grep -rno "text-\[\(6\|7\|8\|9\|10\|11\)px\]" app` の結果が、ロゴの例外2箇所のみになること。

---

### P1-3. フォーカスリング（キーボード操作）

現状 `focus-visible` / `focus:ring` の指定は**サイト全体で2箇所のみ**
（`header.tsx:80-86` のハンバーガー、`contact-section.tsx:31` の入力欄）。
`Link` で作られた全ナビゲーション・全CTAにフォーカス表示がない。

`app/globals.css` の BASE ブロック直後に追加する:

```css
/* ============================================
   FOCUS (keyboard navigation)
   ============================================ */
:focus-visible {
  outline: 2px solid var(--cyan-deep);
  outline-offset: 2px;
  border-radius: 4px;
}

/* 濃色背景の上では白リングにする */
.on-dark :focus-visible {
  outline-color: #ffffff;
}

.btn-cyan:focus-visible {
  outline: 2px solid var(--cyan-deep);
  outline-offset: 3px;
}
```

`.on-dark` は `concerns-section.tsx:13` / `cta-band.tsx:22` / `footer-section.tsx:6` のルート `<section>`・`<footer>` に付与する。

**完了条件**: Tab キーのみで トップ → ヘッダーナビ → Hero CTA → 各セクションリンク → フッター まで
移動でき、すべての停止位置でリングが視認できること。

---

### P1-4. `prefers-reduced-motion` 対応（現状 0 箇所）

`globals.css` には `.anim-fade-up` 等の常時再生アニメーション、`.anim-float`（無限ループ）、
`.card-premium` のホバー移動、`ScrollReveal` の全要素フェードインがある。
動きに酔いやすいユーザーへの配慮が完全に欠落している。

`app/globals.css` の末尾に追加:

```css
/* ============================================
   REDUCED MOTION
   ============================================ */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
  .anim-fade-up,
  .anim-fade-left,
  .anim-fade-right,
  .anim-scale-up {
    opacity: 1;
    transform: none;
  }
  .anim-float { animation: none; }
  .card-premium:hover { transform: none; }
}
```

あわせて `app/components/ui/scroll-reveal.tsx` を修正する。CSS の無効化だけでは
`visible === false` のとき `opacity-0` が残り、**コンテンツが永久に見えなくなる**ため:

```tsx
useEffect(() => {
  // 動きを減らす設定のときは、アニメーションせず即座に表示する
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setVisible(true);
    return;
  }
  const observer = new IntersectionObserver(/* 既存のまま */);
  // ...
}, []);
```

**完了条件**: macOS「視差効果を減らす」/ Windows「アニメーションを表示する: オフ」を有効にした状態で
全8ページを開き、(1) 要素が動かない (2) すべてのコンテンツが最初から見えている、の2点を満たすこと。

---

### P1-5. 予約フォームの支援技術対応

`contact-section.tsx` に `aria-live` / `role="alert"` / `aria-invalid` が **0箇所**。
エラーが赤色でしか伝わっておらず、スクリーンリーダー利用者と色覚特性のあるユーザーに届かない。

1. **入力欄にエラー状態を関連付ける** — `FormField` を変更し、`children` に props を渡すか、
   各 `<input>`/`<select>`/`<textarea>` に直接付与する:

```tsx
aria-invalid={errors.name ? 'true' : undefined}
aria-describedby={errors.name ? 'name-error' : undefined}
```

2. **エラー文を通知する** — `FormField` 内のエラー段落（`contact-section.tsx:63`）:

```tsx
<p id={`${name}-error`} role="alert" className="text-red-500 text-xs flex items-center gap-1">
```

`text-red-500`（#ef4444, 白背景で 3.76:1）は AA 未達のため **`text-red-600`（#dc2626, 4.83:1）** に変更する。
`errorInputStyle`（`:32`）の `border-red-400` も `border-red-600` にする。

3. **送信結果を通知する** — 送信失敗メッセージ（`contact-section.tsx:257`）:

```tsx
<p role="alert" aria-live="assertive" className="text-red-600 text-sm text-center mt-3">
```

4. **送信完了時のフォーカス移動** — 現状はフォームが消えて完了画面に差し替わるだけで、
   スクリーンリーダーには何も起きていないように見える。完了ブロックに `role="status"` と
   `tabIndex={-1}` を付け、`status === 'success'` になった時点で `focus()` する:

```tsx
const successRef = useRef<HTMLDivElement>(null);
useEffect(() => { if (status === 'success') successRef.current?.focus(); }, [status]);
// ...
<div ref={successRef} role="status" tabIndex={-1} className="text-center py-12 outline-none">
```

5. **送信中の通知** — 送信ボタン（`:247`）に `aria-busy={status === 'loading'}` を付与する。

> セキュリティ実装（ハニーポット / 2秒遅延 / レート制限 / サニタイズ）には一切触れないこと。
> `CLAUDE.md` の「セキュリティ実装」節の4点が差分レビュー後も残っていることを確認する。

**完了条件**: 空欄のまま送信し、(1) 各エラーが読み上げられる (2) `aria-invalid` が付く
(3) 送信成功時に完了メッセージへフォーカスが移る、の3点を VoiceOver で確認できること。

---

### P1-6. タップ領域 44×44px

| 対象 | 現状 | 変更内容 |
|---|---|---|
| `header.tsx:80-86`（ハンバーガー） | `p-2` + `w-5` アイコン ≒ **36px** | `p-2` → `p-3`、または `min-w-11 min-h-11 flex items-center justify-center` を追加 |
| `header.tsx:94-104`（モバイルメニュー項目） | `py-2.5` + 14px ≒ **40px** | `py-3` + `min-h-11` |
| `footer-section.tsx:27-31`（フッターリンク） | 13px テキストのみ、`gap-y-3` | 各 `<a>` に `inline-flex items-center min-h-11 px-2`、`gap-y-1` に調整 |
| `layout/cta-band.tsx:44-49`（関連ページリンク） | テキストのみ | 同上 |
| `page-hero.tsx:27`（パンくず「ホーム」） | 11px テキスト | `inline-flex items-center min-h-11` |

隣接する操作要素の間隔は **8px 以上** を維持する（現行の `gap-x-6 gap-y-3` は条件を満たす）。

**完了条件**: DevTools のモバイルエミュレーション（iPhone SE / 375px）で、
上記すべての要素が 44×44px 以上の当たり判定を持つこと。

---

## P2. パフォーマンス（LCP / 転送量）

| # | 対象 | 現状 | 指示 |
|---|---|---|---|
| 1 | `sections/hero-section.tsx:76` | `unoptimized` + `quality={100}` | **`unoptimized` を削除**。これがあると WebP/AVIF 変換も srcset も無効になり、全画面幅で 145KB の JPEG をそのまま配信してしまう。`quality={100}` も削除し既定値（75）に任せる |
| 2 | `results/page.tsx` の Before/After 6枚 | 各 600〜965KB の PNG、`bodychange-section.tsx:41, 67` で全て `priority={true}` | 写真である以上 PNG は不適。**WebP へ変換**（合計 約4.7MB → 1MB 以下が目標）。`priority` は**先頭1組のみ**とし、残りは既定の遅延読込に任せる。`BodyChangeSection` に `index === 0` で判定する実装を入れる |
| 3 | `sections/area-section.tsx:28` の `osaka.png` | 711KB + `priority` | `priority` を削除。WebP 化 |
| 4 | `sections/trainer-section.tsx:23` / `feature-layout.tsx:31` | 一律 `priority={true}`（サイト全体で `priority` が10箇所） | ファーストビューに入らない画像から削除。残すのは Hero（`hero-section.tsx:78`）と `/about` の Feature 01（`features-section.tsx:49`）のみ |
| 5 | `sections/hero-section.tsx:66` | `min-h-[88vh]` | **`min-h-[88svh]`** に変更。モバイルでアドレスバーの伸縮によりレイアウトが跳ねるのを防ぐ |
| 6 | `globals.css` の `.reveal` / `.reveal.revealed` | 未使用（`ScrollReveal` は Tailwind クラスで実装済み） | 削除（死んだCSS） |

**完了条件**:
`npm run build` と `npm run lint` が通ること。
本番ビルドに対する Lighthouse（モバイル・スロットリング既定）で
**LCP < 2.5s / CLS < 0.1 / Performance スコア 90 以上**、
かつ `/results` の初期転送量が 1.5MB 以下であること。

---

## P3. 予約導線の是正（既存要素の再配置のみ）

> 新規セクションの追加は本書のスコープ外。ここでは**既にある CTA と リンクの置き場所を直す**。

### P3-1. SP で予約導線が消える

`header.tsx:72-76` の予約CTAは `hidden lg:flex`。スマートフォンでは、
ハンバーガーを開かない限り予約ボタンが画面上に一切存在しない。
訪問者の大半がスマートフォンであることを踏まえると、これが最大の機会損失。

`app/components/layout/sticky-cta.tsx` を新規作成する（新規セクションではなく既存CTAの再配置）:

```tsx
"use client";
// SP専用の固定予約バー。Hero を通過してから表示する。
// 既存の .btn-cyan と /contact リンクをそのまま使う。
```

要件:

- `lg:hidden`、`fixed bottom-0 inset-x-0 z-40`
- `window.scrollY > 400` で表示（`{ passive: true }`。`header.tsx` の既存スクロール判定と同じ方式）
- `pb-[env(safe-area-inset-bottom)]` で iPhone のホームインジケータを避ける
- 文言は既存の `CtaBand` と揃え「ご予約・お問い合わせ」＋「初回50%OFF」
- 高さは 64px 程度。`prefers-reduced-motion` 時はスライドインさせない
- `/contact` では表示しない（`usePathname()` で判定）。フォームの送信ボタンと競合するため
- `layout.tsx` の `<FooterSection />` の後に配置する

### P3-2. 料金カードから予約に進めない

`price/single-price-cards.tsx` はコースを選ばせる画面でありながら、カード内に遷移先がない。
ユーザーは「60分にしよう」と決めた直後、ページ最下部の `CtaBand` まで自力でスクロールし、
フォームでもう一度コースを選び直すことになる。

1. **カードに予約リンクを追加** — `single-price-cards.tsx` の特徴リスト（`<ul>`）の直後:

```tsx
<Link
  href={`/contact?course=${course.id}`}
  className="btn-cyan mt-6 inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full text-sm"
>
  このコースで予約する
  <ArrowRight className="w-4 h-4" />
</Link>
```

2. **フォーム側で受け取る** — `contact-section.tsx`:

```tsx
const searchParams = useSearchParams();
const courseParam = searchParams.get('course');
// COURSES に実在する id のときだけ採用する（不正値をそのまま初期値にしない）
const defaultCourse = COURSES.some((c) => c.id === courseParam) ? courseParam! : '';
const { register, ... } = useForm<FormData>({ defaultValues: { choiceStretch: defaultCourse } });
```

`useSearchParams` は Suspense 境界を要求するため、`app/contact/page.tsx` の `<ContactSection />` を
`<Suspense>` で包むこと。ビルドエラーになる。

> 料金の値は一切扱わない。`CLAUDE.md`「予約フォームの設計方針」のとおり、
> フォームに料金プランの選択項目は置かない。渡すのはコース（40/60/80分）のみ。

### P3-3. 見出し階層の乱れ

| 対象 | 現状 | 変更内容 |
|---|---|---|
| `sections/faq-section.tsx:20` | 各質問が `<h2>`（12個並ぶ） | `<h3>` に変更。ページの `h1` は `PageHero`、Q&A は下位項目 |
| `sections/bodychange-section.tsx:19` | `<h2 id="bodychange-title">` | そのままで良い（`/results` 内で唯一の h2） |
| `sections/trainer-section.tsx:33` | トレーナー名が `<h2>` | そのままで良い |
| `sections/area-section.tsx:33` | 「大阪全域 対応」が `<h2>` | そのままで良い |

**完了条件**: 各ページで `h1` が1個、`h2` の下に `h3` が来ており、レベルの飛びがないこと。

---

## 実装順序と検証

1. **P1-1（コントラスト）→ P1-2（フォントサイズ）** — 見た目の印象が最も変わる。まとめて実施し目視確認
2. **P1-3 〜 P1-6（a11y）** — CSS 追加と属性追加が中心。副作用が小さい
3. **P2（パフォーマンス）** — 画像変換を含むため独立して実施
4. **P3（導線）** — 新規ファイル1つと既存2ファイルの変更

各段階で必ず実行する:

```bash
npm run build   # Turbopack ビルド
npm run lint    # ESLint
```

最終確認:

- 375px / 768px / 1024px / 1440px の4幅で全8ページに横スクロールが出ないこと
- Lighthouse（モバイル）で Performance 90+ / Accessibility 100
- 予約フォームのセキュリティ4点（ハニーポット / 2秒遅延 / レート制限 / サニタイズ）が残っていること
- 表示される全価格が `docs/hp-renewal-plan.md` §2 の表と一致すること（P3-2 でフォームに触れるため）

---

## 付録: 本書のスコープ外（将来検討）

以下は「お客様が興味を引く」観点では効果が大きいものの、**オーナーからの素材・情報提供が必要**なため
今回の改善スコープから除外した。実施を判断する際の一覧として記載する。

| 項目 | 根拠 | 必要な素材 |
|---|---|---|
| **お客様の声（3〜5件）** | `ui-ux-pro-max` landing 照会: 社会的証明は CTA の直前に置く。写真＋氏名＋属性が揃うと効果が高い | 実際の利用者の声、掲載許諾 |
| **Before/After のスライダー化＋数値** | 同照会の「Before-After Transformation」パターンはコンバージョン +45%。現状は写真を並べているだけで、`/results` に埋もれている | 可動域の測定値など具体的な数値 |
| **施術当日の流れ** | 訪問型サービスは「家に他人が来る」心理的ハードルが最大の障壁。当日の流れが不明なまま予約させている | 実際の手順、所要時間 |
| **LINE / 電話の即時導線** | 現状の連絡手段はフォームと Instagram のみ。`tel:` リンクは1つもない | 公開可能な電話番号、LINE公式アカウント |
| **キャンセルポリシー** | サイト内に「キャンセル」の記載が0箇所。有料サービスとしての信頼性に関わる | 規定の確定 |
| **`FAQ_ITEMS` の `TODO(要確認)` 4件** | 回数券の有効期限・支払方法・学生割引の対象範囲・回数券の家族共有。現在すべて「お問い合わせください」で回答になっていない | `docs/hp-renewal-plan.md` §7-2 Q3〜Q6 の回答 |
