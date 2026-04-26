import Image from "next/image";
import { MapPin, Clock, Car, Home } from "lucide-react";
import { ServiceArea } from "@/app/lib/types";

const AreaSection = () => {
  const osakaAreas: ServiceArea[] = [
    { name: "大阪市内",      districts: ["梅田", "難波", "天王寺", "本町", "新大阪"],      isFree: false },
    { name: "北摂エリア",   districts: ["豊中", "吹田", "茨木", "高槻", "摂津"],           isFree: false },
    { name: "東大阪・八尾",  districts: ["東大阪", "八尾", "柏原", "藤井寺", "大東市"],    isFree: true  },
    { name: "堺・南大阪",   districts: ["堺", "和泉", "岸和田", "泉佐野"],                 isFree: false },
  ];

  const serviceInfo = [
    { icon: Clock, label: "出張時間",  body: "9:00〜21:00\n（最終受付 20:00）", color: "bg-cyan-100 text-cyan-700" },
    { icon: Car,   label: "出張費",    body: "大阪市内：無料\n郊外：要相談",     color: "bg-sky-100 text-sky-700"  },
    { icon: Home,  label: "対応場所",  body: "ご自宅・ホテル\nオフィスなど",     color: "bg-teal-100 text-teal-700" },
  ];

  return (
    <div className="space-y-14">
      {/* エリアイメージ */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="shrink-0">
          <Image
            src="/images/osaka.png"
            alt="出張エリア"
            width={320}
            height={240}
            className="object-contain h-auto mix-blend-multiply"
            priority={true}
          />
        </div>
        <div>
          <p className="text-[11px] font-bold text-cyan-600 tracking-[0.18em] uppercase mb-2">Service Area</p>
          <h4 className="heading-jp text-2xl md:text-3xl font-black text-slate-800 mb-3">大阪全域 対応</h4>
          <div className="w-10 h-0.5 rounded-full bg-linear-to-r from-cyan-400 to-cyan-600 mb-4" />
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            ご自宅・ホテル・オフィスまでお伺いします。<br />
            東大阪・八尾エリアは<span className="text-cyan-600 font-semibold">出張費無料</span>。
          </p>
        </div>
      </div>

      {/* エリアカード */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {osakaAreas.map((area, index) => (
          <div key={index} className="card-premium rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-cyan-600" />
              </div>
              <h4 className="text-base font-bold text-slate-800">{area.name}</h4>
              {area.isFree && (
                <span className="ml-auto text-[10px] font-bold text-white bg-linear-to-r from-red-500 to-orange-500 px-2 py-0.5 rounded-full whitespace-nowrap">
                  無料
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {area.districts.map((d, i) => (
                <span key={i} className="text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-100 rounded-md px-2 py-0.5">
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
              <p className="text-sm font-bold text-slate-700">{label}</p>
              <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AreaSection;
