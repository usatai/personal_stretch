'use client'

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { UseFormRegister } from 'react-hook-form';


type FormData = {
    name: string;
    email: string;
    tel: string;
    firstChoiceDate: string;
    firstChoiceTime: string;
    choiceStretch: string;
    secondChoiceDate?: string;
    secondChoiceTime?: string;
    message?: string;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

type FormFieldProps = {
    label: string;
    name: keyof FormData;
    error?: FieldError;
    required?: boolean;
    children: React.ReactNode;
};

const TIME_OPTIONS = [
    "09:00","10:00", "11:00", "12:00","13:00", "14:00", "15:00",
    "16:00", "17:00", "18:00", "19:00", "20:00"
];

const STRETCH_PLAN = [
    "40分コース","60分コース", "80分コース"
];

const inputStyle = "md:w-120 md:ml-10 w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition";
const errorInputStyle = "border-red-500 ring-red-500";

// 電話番号のバリデーション
const validatePhone = (value: string): boolean => {
    const phoneRegex = /^[\d\-\+\(\)\s]+$/;
    const digitCount = value.replace(/\D/g, '').length;
    return phoneRegex.test(value) && digitCount >= 10 && digitCount <= 15;
};

// 日付のバリデーション(今日以降、3ヶ月以内)
const validateDate = (value: string): boolean => {
    if (!value) return true;
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    
    return selectedDate >= today && selectedDate <= threeMonthsLater;
};

// ハニーポット(ボット対策)
const HoneyPot = ({ register }: { register: UseFormRegister<FormData & { website?: string }> }) => (
    <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" />
    </div>
);

const FormField = ({ label, name, error, required, children }: FormFieldProps) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 items-start py-4 border-b border-gray-200">
    <div className="md:col-span-1">
      <label htmlFor={name} className="font-bold text-gray-700 flex items-center whitespace-nowrap">
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
        {error && <p className="text-red-500 text-sm mt-1 ml-10">{error.message || `${label}が不正です。`}</p>}
    </div>
  </div>
);

const ContactSection = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData & { website?: string }>();
    const [status, setStatus] = useState<Status>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [isFormReady, setIsFormReady] = useState(false);

    // フォームが表示されてから2秒後に送信可能にする(ボット対策)
    useEffect(() => {
        const timer = setTimeout(() => setIsFormReady(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const onSubmit: SubmitHandler<FormData & { website?: string }> = async (data) => {
        if (data.website) return; // ハニーポット
    
        if (!isFormReady) {
            setErrorMessage('少々お待ちください。');
            setStatus('error');
            return;
        }
    
        setStatus('loading');
        setErrorMessage('');
    
        try {
            const result = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    name: data.name,
                    email: data.email,
                    tel: data.tel,
                    firstChoiceDate: data.firstChoiceDate,
                    firstChoiceTime: data.firstChoiceTime,
                    choiceStretch: data.choiceStretch,
                    secondChoiceDate: data.secondChoiceDate || '',
                    secondChoiceTime: data.secondChoiceTime || '',
                    message: data.message || '',
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );
    
            console.log('EmailJS result:', result);
    
            setStatus('success');
        } catch (error) {
            console.error('EmailJS送信エラー:', error);
            setStatus('error');
            setErrorMessage('送信に失敗しました。時間をおいて再度お試しください。');
        }
    };

    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        ストレッチ施術予約
      </h2>

      {status === 'success' ? (
        <div className="text-center p-8 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-xl font-bold text-green-700">送信完了</h3>
          <p className="mt-2 text-gray-600">お問い合わせありがとうございます。内容を確認の上、担当者よりご連絡いたします。</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* ハニーポット(非表示フィールド) */}
            <HoneyPot register={register} />

            <FormField label="お名前" name="name" error={errors.name} required>
                <input 
                    type="text" 
                    placeholder="例: 山田 太郎"
                    autoComplete='name'
                    maxLength={50}
                    className={`${inputStyle} ${errors.name ? errorInputStyle : ''}`}
                    {...register("name", {
                        required: "お名前は必須です",
                        maxLength: { value: 50, message: "50文字以内で入力してください" },
                        minLength: { value: 2, message: "2文字以上で入力してください" },
                        pattern: { 
                            value: /^[ぁ-んァ-ヶー一-龯a-zA-Z\s]+$/, 
                            message: "有効な名前を入力してください" 
                        }
                    })}
                />
            </FormField>

            <FormField label="メールアドレス" name="email" error={errors.email} required>
                <input
                    id="email"
                    type="email"
                    placeholder="例: example@mail.com"
                    autoComplete="email"
                    maxLength={100}
                    className={`${inputStyle} ${errors.email ? errorInputStyle : ''}`}
                    {...register("email", {
                        required: "メールアドレスは必須です",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "有効なメールアドレスを入力してください"
                        },
                        maxLength: { value: 100, message: "100文字以内で入力してください" }
                    })}
                />
            </FormField>

            <FormField label="電話番号" name="tel" error={errors.tel} required>
                <input
                    id="tel"
                    type="tel"
                    placeholder="例: 090-1234-5678"
                    autoComplete="tel"
                    maxLength={20}
                    className={`${inputStyle} ${errors.tel ? errorInputStyle : ''}`}
                    {...register("tel", {
                        required: "電話番号は必須です",
                        validate: value => validatePhone(value) || "有効な電話番号を入力してください"
                    })}
                />
            </FormField>

            <FormField label="第1希望日程" name="firstChoiceDate" error={errors.firstChoiceDate} required>
                <input
                    id="firstChoiceDate"
                    type="date"
                    min={today}
                    max={maxDateStr}
                    className={`${inputStyle} ${errors.firstChoiceDate ? errorInputStyle : ''}`}
                    {...register("firstChoiceDate", {
                        required: "第1希望日程は必須です",
                        validate: value => validateDate(value) || "本日から3ヶ月以内の日付を選択してください"
                    })}
                />
            </FormField>

            <FormField label="第1希望時間" name="firstChoiceTime" error={errors.firstChoiceTime} required>
                <select
                    id="firstChoiceTime"
                    className={`${inputStyle} ${errors.firstChoiceTime ? errorInputStyle : ''}`}
                    {...register("firstChoiceTime", { required: "第1希望時間は必須です" })}
                >
                    <option value="">ご希望の時間を選択してください</option>
                    {TIME_OPTIONS.map(time => <option key={time} value={time}>{time}</option>)}
                </select>
            </FormField>

            <FormField label="希望のストレッチコース" name="choiceStretch" error={errors.choiceStretch} required>
                <select
                    id="choiceStretch"
                    className={`${inputStyle} ${errors.choiceStretch ? errorInputStyle : ''}`}
                    {...register("choiceStretch", { required: "コースの選択は必須です" })}
                >
                    <option value="">ご希望のストレッチのコースを選択してください</option>
                    {STRETCH_PLAN.map(plan => <option key={plan} value={plan}>{plan}</option>)}
                </select>
            </FormField>

            <FormField label="第2希望日程" name="secondChoiceDate" error={errors.secondChoiceDate}>
                <input
                    id="secondChoiceDate"
                    type="date"
                    min={today}
                    max={maxDateStr}
                    className={`${inputStyle} ${errors.secondChoiceDate ? errorInputStyle : ''}`}
                    {...register("secondChoiceDate", {
                        validate: value => !value || validateDate(value) || "本日から3ヶ月以内の日付を選択してください"
                    })}
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
                    maxLength={1000}
                    className={`${inputStyle} ${errors.message ? errorInputStyle : ''}`}
                    {...register("message", {
                        maxLength: { value: 1000, message: "1000文字以内で入力してください" }
                    })}
                />
            </FormField>

            <div className="pt-8 text-center">
                <button 
                    type="submit" 
                    disabled={status === 'loading' || !isFormReady}
                    className="
                        w-3/4 max-w-sm bg-cyan-500 hover:bg-cyan-700 active:bg-cyan-800
                        text-white font-semibold md:text-xl 
                        px-8 py-4 md:px-12 md:py-5
                        rounded-full shadow-xl hover:shadow-2xl
                        transition-all duration-300
                        flex items-center justify-center gap-2
                        text-center mx-auto
                        disabled:opacity-50 disabled:cursor-not-allowed"
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