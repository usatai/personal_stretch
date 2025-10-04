import React from 'react';

// 各フォーム行のレイアウトを担当するコンポーネント
const FormField = ({ label, required, children }: { label: string, required?: boolean, children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 items-start py-4 border-b border-gray-200">
    {/* 左側: ラベルと必須バッジ */}
    <div className="md:col-span-1">
      <label className="font-bold text-gray-700 flex items-center">
        <span>{label}</span>
        {required ? (
          <span className="ml-2 text-xs font-semibold bg-red-500 text-white px-2 py-0.5 rounded-full">必須</span>
        ) : (
          <span className="ml-2 text-xs font-semibold bg-gray-400 text-white px-2 py-0.5 rounded-full">任意</span>
        )}
      </label>
    </div>
    {/* 右側: 入力フィールド */}
    <div className="md:col-span-3">
      {children}
    </div>
  </div>
);

// 共通の入力フィールドスタイル
const inputStyle = "w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition";

const ContactSection = () => {
  return (
    <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        無料カウンセリング・体験予約
      </h2>
      <form className="space-y-2">
        <FormField label="お名前" required>
          <input 
            type="text" 
            placeholder="例：山田 太郎"
            className={inputStyle} 
          />
        </FormField>

        <FormField label="メールアドレス" required>
          <input 
            type="email" 
            placeholder="例：example@mail.com"
            className={inputStyle} 
          />
        </FormField>

        <FormField label="電話番号" required>
          <input 
            type="tel" 
            placeholder="例：090-1234-5678"
            className={inputStyle} 
          />
        </FormField>

        <FormField label="第1希望日程" required>
          <input 
            type="date"
            className={inputStyle} 
          />
        </FormField>

        <FormField label="第1希望時間" required>
          <select className={inputStyle}>
            <option>ご希望の時間を選択してください</option>
            <option>10:00</option>
            <option>11:00</option>
            <option>13:00</option>
            <option>14:00</option>
            <option>15:00</option>
            <option>16:00</option>
            <option>17:00</option>
            <option>18:00</option>
            <option>19:00</option>
          </select>
        </FormField>

        <FormField label="第2希望日程">
          <input 
            type="date"
            className={inputStyle} 
          />
        </FormField>

        <FormField label="第2希望時間">
           <select className={inputStyle}>
            <option>ご希望の時間を選択してください</option>
            <option>10:00</option>
            <option>11:00</option>
            <option>13:00</option>
            <option>14:00</option>
            <option>15:00</option>
            <option>16:00</option>
            <option>17:00</option>
            <option>18:00</option>
            <option>19:00</option>
          </select>
        </FormField>

        <FormField label="お悩みやご質問">
          <textarea 
            rows={5}
            placeholder="身体の具体的なお悩みや、ご質問などがあればご記入ください。"
            className={inputStyle}
          ></textarea>
        </FormField>
        
        <div className="pt-8 text-center">
            {/* 画像の緑ボタンのようなLINE予約ボタンを配置 */}
            {/* <button type="button" className="w-full max-w-sm mb-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                簡単LINE予約
            </button> */}
             {/* メインの送信ボタン */}
            <button type="submit" className="w-full max-w-sm bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                この内容で送信する
            </button>
        </div>
      </form>
    </div>
  );
};

export default ContactSection;