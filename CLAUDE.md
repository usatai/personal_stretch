# Reborn Stretch LP — Claude Code ガイド

## プロジェクト概要

- **サービス名**: Reborn Stretch（大阪の訪問パーソナルストレッチ）
- **種別**: ワンページLP（スクロール型、SPA的構成）
- **本番URL**: https://tajima-stretch.com

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

## ディレクトリ構成

```
app/
  page.tsx              # メインLP（<Section>コンポーネントでセクション管理）
  layout.tsx            # ルートレイアウト・メタデータ設定
  globals.css           # グローバルスタイル（Tailwind import）
  components/
    header.tsx          # スティッキーヘッダー（PC/SP ハンバーガーメニュー対応）
    feature-layout.tsx  # 画像+テキスト左右配置（reverse propで反転）
    sections/
      hero-section.tsx
      concerns-section.tsx
      trainer-section.tsx
      price-section.tsx
      bodychange-section.tsx
      area-section.tsx
      contact-section.tsx   # お問い合わせフォーム（セキュリティ実装あり）
      footer-section.tsx
    ui/
      button.tsx
  lib/
    types.ts      # 型定義（ContactFormData, PricingPlan 等）
    constants.ts  # 定数（PRICING, SERVICE_AREAS, SITE_CONFIG, CONTACT_INFO）
    utils.ts      # cn() ユーティリティ
  api/
    send-email/route.ts  # POST /api/send-email（EmailJS経由メール送信）
public/images/           # 画像アセット（before/after, trainer, hero等）
```

## コーディング規約

- **スタイリング**: Tailwindクラスのみ（CSS Modules未使用）
- **メインカラー**: cyan-500系グラデーション（`from-cyan-50 to-cyan-100` 等）
- **レスポンシブ**: モバイルファースト（sm: / md: / lg: ブレークポイント）
- **セクション追加**: `app/page.tsx` の `<Section id="..." subTitle="..." mainTitle="...">` を使う
- **定数追加**: `app/lib/constants.ts` に集約する
- **型追加**: `app/lib/types.ts` に追加する

## 環境変数（.env.local が必須）

```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
```

サーバー側 API（`api/send-email/route.ts`）は `EMAILJS_*`（NEXT_PUBLIC_ なし）も参照する。

## セキュリティ実装（変更時は必ず維持すること）

| 場所 | 実装内容 |
|------|---------|
| `contact-section.tsx` | ハニーポット・2秒遅延（ボット対策）・react-hook-form バリデーション |
| `api/send-email/route.ts` | IP単位レート制限（5分3件）・入力サニタイゼーション（XSS対策） |
