// サイト全体で使用する定数
//
// ★料金について★
// 金額をこのファイルにハードコードしないこと。
// 保持するのは「基本単価（basePrice）」と「割引率」だけで、
// 表示される金額は app/lib/pricing.ts の純関数で算出する。
// 料金表と定数の二重管理による不整合を防ぐため。
// 詳細は docs/hp-renewal-plan.md §2 を参照。

import type { Course, FaqItem, ServiceArea, TicketPlan } from "./types";

export const SITE_CONFIG = {
  name: "Reborn Stretch",
  description: "プロのトレーナーによる完全マンツーマンの訪問パーソナルストレッチ",
  url: "https://www.reborn-stretch.com",
  ogImage: "/images/stretchPC.png",
  instagram: "https://www.instagram.com/reborn_stretch?igsh=MW83cDRncmZpMDMzZA==",
} as const;

export const CONTACT_INFO = {
  businessHours: "9:00〜21:00（最終受付20:00）",
} as const;

/* ============================================================
   ナビゲーション（ヘッダー・フッター共通）
   ページを追加したら app/sitemap.ts にも追記すること。
   ============================================================ */

export const NAV_ITEMS = [
  { label: "サービス紹介", href: "/about" },
  { label: "トレーナー", href: "/trainer" },
  { label: "料金・コース", href: "/price" },
  { label: "お客様の変化", href: "/results" },
  { label: "出張エリア", href: "/area" },
  { label: "よくある質問", href: "/faq" },
] as const;

/* ============================================================
   施術コース（料金の基点）
   ============================================================ */

export const COURSES: Course[] = [
  {
    id: "min40",
    minutes: 40,
    label: "40分コース",
    basePrice: 6000,
    catchCopy: "短時間でスッキリしたい方向け",
    features: ["気になる部位を集中ケア", "短時間でスッキリしたい方向け", "初回体験に最適"],
  },
  {
    id: "min60",
    minutes: 60,
    label: "60分コース",
    basePrice: 9000,
    catchCopy: "全身をしっかりメンテナンス",
    features: ["全身をしっかりメンテナンス", "バランス良くケアしたい方向け", "最も人気のコース"],
    isPopular: true,
  },
  {
    id: "min80",
    minutes: 80,
    label: "80分コース",
    basePrice: 12000,
    catchCopy: "より集中的なケア",
    features: ["より集中的なケア", "ハイグレードな施術内容", "じっくり時間をかけたい方向け"],
  },
];

/* ============================================================
   割引
   ============================================================ */

/** 初回体験: 初めての方の1回目のみ 50%OFF */
export const FIRST_TIME_DISCOUNT_RATE = 0.5;

/**
 * 学生割引: 単発（都度払い）のみ 20%OFF。
 * ★回数券には適用しない。学生 × 回数券は仕様として存在しないため、
 *   画面・型・関数のいずれにも組み合わせを作らないこと。
 */
export const STUDENT_DISCOUNT_RATE = 0.2;

/** 回数券プラン */
export const TICKET_PLANS: TicketPlan[] = [
  {
    id: "new3",
    label: "新規限定3回券",
    shortLabel: "3回券",
    sessions: 3,
    discountRate: 0.15,
    newCustomerOnly: true,
    note: "初めてご利用の方限定",
  },
  { id: "t4", label: "4回券", shortLabel: "4回券", sessions: 4, discountRate: 0.03, newCustomerOnly: false },
  { id: "t8", label: "8回券", shortLabel: "8回券", sessions: 8, discountRate: 0.06, newCustomerOnly: false },
  { id: "t12", label: "12回券", shortLabel: "12回券", sessions: 12, discountRate: 0.09, newCustomerOnly: false },
];

/** 新規限定3回券（単体で訴求するため個別に取り出す） */
export const NEWCOMER_TICKET_PLAN: TicketPlan = TICKET_PLANS.find((p) => p.newCustomerOnly)!;

/** リピーター向け回数券（4回券 / 8回券 / 12回券） */
export const REPEAT_TICKET_PLANS: TicketPlan[] = TICKET_PLANS.filter((p) => !p.newCustomerOnly);

/** 割引の適用ルール早見表（/price と /faq で共用） */
export const DISCOUNT_RULES = [
  { name: "初回体験 50%OFF", target: "初めての方の1回目のみ", combinable: "他割引との併用不可" },
  { name: "新規限定3回券 15%OFF", target: "新規のお客様の回数券購入時", combinable: "他割引との併用不可" },
  { name: "回数券 3〜9%OFF", target: "4回券 / 8回券 / 12回券", combinable: "他割引との併用不可" },
  { name: "学生割引 20%OFF", target: "学生の単発利用のみ", combinable: "回数券には適用不可" },
] as const;

/* ============================================================
   出張エリア
   ============================================================ */

/**
 * 出張エリア。表示は area-section.tsx がこの配列だけを参照する。
 * ★出張費無料エリアは isFree で表す。画面の文言も isFree から導出しているため、
 *   エリアや無料条件を変えるときはこの配列だけを直せばよい。
 */
export const SERVICE_AREAS: ServiceArea[] = [
  { name: "大阪市内", districts: ["梅田", "難波", "天王寺", "本町", "新大阪"], isFree: false },
  { name: "北摂エリア", districts: ["豊中", "吹田", "茨木", "高槻", "摂津"], isFree: false },
  { name: "東大阪・八尾", districts: ["東大阪", "八尾", "柏原", "藤井寺", "大東市"], isFree: true },
  { name: "堺・南大阪", districts: ["堺", "和泉", "岸和田", "泉佐野"], isFree: false },
];

/** 出張費無料エリア名（"東大阪・八尾"）。画面の文言はここから組み立てる。 */
export const FREE_AREA_LABEL = SERVICE_AREAS.filter((a) => a.isFree)
  .map((a) => a.name)
  .join("・");

/* ============================================================
   よくある質問
   ============================================================ */

export const FAQ_ITEMS: FaqItem[] = [
  // --- 料金・割引（確定仕様） ---
  {
    question: "初回体験50%OFFと新規限定3回券は併用できますか？",
    answer:
      "併用はできません。「まず1回試したい方」は初回体験50%OFF、「続けるつもりで始めたい方」は新規限定3回券15%OFFをお選びください。初回体験をご利用いただいた後に、新規限定3回券や回数券へお進みいただくこともできます。",
  },
  {
    question: "学生割引は回数券にも使えますか？",
    answer:
      "学生割引20%OFFは単発（都度払い）のみのご提供となります。回数券には適用されませんのでご了承ください。",
  },
  {
    question: "回数券にはどのような種類がありますか？",
    answer:
      "初めての方向けの「新規限定3回券（15%OFF）」と、継続してご利用いただく方向けの「4回券（3%OFF）」「8回券（6%OFF）」「12回券（9%OFF）」をご用意しています。回数が多いほど1回あたりの料金がお得になります。",
  },
  // TODO(要確認): 有効期限をオーナーに確認のうえ確定させる（docs/hp-renewal-plan.md §7-2 Q3）
  {
    question: "回数券の有効期限はありますか？",
    answer:
      "有効期限についてはお問い合わせください。ご購入前にご案内いたします。",
  },
  // TODO(要確認): 支払方法を確定させる（同 Q4）
  {
    question: "支払い方法を教えてください。",
    answer:
      "お支払い方法については、ご予約時にご案内いたします。詳しくはお気軽にお問い合わせください。",
  },
  // TODO(要確認): 学生の対象範囲・学生証提示の要否を確定させる（同 Q5）
  {
    question: "学生割引の対象を教えてください。",
    answer:
      "学生の方を対象とした割引です。適用条件の詳細はお問い合わせください。",
  },
  // TODO(要確認): 譲渡・家族間シェア・返金の可否を確定させる（同 Q6）
  {
    question: "回数券を家族と分けて使うことはできますか？",
    answer:
      "回数券のご利用方法についてはお問い合わせください。ご購入前にご案内いたします。",
  },
  // --- サービス内容（既存情報から確定） ---
  {
    question: "出張費はかかりますか？",
    answer:
      `${FREE_AREA_LABEL}エリアは出張費無料です。その他のエリアについては、対象エリアによって異なる場合がありますのでお問い合わせください。`,
  },
  {
    question: "どこで施術を受けられますか？",
    answer:
      "ご自宅・ホテル・オフィスなど、ご指定の場所へトレーナーがお伺いします。ストレッチベッドを持参いたしますので、施術用の設備をご用意いただく必要はありません。",
  },
  {
    question: "服装や持ち物は必要ですか？",
    answer:
      "動きやすい服装をご用意ください。それ以外に特別なご準備は必要ありません。",
  },
  {
    question: "受付時間を教えてください。",
    answer: `${CONTACT_INFO.businessHours}で承っております。`,
  },
  {
    question: "どのコースを選べばよいですか？",
    answer:
      "気になる部位を集中してケアしたい方は40分コース、全身をバランスよくメンテナンスしたい方は60分コース、じっくり時間をかけたい方は80分コースがおすすめです。迷われる場合はご予約時にご相談ください。",
  },
];
