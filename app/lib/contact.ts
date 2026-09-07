// 予約フォームの送信データ定義（クライアント／サーバー共有）
//
// ★フォーム項目を増減するときは、必ずこのファイルだけを直せば済むようにすること。
//   クライアント（EmailJS 直送信）と API ルート（サーバー送信）の両方が
//   ここの型・許可値・変換関数を参照しているため、二重管理にならない。

import { COURSES } from "./constants";

/** 予約フォームが送信するデータ。choiceStretch は Course["id"]（"min40" 等）。 */
export interface ContactPayload {
  name: string;
  email: string;
  tel: string;
  /** Course の id。EmailJS へ送る直前にラベル（"40分コース"）へ変換する。 */
  choiceStretch: string;
  firstChoiceDate: string;
  firstChoiceTime: string;
  secondChoiceDate?: string;
  secondChoiceTime?: string;
  message?: string;
  /** ハニーポット。人間が入力することはない。 */
  website?: string;
}

/** 予約可能な時間帯。フォームの選択肢とサーバーの許可値を一本化するためここに置く。 */
export const TIME_OPTIONS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
] as const;

/** 各フィールドの文字数上限。クライアントの maxLength とサーバー検証で共用する。 */
export const CONTACT_LIMITS = {
  name: 50,
  email: 100,
  tel: 20,
  message: 1000,
} as const;

/** 予約受付の上限日数（本日から何ヶ月先まで受け付けるか） */
export const RESERVATION_MONTHS_AHEAD = 3;

/** コースIDを表示ラベルへ。未知のIDはそのまま返す（サーバー側で許可値チェックに弾かれる）。 */
export function courseLabel(courseId: string): string {
  return COURSES.find((c) => c.id === courseId)?.label ?? courseId;
}

/**
 * EmailJS テンプレートへ渡すパラメータを組み立てる。
 *
 * ★EmailJS テンプレート側の変数名と1対1で対応している。
 *   ここのキーを変える場合は EmailJS 管理画面のテンプレートも同時に更新すること。
 *   ハニーポット（website）は送信対象に含めない。
 */
export function toEmailTemplateParams(payload: ContactPayload): Record<string, string> {
  return {
    name: payload.name,
    email: payload.email,
    tel: payload.tel,
    choiceStretch: courseLabel(payload.choiceStretch),
    firstChoiceDate: payload.firstChoiceDate,
    firstChoiceTime: payload.firstChoiceTime,
    secondChoiceDate: payload.secondChoiceDate || "",
    secondChoiceTime: payload.secondChoiceTime || "",
    message: payload.message || "",
  };
}

/**
 * 送信経路の切り替え。
 *
 * - 既定（未設定）: ブラウザから EmailJS へ直接送信する **現在の運用**
 * - `NEXT_PUBLIC_USE_CONTACT_API=true`: `POST /api/send-email` を経由する
 *
 * API 経由に切り替えるとレート制限とサーバー側検証が有効になる。
 * 移行手順は docs/hp-renewal-plan.md §12 を参照。
 */
export function shouldUseContactApi(): boolean {
  return process.env.NEXT_PUBLIC_USE_CONTACT_API === "true";
}
