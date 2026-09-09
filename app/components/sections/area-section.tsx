import Image from "next/image";
import { MapPin, Clock, Car, Home } from "lucide-react";
import { CONTACT_INFO, FREE_AREA_LABEL, SERVICE_AREAS } from "@/app/lib/constants";

/**
 * 出張エリア。
 * ★エリア・出張費無料の対象は app/lib/constants.ts の SERVICE_AREAS が唯一の情報源。
 *   このファイルにエリア名や無料条件を書かないこと（FAQ・料金注記との食い違いを防ぐため）。
 */
const AreaSection = () => {
  const serviceInfo = [
    { icon: Clock, label: "出張時間",  body: CONTACT_INFO.businessHours,                  color: "bg-cyan-100 text-cyan-700" },
    { icon: Car,   label: "出張費",    body: `${FREE_AREA_LABEL}：無料\nその他：要相談`,   color: "bg-sky-100 text-sky-700"  },
    { icon: Home,  label: "対応場所",  body: "ご自宅・ホテル\nオフィスなど",               color: "bg-teal-100 text-teal-700" },
  ];

  return (
    <div className="space-y-14">
      {/* エリアイメージ */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="shrink-0">
          <Image
            src="/images/osaka.webp"
            alt="出張エリア"
            width={320}
            height={240}
            className="object-contain h-auto mix-blend-multiply"
          />
        </div>
        <div>
          <p className="text-xs font-bold text-cyan-700 tracking-[0.18em] uppercase mb-2">Service Area</p>
          <h2 className="heading-jp text-2xl md:text-3xl font-black text-slate-800 mb-3">大阪全域 対応</h2>
          <div className="w-10 h-0.5 rounded-full bg-linear-to-r from-cyan-400 to-cyan-600 mb-4" />
          <p className="text-slate-600 text-base leading-relaxed">
            {FREE_AREA_LABEL}エリアは<span className="text-cyan-700 font-semibold">出張費無料</span>。<br />
            その他のエリアの出張費はお問い合わせください。
          </p>
        </div>
      </div>

      {/* エリアカード */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SERVICE_AREAS.map((area) => (
          <div key={area.name} className="card-premium rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-cyan-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">{area.name}</h3>
              {area.isFree && (
                <span className="ml-auto text-xs font-bold text-white bg-linear-to-r from-red-600 to-orange-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                  無料
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {area.districts.map((d) => (
                <span key={d} className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-md px-2 py-0.5">
                  {d}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* サービス情報 */}
      <div className="rounded-2xl overflow-hidden shadow-cyan border border-cyan-100/60">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-cyan-100/60">
          {serviceInfo.map(({ icon: Icon, label, body, color }) => (
            <div key={label} className="bg-white/90 px-6 py-7 flex flex-col items-center text-center gap-3">
              <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center`}>
                <Icon className="w-7 h-7" />
              </div>
              <p className="text-base font-bold text-slate-700">{label}</p>
              <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AreaSection;
