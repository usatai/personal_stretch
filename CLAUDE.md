# Reborn Stretch 公式サイト — Claude Code ガイド

## プロジェクト概要

- **サービス名**: Reborn Stretch（大阪の訪問パーソナルストレッチ）
- **種別**: マルチページ構成の公式HP（8ページ）
- **本番URL**: https://www.reborn-stretch.com/

> LP（1ページ）からHP（8ページ）への移行と料金体系の刷新は **実装済み**。
> 設計の背景・料金の一次情報・残りの確認事項は **`docs/hp-renewal-plan.md`** にある。
> 料金・ページ構成に関わる変更を行う前に必ず同ドキュメントを読むこと。

## 技術スタック

- Next.js 16（App Router）、React 19
- TypeScript 5（`strict: true`）
- Tailwind CSS v4（`@import "tailwindcss"` 方式）
- react-hook-form（フォーム管理・バリデーション）
- @emailjs/browser（メール送信）
- lucide-react / react-icons（アイコン）

## 主要コマンド

```bash
npm run dev    # 開発サーバー起動（Turbopack）
npm run build  # プロダクションビルド（Turbopack）
npm run lint   # ESLint
```

変更を加えたら `npm run build` と `npm run lint` の両方を通すこと。

## ページ構成

| パス | 内容 | 主なコンポーネント |
|------|------|------|
| `/` | トップ（Hero＋お悩み＋特徴要約＋料金抜粋＋CTA） | `hero` / `concerns` / `features-digest` / `price-section` |
| `/about` | サービス紹介・特徴 | `features-section` |
| `/trainer` | トレーナー紹介 | `trainer-section` |
| `/price` | **料金・コース**（単発 / 初回体験 / 回数券 / 学生割引） | `components/price/*` |
| `/results` | お客様の変化（Before/After） | `bodychange-section` |
| `/area` | 出張エリア | `area-section` |
| `/faq` | よくある質問 | `faq-section`（`FAQ_ITEMS`） |
| `/contact` | ご予約・お問い合わせ | `contact-section` |

- ページ間の遷移は `next/link` を使う（`scrollIntoView` によるアンカー移動は HP 化に伴い廃止）。
- ヘッダー／フッター／サイトマップのリンクは `NAV_ITEMS`（`app/lib/constants.ts`）から生成される。
  **ナビに載せるページを追加したら `NAV_ITEMS` に追記**すれば3箇所すべてに反映される。
- ページを追加したら **`export const metadata`（`title` / `description` / `alternates.canonical`）の設定**を必ずセットで行う。
- 下層ページは `PageHero` → `Section` → `CtaBand` の順で構成する（`app/components/layout/`）。
  `CtaBand` は回遊率の低下を防ぐため、各ページ末尾に必ず置く。
- **見出しは `PageHero` の `<h1>` に一本化する。** コンテンツが1ブロックしかないページでは
  `Section` の `subTitle` / `mainTitle` を**省略する**（省略すると見出しブロックを描画しない）。
  指定するのは `/price` のようにページ内へ下位区分を複数持つときだけ。同じ文言が
  h1 と h2 に二重で出るのを防ぐため。
- **同じセクションコンポーネントを複数ページに置かない。** 文言がそのまま重複する。
  トップページには要約版（`features-digest-section` / `price-section`）を、
  下層ページには詳細版（`features-section` / `components/price/*`）を置く。
- `PageHero` の `lead` は、そのページ本文にある文と重複しない内容にする。
- 旧LPのアンカーリンク（`#price` 等）は `components/legacy-hash-redirect.tsx` が新ページへ転送する。
  URLフラグメントはサーバーに届かないため `next.config.ts` の `redirects()` では処理できない。

## 料金体系（変更時の最重要ルール）

**価格を数値でハードコードしないこと。** 基本単価と割引率のみを `app/lib/constants.ts` に持ち、
表示金額は `app/lib/pricing.ts` の純関数で算出する（表と定数の二重管理による不整合を防ぐため）。
JSON-LD の `makesOffer`（`layout.tsx`）も同じ関数を通して生成している。
予約フォームは料金を扱わない（「予約フォームの設計方針」を参照）。

### 基本単価（単発・税込）

| コース | 通常料金 |
|--------|---------|
| 40分 | 6,000円 |
| 60分 | 9,000円 |
| 80分 | 12,000円 |

### 割引の適用ルール

| 区分 | 割引率 | 適用対象 | 併用 |
|------|-------|---------|------|
| 初回体験 | 50%OFF | 初めての方の**1回目のみ** | 他割引と併用不可 |
| 新規限定3回券 | 15%OFF | 新規のお客様の回数券購入時 | 他割引と併用不可 |
| 4回券 / 8回券 / 12回券 | 3% / 6% / 9%OFF | リピーター向け回数券 | 他割引と併用不可 |
| 学生割引 | 20%OFF | **学生の単発利用のみ** | **回数券には適用しない** |

- **「学生 × 回数券」は仕様として存在しない。** 画面・型・関数のいずれにも作らないこと。
  - `pricing.ts` に学生と `TicketPlan` を組み合わせる関数は**意図的に用意していない**。
- 学生の初回利用は初回体験50%OFF の方が安いため、初回は50%OFF、2回目以降に学生20%OFF を適用する。
- 全価格が `基本単価 × 回数 × (1 − 割引率)` で端数なく割り切れることを検証済み。算出は `Math.round()` を使用する。
- 料金を変更した際は、**画面に出る全価格を `docs/hp-renewal-plan.md` §2 の表と突き合わせて検証する**こと。

## ディレクトリ構成

```
app/
  page.tsx              # トップページ
  layout.tsx            # ルートレイアウト・メタデータ・JSON-LD・Header/Footer
  globals.css           # グローバルスタイル（Tailwind import＋共通ユーティリティ）
  sitemap.ts / robots.ts
  about|trainer|price|results|area|faq|contact/page.tsx   # 各下層ページ
  components/
    header.tsx          # スティッキーヘッダー（PC/SP ハンバーガーメニュー対応）
    feature-layout.tsx  # 画像+テキスト左右配置（reverse propで反転）
    legacy-hash-redirect.tsx  # 旧LPのアンカーを新ページへ転送
    layout/
      section.tsx       # 共通セクション枠（見出し＋区切り装飾）
      page-hero.tsx     # 下層ページの見出し＋パンくず
      cta-band.tsx      # ページ末尾の共通CTA＋関連ページ導線
    price/              # 料金表示コンポーネント群
      first-time-banner.tsx    # 初回50%OFFバナー（/ と /price で共用）
      single-price-cards.tsx   # 単発3コース
      newcomer-guide.tsx       # 初回50%OFF と 新規3回券 の使い分け
      newcomer-ticket.tsx      # 新規限定3回券
      ticket-table.tsx         # 回数券（PC=表 / SP=タブ）
      student-price.tsx        # 学生割引
      discount-rules.tsx       # 割引の適用ルール早見表
      price-notes.tsx          # 注意事項
    sections/
      hero-section.tsx
      concerns-section.tsx
      features-section.tsx
      trainer-section.tsx
      features-digest-section.tsx   # トップ用の特徴要約
      price-section.tsx             # トップ用の料金ダイジェスト
      faq-section.tsx               # details/summary によるアコーディオン
      bodychange-section.tsx
      area-section.tsx
      contact-section.tsx   # お問い合わせフォーム（セキュリティ実装あり）
      footer-section.tsx
    ui/
      scroll-reveal.tsx     # IntersectionObserver によるスクロール表示
  lib/
    types.ts      # 型定義（Course, TicketPlan, PriceTier, ServiceArea, FaqItem）
    constants.ts  # 定数（COURSES, TICKET_PLANS, 割引率, DISCOUNT_RULES, NAV_ITEMS,
                  #   FAQ_ITEMS, SERVICE_AREAS, FREE_AREA_LABEL, CONTACT_INFO, SITE_CONFIG）
    pricing.ts    # 価格算出の純関数（calcTicketPrice / calcFirstTimePrice /
                  #   calcStudentPrice / formatYen / discountLabel）
    contact.ts       # 予約フォームの型・選択肢・文字数上限・EmailJS変換（クライアント／サーバー共有）
    send-contact.ts  # 送信処理と送信経路の分岐（クライアント専用）
  api/
    send-email/route.ts  # POST /api/send-email（EmailJS経由メール送信）
docs/
  hp-renewal-plan.md        # リニューアル設計書（料金・ページ構成の一次情報）
  ui-ux-improvement-spec.md # UI/UX 改善仕様書（優先度つきの実装指示）
design-system/reborn-stretch/
  MASTER.md            # デザインシステム（色・タイポ・余白・モーション・a11y の一次情報）
public/images/         # 画像アセット（before/after, trainer, hero等）
```

## コーディング規約

> **色・文字サイズ・余白・モーション・アクセシビリティの判断は
> `design-system/reborn-stretch/MASTER.md` を唯一の正とする。**
> UIを追加・変更する前に同ファイルを読み、末尾の「実装前チェックリスト」を通すこと。
> 未実施の改善項目とその実装手順は `docs/ui-ux-improvement-spec.md` にある。

- **スタイリング**: Tailwindクラスのみ（CSS Modules未使用）。共通の見た目は `globals.css` の
  ユーティリティ（`card-premium` / `btn-cyan` / `heading-jp` / `eyebrow` / `text-gradient` / `shadow-cyan*`）を使う。
- **メインカラー**: cyan系。ただし**文字色に使う cyan は 700（`#0e7490`）以上**とし、
  cyan-500 は面・罫線・アイコンなどの装飾に限る（コントラスト基準を満たさないため）。
  新規向け・限定訴求のみオレンジ系（`orange-700` 以上）をアクセントに使う。詳細は MASTER.md §2。
- **文字サイズ**: 下限 12px（`text-xs`）。本文の既定は 16px（`text-base`）。詳細は MASTER.md §3。
- **レスポンシブ**: モバイルファースト（sm: / md: / lg: ブレークポイント）。
  **表組みは横スクロールさせず、SPではカード縦積みに切り替える。**
- **セクション追加**: 共通の `<Section id subTitle mainTitle>` を使う。
- **定数追加**: `app/lib/constants.ts` に集約する。
- **出張エリア**: `SERVICE_AREAS` が唯一の情報源。エリア名・地域リストをコンポーネント側に
  書かないこと。出張費無料エリアは `isFree` で表し、画面文言は `FREE_AREA_LABEL`
  （`isFree` から導出）を使う。`area-section` / `price-notes` / `FAQ_ITEMS` が参照しており、
  ここを直せば3箇所すべてに反映される。受付時間も同様に `CONTACT_INFO.businessHours` を使う。
- **型追加**: `app/lib/types.ts` に追加する。
- **`"use client"`**: 状態やイベントを持つコンポーネントのみに付ける。ページ本体はサーバーコンポーネントのままにする。

## 環境変数（.env.local が必須）

```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...   # 現行の送信経路（ブラウザ直送信）で使用
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
```

API ルート経由へ切り替える場合のみ、追加で以下を設定する（現在は未設定）。

```
EMAILJS_SERVICE_ID=...
EMAILJS_TEMPLATE_ID=...
EMAILJS_PUBLIC_KEY=...
EMAILJS_PRIVATE_KEY=...          # サーバーからの EmailJS 呼び出しに必須
NEXT_PUBLIC_USE_CONTACT_API=true # これだけで送信経路が切り替わる
```

> 予約フォームに項目を追加した場合、**EmailJS 側のテンプレート更新も必要**（コード変更だけでは
> 新しい項目がメールに反映されない）。オーナーへの依頼が発生する点に注意。

### 予約フォームの設計方針

フォームは**初回予約の受付のみ**を想定している。既存のお客様の回数券残数や
適用中の割引はトレーナー側で管理するため、**フォームに料金プランの選択項目は置かない**。
送信するのは氏名・連絡先・希望コース（40/60/80分）・希望日時・自由記述のみ。
回数券や学生割引の希望は自由記述欄か当日の口頭で受け付ける。

## セキュリティ実装（変更時は必ず維持すること）

| 場所                      | 実装内容                                                            |
| ------------------------- | ------------------------------------------------------------------- |
| `contact-section.tsx`     | ハニーポット・2秒遅延（ボット対策）・react-hook-form バリデーション |
| `api/send-email/route.ts` | IP単位レート制限（5分3件）・入力サニタイゼーション（XSS対策）・選択式フィールドの許可値チェック |

フォーム周りを変更したら、上記4点（ハニーポット / 2秒遅延 / レート制限 / サニタイズ）が
残っていることを差分レビュー時にチェックすること。

### 送信経路（現行 = ブラウザ直送信 / 将来 = APIルート）

現在は `@emailjs/browser` でブラウザから EmailJS へ直接送信している。
`api/send-email/route.ts` は**まだ呼ばれていない**ため、そのレート制限・サニタイズ・
許可値チェックは動作していない。

**切り替えはコード変更不要。** `NEXT_PUBLIC_USE_CONTACT_API=true` と
`EMAILJS_*`（`NEXT_PUBLIC_` なし、Private Key 含む）を設定するだけで API 経由になる。
分岐は `app/lib/send-contact.ts` の1箇所に閉じている。

フォーム項目を増減するときは **`app/lib/contact.ts` だけを直す**こと。
型・時間帯の選択肢・文字数上限・EmailJS テンプレートパラメータの変換をここに集約しており、
クライアントとサーバーの両方が参照している（二重管理を避けるため）。
`toEmailTemplateParams()` のキーは EmailJS テンプレートの変数名と1対1で対応しているため、
キーを変える場合は EmailJS 管理画面のテンプレートも同時に更新する。
