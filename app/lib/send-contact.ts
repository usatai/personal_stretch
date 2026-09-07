// 予約フォームの送信処理（クライアント専用）
//
// 送信経路の分岐をここ1箇所に閉じ込めている。
// API ルートへ移行するときに contact-section.tsx を書き換える必要はなく、
// 環境変数 NEXT_PUBLIC_USE_CONTACT_API=true を設定するだけでよい。

import emailjs from "@emailjs/browser";
import {
  type ContactPayload,
  shouldUseContactApi,
  toEmailTemplateParams,
} from "./contact";

/** 送信に失敗したことを表す。message はそのまま画面に表示できる日本語。 */
export class ContactSendError extends Error {}

const GENERIC_ERROR = "送信に失敗しました。時間をおいて再度お試しください。";

/** ブラウザから EmailJS へ直接送信する（現在の運用） */
async function sendViaEmailJs(payload: ContactPayload): Promise<void> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new ContactSendError(GENERIC_ERROR);
  }

  await emailjs.send(serviceId, templateId, toEmailTemplateParams(payload), publicKey);
}

/** API ルート経由で送信する（レート制限・サーバー側検証が有効になる） */
async function sendViaApi(payload: ContactPayload): Promise<void> {
  const res = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // ルートは失敗理由を日本語の message で返すため、それを優先して表示する
    const body = await res.json().catch(() => null);
    throw new ContactSendError(body?.message || GENERIC_ERROR);
  }
}

/**
 * 予約内容を送信する。
 * 失敗時は ContactSendError を投げる（message はそのまま画面に出せる）。
 */
export async function sendContactRequest(payload: ContactPayload): Promise<void> {
  try {
    if (shouldUseContactApi()) {
      await sendViaApi(payload);
    } else {
      await sendViaEmailJs(payload);
    }
  } catch (error) {
    if (error instanceof ContactSendError) throw error;
    throw new ContactSendError(GENERIC_ERROR);
  }
}
