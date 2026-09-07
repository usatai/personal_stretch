// 価格算出ロジック（純関数のみ）
//
// 価格を数値でハードコードせず、必ずこのファイルの関数を通して算出する。
// 全ての金額が「基本単価 × 回数 × (1 - 割引率)」で端数なく割り切れることは
// docs/hp-renewal-plan.md §2-7 で検証済み。

import { FIRST_TIME_DISCOUNT_RATE, STUDENT_DISCOUNT_RATE } from "./constants";
import type { Course, PriceTier, TicketPlan } from "./types";

/** 3桁区切りの数値文字列を返す（"23,280"）。円記号は呼び出し側で付ける。 */
export function formatYen(value: number): string {
  return value.toLocaleString("ja-JP");
}

/** 割引率をラベル化する（0.15 → "15%OFF"） */
export function discountLabel(rate: number): string {
  return `${Math.round(rate * 100)}%OFF`;
}

/** 回数券の価格を算出する */
export function calcTicketPrice(course: Course, plan: TicketPlan): PriceTier {
  const listPrice = course.basePrice * plan.sessions;
  const total = Math.round(listPrice * (1 - plan.discountRate));
  return {
    total,
    perSession: Math.round(total / plan.sessions),
    listPrice,
    saved: listPrice - total,
    discountRate: plan.discountRate,
  };
}

/** 初回体験価格（50%OFF）を算出する */
export function calcFirstTimePrice(course: Course): number {
  return Math.round(course.basePrice * (1 - FIRST_TIME_DISCOUNT_RATE));
}

/**
 * 学生価格（20%OFF）を算出する。
 * ★学生割引は単発のみ。回数券と組み合わせる関数は意図的に用意していない。
 *   仕様上存在しない料金を誤って画面に出さないための設計上の制約。
 */
export function calcStudentPrice(course: Course): number {
  return Math.round(course.basePrice * (1 - STUDENT_DISCOUNT_RATE));
}
