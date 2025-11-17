'use client'

import React, { useState } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import emailjs from '@emailjs/browser';

// 1. フォームデータの型定義
type FormData = {
    name: string;
    email: string;
    tel: string;
    firstChoiceDate: string;
    firstChoiceTime: string;
    secondChoiceDate?: string;
    secondChoiceTime?: string;
    message?: string;
};

// 2. 送信ステータスの型定義
type Status = 'idle' | 'loading' | 'success' | 'error';

// 3. フォームフィールドのpropsの型定義
type FormFieldProps = {
    label: string;
    name: keyof FormData; // nameをFormDataのキーに限定
    error?: FieldError;
    required?: boolean;
    children: React.ReactNode;
};

// 4. 定数: 再利用するデータは外に切り出す
const TIME_OPTIONS = [
    "09:00","10:00", "11:00", "12:00","13:00", "14:00", "15:00",
    "16:00", "17:00", "18:00", "19:00", "20:00"
];

// 共通の入力フィールドスタイル
const inputStyle = "w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition";
// エラー時のフィールドスタイル
const errorInputStyle = "border-red-500 ring-red-500";

// 各フォーム行のレイアウトを担当するコンポーネント
const FormField = ({ label, name, error, required, children }: FormFieldProps) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 items-start py-4 border-b border-gray-200">
    {/* 左側: ラベルと必須バッジ */}
    <div className="md:col-span-1">
      <label htmlFor={name} className="font-bold text-gray-700 flex items-center">
        <span>{label}</span>
        {required ? (
          <span className="ml-2 text-xs font-semibold bg-red-500 text-white px-2 py-0.5 rounded-full">必須</span>
        ) : (
          <span className="ml-2 text-xs font-semibold bg-gray-400 text-white px-2 py-0.5 rounded-full">任意</span>
        )}
      </label>
    </div>
    <div className="md:col-span-3">
        {children}
        {error && <p className="text-red-500 text-sm mt-1">{label}必須です。</p>}
    </div>
  </div>
);

const ContactSection = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [status, setStatus] = useState<Status>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setStatus('loading');

        try {
            // 環境変数からEmailJSのIDを取得
            const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
            const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
    
            await emailjs.send(serviceID, templateID, data, publicKey);
            
            setStatus('success');
        } catch (error) {
            console.error('Failed to send email:', error);
            setStatus('error');
            setErrorMessage('メッセージの送信に失敗しました。時間をおいて再度お試しください。');
        }
    };

  return (
    <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        無料カウンセリング・体験予約
      </h2>

      {status === 'success' ? (
        <div className="text-center p-8 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-xl font-bold text-green-700">送信完了</h3>
          <p className="mt-2 text-gray-600">お問い合わせありがとうございます。内容を確認の上、担当者よりご連絡いたします。</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <FormField label="お名前" name="name" error={errors.name} required>
            <input 
                type="text" 
                placeholder="例：山田 太郎"
                autoComplete='off'
                className={`${inputStyle} ${errors.name ? errorInputStyle : ''}`}
                {...register("name",{required: true})}
            />
            </FormField>

            <FormField label="メールアドレス" name="email" error={errors.email} required>
                <input
                    id="email"
                    type="email"
                    placeholder="例：example@mail.com"
                    autoComplete="off"
                    className={`${inputStyle} ${errors.email ? errorInputStyle : ''}`}
                    {...register("email", { required: true })}
                />
            </FormField>

            <FormField label="電話番号" name="tel" error={errors.tel} required>
                <input
                    id="tel"
                    type="tel"
                    placeholder="例：090-1234-5678"
                    autoComplete="off"
                    className={`${inputStyle} ${errors.tel ? errorInputStyle : ''}`}
                    {...register("tel", { required: true })}
                />
            </FormField>

            <FormField label="第1希望日程" name="firstChoiceDate" error={errors.firstChoiceDate} required>
                <input
                    id="firstChoiceDate"
                    type="date"
                    className={`${inputStyle} ${errors.firstChoiceDate ? errorInputStyle : ''}`}
                    {...register("firstChoiceDate", { required: true })}
                />
            </FormField>

            <FormField label="第1希望時間" name="firstChoiceTime" error={errors.firstChoiceTime} required>
                <select
                    id="firstChoiceTime"
                    className={`${inputStyle} ${errors.firstChoiceTime ? errorInputStyle : ''}`}
                    {...register("firstChoiceTime", { required: true })}
                >
                    <option value="">ご希望の時間を選択してください</option>
                    {TIME_OPTIONS.map(time => <option key={time} value={time}>{time}</option>)}
                </select>
            </FormField>

            <FormField label="第2希望日程" name="secondChoiceDate" error={errors.secondChoiceDate}>
                <input
                    id="secondChoiceDate"
                    type="date"
                    className={`${inputStyle} ${errors.secondChoiceDate ? errorInputStyle : ''}`}
                    {...register("secondChoiceDate")}
                />
            </FormField>

            <FormField label="第2希望時間" name="secondChoiceTime" error={errors.secondChoiceTime}>
                <select
                    id="secondChoiceTime"
                    className={`${inputStyle} ${errors.secondChoiceTime ? errorInputStyle : ''}`}
                    {...register("secondChoiceTime")}
                >
                    <option value="">ご希望の時間を選択してください</option>
                    {TIME_OPTIONS.map(time => <option key={time} value={time}>{time}</option>)}
                </select>
            </FormField>
            
            <FormField label="お悩みやご質問" name="message" error={errors.message}>
                <textarea
                    id="message"
                    rows={5}
                    placeholder="身体の具体的なお悩みや、ご質問などがあればご記入ください。"
                    autoComplete="off"
                    className={`${inputStyle} ${errors.message ? errorInputStyle : ''}`}
                    {...register("message")}
                />
            </FormField>

            <div className="pt-8 text-center">
                <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="
                        w-3/4 max-w-sm bg-cyan-500 hover:bg-cyan-700 active:bg-cyan-800
                        text-white font-semibold md:text-xl 
                        px-8 py-4 md:px-12 md:py-5
                        rounded-full shadow-xl hover:shadow-2xl
                        transition-all duration-300
                        flex items-center justify-center gap-2
                        text-center mx-auto"
                >
                    {status === 'loading' ? '送信中...' : 'この内容で送信する'}
                </button>
                {status === 'error' && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
            </div>
        </form>
      )}
    </div>
  );
};

export default ContactSection;