// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import emailjs from '@emailjs/browser';

// レート制限用のシンプルなメモリストア
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const limit = rateLimitStore.get(ip);
    const FIVE_MINUTES = 5 * 60 * 1000;
    
    if (!limit || now - limit.timestamp > FIVE_MINUTES) {
        rateLimitStore.set(ip, { count: 1, timestamp: now });
        return true;
    }
    
    if (limit.count >= 3) {
        return false;
    }
    
    limit.count++;
    return true;
}

// 入力値のサニタイゼーション
function sanitizeInput(input: string): string {
    return input
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .trim();
}

// バリデーション関数
function validateEmail(email: string): boolean {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
    const phoneRegex = /^[\d\-\+\(\)\s]+$/;
    const digitCount = phone.replace(/\D/g, '').length;
    return phoneRegex.test(phone) && digitCount >= 10 && digitCount <= 15;
}

export async function POST(request: NextRequest) {
    try {
        // IPベースのレート制限
        const ip = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';
        
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { message: '送信回数が多すぎます。5分後に再度お試しください。' },
                { status: 429 }
            );
        }

        const data = await request.json();

        // 必須フィールドのチェック
        if (!data.name || !data.email || !data.tel || 
            !data.firstChoiceDate || !data.firstChoiceTime || 
            !data.choiceStretch) {
            return NextResponse.json(
                { message: '必須項目が入力されていません。' },
                { status: 400 }
            );
        }

        // バリデーション
        if (!validateEmail(data.email)) {
            return NextResponse.json(
                { message: '有効なメールアドレスを入力してください。' },
                { status: 400 }
            );
        }

        if (!validatePhone(data.tel)) {
            return NextResponse.json(
                { message: '有効な電話番号を入力してください。' },
                { status: 400 }
            );
        }

        // 入力値のサニタイゼーション
        const sanitizedData = {
            name: sanitizeInput(data.name),
            email: sanitizeInput(data.email),
            tel: sanitizeInput(data.tel),
            firstChoiceDate: data.firstChoiceDate,
            firstChoiceTime: data.firstChoiceTime,
            choiceStretch: data.choiceStretch,
            secondChoiceDate: data.secondChoiceDate || '',
            secondChoiceTime: data.secondChoiceTime || '',
            message: data.message ? sanitizeInput(data.message) : '',
            status: 'PENDING'
        };

        // EmailJSで送信(環境変数から取得)
        const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                service_id: process.env.EMAILJS_SERVICE_ID,
                template_id: process.env.EMAILJS_TEMPLATE_ID,
                user_id: process.env.EMAILJS_PUBLIC_KEY, // ← これ必須
                template_params: sanitizedData, // ← 以前の sanitizedData をそのまま使える
            }),
        });

        const emailResText = await emailRes.text();
        console.log("EmailJS response:", emailRes.status, emailResText);

        return NextResponse.json(
            { message: '送信が完了しました。' },
            { status: 200 }
        );

    } catch (error) {
        // 本番環境ではエラー詳細を出さない
        if (process.env.NODE_ENV === 'development') {
            console.error('Email send error:', error);
        }
        
        return NextResponse.json(
            { message: 'メール送信に失敗しました。時間をおいて再度お試しください。' },
            { status: 500 }
        );
    }

    // try {
    //     const response = await fetch("http://localhost:8080/api/v1/bookings",{
    //         method : 'POST',
    //         headers : {'Content-Type' : 'application/json'},
    //         credentials : 'include',
    //         body : JSON.stringify({
    //             name: data.name,
    //             email: data.email,
    //             tel: data.tel,
    //             firstChoiceDate: data.firstChoiceDate,
    //             firstChoiceTime: data.firstChoiceTime,
    //             choiceStretch: data.choiceStretch,
    //             secondChoiceDate: data.secondChoiceDate,
    //             secondChoiceTime: data.secondChoiceTime,
    //             message: data.message,
    //             status: 'PENDING'
    //         })
    //     });

    //     if (response.ok) {
    //         setStatus('success');
    //     } else {
    //         setStatus('error');
    //         setErrorMessage('メッセージの送信に失敗しました。');
    //     }
    // } catch (error) {
    //     console.error('送信エラー',error);
    //     setStatus('error');
    //     setErrorMessage('メッセージの送信に失敗しました。時間をおいて再度お試しください。');
    // }
}