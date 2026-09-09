'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form';
import { CheckCircle2, Send } from 'lucide-react';
import { COURSES } from '@/app/lib/constants';
import {
  CONTACT_LIMITS,
  RESERVATION_MONTHS_AHEAD,
  TIME_OPTIONS,
  type ContactPayload,
} from '@/app/lib/contact';
import { ContactSendError, sendContactRequest } from '@/app/lib/send-contact';

// フォームの項目定義は app/lib/contact.ts に集約している。
// 項目を増減するときはそちらを直せば、EmailJS 直送信・API経由の両方に反映される。
type FormData = ContactPayload;

type Status = 'idle' | 'loading' | 'success' | 'error';

type FormFieldProps = {
  label: string;
  name: keyof FormData;
  error?: FieldError;
  required?: boolean;
  children: React.ReactNode;
};

// text-base（16px）は必須。16px 未満だと iOS Safari が入力欄フォーカス時に
// ページを自動ズームし、レイアウトが崩れる。
const inputStyle =
  "w-full p-3 min-h-12 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-200 text-slate-800 placeholder:text-slate-500 text-base";
const errorInputStyle = "border-red-600 ring-1 ring-red-600";

const validatePhone = (v: string) => {
  const digits = v.replace(/\D/g, '').length;
  return /^[\d\-\+\(\)\s]+$/.test(v) && digits >= 10 && digits <= 15;
};

const validateDate = (value: string) => {
  if (!value) return true;
  const sel = new Date(value);
  const today = new Date(); today.setHours(0,0,0,0);
  const max = new Date(); max.setMonth(max.getMonth() + RESERVATION_MONTHS_AHEAD);
  return sel >= today && sel <= max;
};

const HoneyPot = ({ register }: { register: UseFormRegister<FormData> }) => (
  <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
    <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" />
  </div>
);

/**
 * 入力欄1つ分の枠。
 * ★エラー時の aria-invalid / aria-describedby は、ここで children に注入している。
 *   各入力欄側に書くと付け忘れが起きるため、この1箇所に集約する。
 */
const FormField = ({ label, name, error, required, children }: FormFieldProps) => {
  const errorId = `${name}-error`;
  const describedBy = error ? errorId : undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="flex items-center gap-2 text-base font-semibold text-slate-700">
        {label}
        {required
          ? <span className="text-xs font-bold bg-red-600 text-white px-2 py-0.5 rounded-full">必須</span>
          : <span className="text-xs font-medium bg-slate-500 text-white px-2 py-0.5 rounded-full">任意</span>}
      </label>

      {React.isValidElement<{ 'aria-invalid'?: boolean; 'aria-describedby'?: string }>(children)
        ? React.cloneElement(children, {
            'aria-invalid': error ? true : undefined,
            'aria-describedby': describedBy,
          })
        : children}

      {error && (
        // role="alert" で読み上げる。色（赤）だけで伝えず、アイコンと文言を併記する。
        <p id={errorId} role="alert" className="text-red-600 text-sm flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-bold shrink-0">!</span>
          {error.message || `${label}が不正です。`}
        </p>
      )}
    </div>
  );
};

const ContactSection = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormReady, setIsFormReady] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsFormReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // 料金ページの「このコースで予約する」から ?course=min60 の形で渡ってくる。
  // ★next/navigation の useSearchParams は使わないこと。
  //   あれを使うと Suspense 境界が必須になり、フォーム全体が SSR の HTML から消えて
  //   ハイドレートまで空白が出る。ここでマウント後に読むことで、
  //   /contact を静的なまま保ちつつフォームを最初の HTML に含められる。
  //   COURSES に実在する id のときだけ採用し、不正値は初期値にしない。
  useEffect(() => {
    const course = new URLSearchParams(window.location.search).get('course');
    if (course && COURSES.some((c) => c.id === course)) {
      setValue('choiceStretch', course);
    }
  }, [setValue]);

  // 送信完了でフォームが消えるため、完了メッセージへフォーカスを移す。
  // これがないとスクリーンリーダー利用者には何も起きていないように見える。
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.website) return;
    if (!isFormReady) { setErrorMessage('少々お待ちください。'); setStatus('error'); return; }

    setStatus('loading');
    setErrorMessage('');

    try {
      // 送信経路（EmailJS 直送信 / API ルート経由）の分岐は send-contact.ts に閉じている
      await sendContactRequest(data);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof ContactSendError
          ? error.message
          : '送信に失敗しました。時間をおいて再度お試しください。'
      );
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date(); maxDate.setMonth(maxDate.getMonth() + RESERVATION_MONTHS_AHEAD);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto">
      {/* カード */}
      <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(6,182,212,0.12)] border border-cyan-100/70 overflow-hidden">
        {/* ヘッダー帯 */}
        <div className="bg-linear-to-r from-cyan-700 to-cyan-800 px-8 py-5 text-white">
          <h2 className="heading-jp text-xl font-bold">ストレッチ施術のご予約</h2>
          <p className="text-cyan-50 text-sm mt-1">初回は全コース50% OFF。お気軽にご予約ください。</p>
        </div>

        <div className="px-6 sm:px-8 py-8">
          {status === 'success' ? (
            <div
              ref={successRef}
              role="status"
              tabIndex={-1}
              className="text-center py-12 outline-none"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="heading-jp text-xl font-bold text-slate-800 mb-2">送信完了</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                お問い合わせありがとうございます。<br />内容を確認の上、担当者よりご連絡いたします。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <HoneyPot register={register} />

              <FormField label="お名前" name="name" error={errors.name} required>
                <input
                  id="name" type="text" placeholder="例: 山田 太郎" autoComplete="name" maxLength={CONTACT_LIMITS.name}
                  className={`${inputStyle} ${errors.name ? errorInputStyle : ''}`}
                  {...register("name", {
                    required: "お名前は必須です",
                    minLength: { value: 2, message: "2文字以上で入力してください" },
                    maxLength: { value: CONTACT_LIMITS.name, message: `${CONTACT_LIMITS.name}文字以内で入力してください` },
                    pattern: { value: /^[ぁ-んァ-ヶー一-龯a-zA-Z\s]+$/, message: "有効な名前を入力してください" },
                  })}
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="メールアドレス" name="email" error={errors.email} required>
                  <input
                    id="email" type="email" placeholder="例: example@mail.com" autoComplete="email" maxLength={CONTACT_LIMITS.email}
                    className={`${inputStyle} ${errors.email ? errorInputStyle : ''}`}
                    {...register("email", {
                      required: "メールアドレスは必須です",
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "有効なメールアドレスを入力してください" },
                      maxLength: { value: CONTACT_LIMITS.email, message: `${CONTACT_LIMITS.email}文字以内で入力してください` },
                    })}
                  />
                </FormField>

                <FormField label="電話番号" name="tel" error={errors.tel} required>
                  <input
                    id="tel" type="tel" placeholder="例: 090-1234-5678" autoComplete="tel" maxLength={CONTACT_LIMITS.tel}
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
                  <option value="">コースを選択してください</option>
                  {COURSES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </FormField>

              <div className="bg-slate-50 rounded-2xl p-4 space-y-4">
                <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">第1希望日程</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="日付" name="firstChoiceDate" error={errors.firstChoiceDate} required>
                    <input
                      id="firstChoiceDate" type="date" min={today} max={maxDateStr}
                      className={`${inputStyle} ${errors.firstChoiceDate ? errorInputStyle : ''}`}
                      {...register("firstChoiceDate", {
                        required: "第1希望日程は必須です",
                        validate: (v) => validateDate(v) || `本日から${RESERVATION_MONTHS_AHEAD}ヶ月以内の日付を選択してください`,
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
                <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">第2希望日程（任意）</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="日付" name="secondChoiceDate" error={errors.secondChoiceDate}>
                    <input
                      id="secondChoiceDate" type="date" min={today} max={maxDateStr}
                      className={`${inputStyle} ${errors.secondChoiceDate ? errorInputStyle : ''}`}
                      {...register("secondChoiceDate", {
                        validate: (v) => !v || validateDate(v) || `本日から${RESERVATION_MONTHS_AHEAD}ヶ月以内の日付を選択してください`,
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
                  id="message" rows={4} autoComplete="off" maxLength={CONTACT_LIMITS.message}
                  placeholder="身体の具体的なお悩みや、ご質問などがあればご記入ください。"
                  className={`${inputStyle} resize-none ${errors.message ? errorInputStyle : ''}`}
                  {...register("message", { maxLength: { value: CONTACT_LIMITS.message, message: `${CONTACT_LIMITS.message}文字以内で入力してください` } })}
                />
              </FormField>

              <p className="text-sm text-slate-500 leading-relaxed">
                ※ 回数券・学生割引をご希望の場合は、お悩み・ご質問欄にご記入いただくか、
                当日トレーナーへお申し付けください。料金は施術当日にご案内いたします。
              </p>

              <div className="pt-2">
                <button
                  type="submit"
                  aria-busy={status === 'loading'}
                  disabled={status === 'loading' || !isFormReady}
                  className="btn-cyan w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {status === 'loading'
                    ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> 送信中...</>
                    : <><Send className="w-4 h-4" /> この内容で送信する</>}
                </button>
                {status === 'error' && (
                  <p role="alert" aria-live="assertive" className="text-red-600 text-base text-center mt-3">
                    {errorMessage}
                  </p>
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
