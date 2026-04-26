'use client'

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { UseFormRegister } from 'react-hook-form';
import { CheckCircle2, Send } from 'lucide-react';

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

const TIME_OPTIONS = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
const STRETCH_PLAN = ["40分コース","60分コース","80分コース"];

const inputStyle =
  "w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all duration-200 text-slate-800 placeholder:text-slate-400 text-sm";
const errorInputStyle = "border-red-400 ring-1 ring-red-400";

const validatePhone = (v: string) => {
  const digits = v.replace(/\D/g, '').length;
  return /^[\d\-\+\(\)\s]+$/.test(v) && digits >= 10 && digits <= 15;
};

const validateDate = (value: string) => {
  if (!value) return true;
  const sel = new Date(value);
  const today = new Date(); today.setHours(0,0,0,0);
  const max = new Date(); max.setMonth(max.getMonth() + 3);
  return sel >= today && sel <= max;
};

const HoneyPot = ({ register }: { register: UseFormRegister<FormData & { website?: string }> }) => (
  <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
    <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" />
  </div>
);

const FormField = ({ label, name, error, required, children }: FormFieldProps) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
      {label}
      {required
        ? <span className="text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">必須</span>
        : <span className="text-[10px] font-medium bg-slate-300 text-white px-2 py-0.5 rounded-full">任意</span>}
    </label>
    {children}
    {error && (
      <p className="text-red-500 text-xs flex items-center gap-1">
        <span className="w-3 h-3 rounded-full bg-red-100 flex items-center justify-center text-[8px] font-bold shrink-0">!</span>
        {error.message || `${label}が不正です。`}
      </p>
    )}
  </div>
);

const ContactSection = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData & { website?: string }>();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsFormReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit: SubmitHandler<FormData & { website?: string }> = async (data) => {
    if (data.website) return;
    if (!isFormReady) { setErrorMessage('少々お待ちください。'); setStatus('error'); return; }

    setStatus('loading');
    setErrorMessage('');

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: data.name, email: data.email, tel: data.tel,
          firstChoiceDate: data.firstChoiceDate, firstChoiceTime: data.firstChoiceTime,
          choiceStretch: data.choiceStretch,
          secondChoiceDate: data.secondChoiceDate || '',
          secondChoiceTime: data.secondChoiceTime || '',
          message: data.message || '',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('送信に失敗しました。時間をおいて再度お試しください。');
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date(); maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto">
      {/* カード */}
      <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(6,182,212,0.12)] border border-cyan-100/70 overflow-hidden">
        {/* ヘッダー帯 */}
        <div className="bg-linear-to-r from-cyan-600 to-cyan-700 px-8 py-5 text-white">
          <h2 className="heading-jp text-xl font-bold">ストレッチ施術のご予約</h2>
          <p className="text-cyan-100 text-xs mt-1">初回は全コース50% OFF。お気軽にご予約ください。</p>
        </div>

        <div className="px-6 sm:px-8 py-8">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="heading-jp text-xl font-bold text-slate-800 mb-2">送信完了</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                お問い合わせありがとうございます。<br />内容を確認の上、担当者よりご連絡いたします。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <HoneyPot register={register} />

              <FormField label="お名前" name="name" error={errors.name} required>
                <input
                  id="name" type="text" placeholder="例: 山田 太郎" autoComplete="name" maxLength={50}
                  className={`${inputStyle} ${errors.name ? errorInputStyle : ''}`}
                  {...register("name", {
                    required: "お名前は必須です",
                    minLength: { value: 2, message: "2文字以上で入力してください" },
                    maxLength: { value: 50, message: "50文字以内で入力してください" },
                    pattern: { value: /^[ぁ-んァ-ヶー一-龯a-zA-Z\s]+$/, message: "有効な名前を入力してください" },
                  })}
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="メールアドレス" name="email" error={errors.email} required>
                  <input
                    id="email" type="email" placeholder="例: example@mail.com" autoComplete="email" maxLength={100}
                    className={`${inputStyle} ${errors.email ? errorInputStyle : ''}`}
                    {...register("email", {
                      required: "メールアドレスは必須です",
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "有効なメールアドレスを入力してください" },
                      maxLength: { value: 100, message: "100文字以内で入力してください" },
                    })}
                  />
                </FormField>

                <FormField label="電話番号" name="tel" error={errors.tel} required>
                  <input
                    id="tel" type="tel" placeholder="例: 090-1234-5678" autoComplete="tel" maxLength={20}
                    className={`${inputStyle} ${errors.tel ? errorInputStyle : ''}`}
                    {...register("tel", {
                      required: "電話番号は必須です",
                      validate: (v) => validatePhone(v) || "有効な電話番号を入力してください",
                    })}
                  />
                </FormField>
              </div>

              <FormField label="希望のストレッチコース" name="choiceStretch" error={errors.choiceStretch} required>
                <select
                  id="choiceStretch"
                  className={`${inputStyle} ${errors.choiceStretch ? errorInputStyle : ''}`}
                  {...register("choiceStretch", { required: "コースの選択は必須です" })}
                >
                  <option value="">ご希望のコースを選択してください</option>
                  {STRETCH_PLAN.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </FormField>

              <div className="bg-slate-50 rounded-2xl p-4 space-y-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">第1希望日程</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="日付" name="firstChoiceDate" error={errors.firstChoiceDate} required>
                    <input
                      id="firstChoiceDate" type="date" min={today} max={maxDateStr}
                      className={`${inputStyle} ${errors.firstChoiceDate ? errorInputStyle : ''}`}
                      {...register("firstChoiceDate", {
                        required: "第1希望日程は必須です",
                        validate: (v) => validateDate(v) || "本日から3ヶ月以内の日付を選択してください",
                      })}
                    />
                  </FormField>
                  <FormField label="時間" name="firstChoiceTime" error={errors.firstChoiceTime} required>
                    <select
                      id="firstChoiceTime"
                      className={`${inputStyle} ${errors.firstChoiceTime ? errorInputStyle : ''}`}
                      {...register("firstChoiceTime", { required: "第1希望時間は必須です" })}
                    >
                      <option value="">時間を選択</option>
                      {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </FormField>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 space-y-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">第2希望日程（任意）</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="日付" name="secondChoiceDate" error={errors.secondChoiceDate}>
                    <input
                      id="secondChoiceDate" type="date" min={today} max={maxDateStr}
                      className={`${inputStyle} ${errors.secondChoiceDate ? errorInputStyle : ''}`}
                      {...register("secondChoiceDate", {
                        validate: (v) => !v || validateDate(v) || "本日から3ヶ月以内の日付を選択してください",
                      })}
                    />
                  </FormField>
                  <FormField label="時間" name="secondChoiceTime" error={errors.secondChoiceTime}>
                    <select
                      id="secondChoiceTime"
                      className={`${inputStyle}`}
                      {...register("secondChoiceTime")}
                    >
                      <option value="">時間を選択</option>
                      {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </FormField>
                </div>
              </div>

              <FormField label="お悩み・ご質問" name="message" error={errors.message}>
                <textarea
                  id="message" rows={4} autoComplete="off" maxLength={1000}
                  placeholder="身体の具体的なお悩みや、ご質問などがあればご記入ください。"
                  className={`${inputStyle} resize-none ${errors.message ? errorInputStyle : ''}`}
                  {...register("message", { maxLength: { value: 1000, message: "1000文字以内で入力してください" } })}
                />
              </FormField>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading' || !isFormReady}
                  className="btn-cyan w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {status === 'loading'
                    ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> 送信中...</>
                    : <><Send className="w-4 h-4" /> この内容で送信する</>}
                </button>
                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center mt-3">{errorMessage}</p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
