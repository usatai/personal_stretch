// 型定義

/* ============================================================
   料金モデル
   価格の実数値はここでも constants.ts でも持たない。
   基本単価（Course.basePrice）と割引率のみを保持し、
   実際の金額は app/lib/pricing.ts の純関数で算出する。
   ============================================================ */

export type CourseId = "min40" | "min60" | "min80";

export type TicketPlanId = "new3" | "t4" | "t8" | "t12";

/** 施術コース（時間単位）。単発・回数券・学生料金すべての算出基点。 */
export interface Course {
  id: CourseId;
  /** 施術時間（分） */
  minutes: number;
  /** 表示名（例: "40分コース"） */
  label: string;
  /** 単発1回あたりの税込価格。全割引はこの値から算出する。 */
  basePrice: number;
  /** カード見出し下の一言 */
  catchCopy: string;
  /** 特徴リスト */
  features: string[];
  /** 最も人気のコースに true */
  isPopular?: boolean;
}

/** 回数券プラン */
export interface TicketPlan {
  id: TicketPlanId;
  /** 表示名（例: "新規限定3回券"） */
  label: string;
  /** 表の列見出し用の短い表示名（例: "4回券"） */
  shortLabel: string;
  /** 券に含まれる施術回数 */
  sessions: number;
  /** 割引率（0.15 = 15%OFF） */
  discountRate: number;
  /** 初めてご利用の方限定の券か */
  newCustomerOnly: boolean;
  note?: string;
}

/** 表示用に算出済みの価格。pricing.ts の関数のみが生成する。 */
export interface PriceTier {
  /** 割引後の総額 */
  total: number;
  /** 1回あたりの金額 */
  perSession: number;
  /** 割引前の総額 */
  listPrice: number;
  /** 割引額（listPrice - total） */
  saved: number;
  /** 割引率（0.15 = 15%OFF） */
  discountRate: number;
}

/* ============================================================
   その他
   ============================================================ */

/** 出張エリア。実データは constants.ts の SERVICE_AREAS が唯一の情報源。 */
export interface ServiceArea {
  name: string;
  districts: string[];
  /** 出張費無料エリアか。画面の「無料」バッジと文言はこの値から導出する。 */
  isFree: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}
