// app/api/send-email/route.ts
//
// 予約フォームのサーバー側受け口。
//
// ★現在このルートはフォームから呼ばれていない（ブラウザから EmailJS へ直接送信している）。
//   移行するには次の3点が必要。手順は docs/hp-renewal-plan.md §12 を参照。
//     1. .env.local と本番環境に EMAILJS_SERVICE_ID / EMAILJS_TEMPLATE_ID /
//        EMAILJS_PUBLIC_KEY / EMAILJS_PRIVATE_KEY を設定する
//     2. NEXT_PUBLIC_USE_CONTACT_API=true を設定する
//     3. 送信テストを行う（コード変更は不要）

import { NextRequest, NextResponse } from 'next/server';
import { COURSES } from '@/app/lib/constants';
import {
    CONTACT_LIMITS,
    RESERVATION_MONTHS_AHEAD,
    TIME_OPTIONS,
    toEmailTemplateParams,
    type ContactPayload,
} from '@/app/lib/contact';

// 選択式フィールドの許可値。
// 定数から生成しているため、コース・時間帯を増やしても二重管理にならない。
const ALLOWED_COURSE_IDS: string[] = COURSES.map((c) => c.id);
const ALLOWED_TIMES: string[] = [...TIME_OPTIONS];

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

/* ============================================================
   レート制限
   ★このインメモリ実装は単一プロセス内でしか機能しない。
     Vercel などのサーバーレス環境ではインスタンスごとに別のストアになるため、
     厳密な制限が必要になった時点で Upstash Redis 等の外部ストアへ移すこと。
   ============================================================ */

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5分
const RATE_LIMIT_MAX = 3; // 同一IPあたり5分3件
const RATE_LIMIT_MAX_ENTRIES = 10_000; // ストアの上限（メモリ肥大の防止）

const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

/** 期限切れエントリを掃除する。放置すると Map が無制限に増えるため。 */
function pruneRateLimitStore(now: number): void {
    for (const [key, entry] of rateLimitStore) {
        if (now - entry.timestamp > RATE_LIMIT_WINDOW_MS) {
            rateLimitStore.delete(key);
        }
    }
    // 掃除しても上限を超える場合（大量の同時アクセス）は古い順に捨てる
    if (rateLimitStore.size > RATE_LIMIT_MAX_ENTRIES) {
        const oldest = [...rateLimitStore.entries()]
            .sort((a, b) => a[1].timestamp - b[1].timestamp)
            .slice(0, rateLimitStore.size - RATE_LIMIT_MAX_ENTRIES);
        for (const [key] of oldest) rateLimitStore.delete(key);
    }
}

/**
 * 制限に達しているかを確認するだけ（カウントは消費しない）。
 * バリデーションエラーで枠を使い切ると、入力を直しただけの利用者が
 * 5分間ブロックされてしまうため、確認と消費を分けている。
 */
function isRateLimited(ip: string): boolean {
    const now = Date.now();
    pruneRateLimitStore(now);

    const limit = rateLimitStore.get(ip);
    if (!limit || now - limit.timestamp > RATE_LIMIT_WINDOW_MS) return false;
    return limit.count >= RATE_LIMIT_MAX;
}

/** 実際にメール送信を試みる直前に1件分を消費する。 */
function consumeRateLimit(ip: string): void {
    const now = Date.now();
    const limit = rateLimitStore.get(ip);

    if (!limit || now - limit.timestamp > RATE_LIMIT_WINDOW_MS) {
        rateLimitStore.set(ip, { count: 1, timestamp: now });
        return;
    }

    limit.count++;
}

/**
 * クライアントIPを取得する。
 * x-forwarded-for は "client, proxy1, proxy2" 形式になるため先頭を使う。
 * ヘッダ全体をキーにすると、経路が変わるだけで別枠と見なされ制限を回避できてしまう。
 */
function getClientIp(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        const first = forwarded.split(',')[0]?.trim();
        if (first) return first;
    }
    return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

/* ============================================================
   入力の検証・サニタイズ
   ============================================================ */

// 入力値のサニタイゼーション
function sanitizeInput(input: string): string {
    return input
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .trim();
}

function validateEmail(email: string): boolean {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
    const phoneRegex = /^[\d\-\+\(\)\s]+$/;
    const digitCount = phone.replace(/\D/g, '').length;
    return phoneRegex.test(phone) && digitCount >= 10 && digitCount <= 15;
}

// 選択式フィールドは許可値以外を受け付けない（自由入力を通さない）
function isAllowed(value: unknown, allowed: string[]): value is string {
    return typeof value === 'string' && allowed.includes(value);
}

/** 文字列であり、空でなく、上限文字数以内であること */
function isValidText(value: unknown, maxLength: number): value is string {
    return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

// YYYY-MM-DD 形式かつ 本日〜RESERVATION_MONTHS_AHEAD ヶ月以内であること
function validateDate(value: unknown): value is string {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const selected = new Date(`${value}T00:00:00`);
    if (Number.isNaN(selected.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const max = new Date(today);
    max.setMonth(max.getMonth() + RESERVATION_MONTHS_AHEAD);
    return selected >= today && selected <= max;
}

function badRequest(message: string) {
    return NextResponse.json({ message }, { status: 400 });
}

export async function POST(request: NextRequest) {
    try {
        // ── 環境変数の確認 ──
        // EmailJS のサーバーサイド呼び出しには Private Key（accessToken）が必須。
        // Public Key だけだと "API calls are disabled for non-browser applications" で拒否される。
        const serviceId = process.env.EMAILJS_SERVICE_ID;
        const templateId = process.env.EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.EMAILJS_PUBLIC_KEY;
        const privateKey = process.env.EMAILJS_PRIVATE_KEY;

        if (!serviceId || !templateId || !publicKey || !privateKey) {
            if (process.env.NODE_ENV === 'development') {
                console.error(
                    '[send-email] EmailJS の環境変数が未設定です。' +
                    'EMAILJS_SERVICE_ID / EMAILJS_TEMPLATE_ID / EMAILJS_PUBLIC_KEY / EMAILJS_PRIVATE_KEY を設定してください。'
                );
            }
            return NextResponse.json(
                { message: '現在ご予約を受け付けられません。お手数ですがお電話またはSNSからご連絡ください。' },
                { status: 503 }
            );
        }

        // ── レート制限（この時点では確認のみ。消費は送信直前）──
        const clientIp = getClientIp(request);
        if (isRateLimited(clientIp)) {
            return NextResponse.json(
                { message: '送信回数が多すぎます。5分後に再度お試しください。' },
                { status: 429 }
            );
        }

        const data: Partial<ContactPayload> = await request.json();

        // ── ハニーポット（ボットが埋めた場合は成功を装って破棄する）──
        if (data.website) {
            return NextResponse.json({ message: '送信が完了しました。' }, { status: 200 });
        }

        // ── 必須フィールドと文字数上限 ──
        if (!isValidText(data.name, CONTACT_LIMITS.name)) {
            return badRequest('お名前を50文字以内でご入力ください。');
        }
        if (!isValidText(data.email, CONTACT_LIMITS.email)) {
            return badRequest('メールアドレスを100文字以内でご入力ください。');
        }
        if (!isValidText(data.tel, CONTACT_LIMITS.tel)) {
            return badRequest('電話番号を20文字以内でご入力ください。');
        }
        if (data.message !== undefined && data.message !== '' &&
            !isValidText(data.message, CONTACT_LIMITS.message)) {
            return badRequest('お悩み・ご質問は1000文字以内でご入力ください。');
        }

        // ── 形式チェック ──
        if (!validateEmail(data.email)) {
            return badRequest('有効なメールアドレスを入力してください。');
        }
        if (!validatePhone(data.tel)) {
            return badRequest('有効な電話番号を入力してください。');
        }

        // ── 選択式フィールドの許可値チェック ──
        if (!isAllowed(data.choiceStretch, ALLOWED_COURSE_IDS)) {
            return badRequest('コースの選択が不正です。');
        }
        if (!isAllowed(data.firstChoiceTime, ALLOWED_TIMES)) {
            return badRequest('第1希望時間の選択が不正です。');
        }
        if (data.secondChoiceTime && !isAllowed(data.secondChoiceTime, ALLOWED_TIMES)) {
            return badRequest('第2希望時間の選択が不正です。');
        }
        if (!validateDate(data.firstChoiceDate)) {
            return badRequest(`第1希望日は本日から${RESERVATION_MONTHS_AHEAD}ヶ月以内の日付を指定してください。`);
        }
        if (data.secondChoiceDate && !validateDate(data.secondChoiceDate)) {
            return badRequest(`第2希望日は本日から${RESERVATION_MONTHS_AHEAD}ヶ月以内の日付を指定してください。`);
        }

        // ── サニタイズ ──
        // 選択式フィールド（コース・日付・時間）は許可値チェック済みのため加工しない。
        const payload: ContactPayload = {
            name: sanitizeInput(data.name),
            email: sanitizeInput(data.email),
            tel: sanitizeInput(data.tel),
            choiceStretch: data.choiceStretch,
            firstChoiceDate: data.firstChoiceDate,
            firstChoiceTime: data.firstChoiceTime,
            secondChoiceDate: data.secondChoiceDate,
            secondChoiceTime: data.secondChoiceTime,
            message: data.message ? sanitizeInput(data.message) : '',
        };

        // ── EmailJS へ送信 ──
        // ここまで到達したものだけがレート制限の枠を消費する
        consumeRateLimit(clientIp);

        const emailRes = await fetch(EMAILJS_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                accessToken: privateKey, // サーバーからの呼び出しに必須
                template_params: toEmailTemplateParams(payload),
            }),
        });

        // ★EmailJS が失敗しても成功を返してはいけない（予約の取りこぼしになる）
        if (!emailRes.ok) {
            if (process.env.NODE_ENV === 'development') {
                console.error('[send-email] EmailJS error:', emailRes.status, await emailRes.text());
            }
            return NextResponse.json(
                { message: 'メール送信に失敗しました。時間をおいて再度お試しください。' },
                { status: 502 }
            );
        }

        return NextResponse.json({ message: '送信が完了しました。' }, { status: 200 });

    } catch (error) {
        // 本番環境ではエラー詳細を出さない
        if (process.env.NODE_ENV === 'development') {
            console.error('[send-email] Unexpected error:', error);
        }

        return NextResponse.json(
            { message: 'メール送信に失敗しました。時間をおいて再度お試しください。' },
            { status: 500 }
        );
    }
}
