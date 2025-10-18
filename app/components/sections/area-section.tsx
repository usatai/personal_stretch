import Image from "next/image";
import { MapPin, Clock, Car } from "lucide-react";
import { ServiceArea } from "@/app/lib/types";

const AreaSection = () => {
    // 大阪の主要エリアデータ
    const osakaAreas : ServiceArea[] = [
        { name: "大阪市内", districts: ["梅田", "難波", "天王寺", "本町", "新大阪"], isFree: false },
        { name: "北摂エリア", districts: ["豊中", "吹田", "茨木", "高槻", "摂津"],isFree: false },
        { name: "東大阪・八尾", districts: ["東大阪", "八尾", "柏原", "藤井寺","大東市"],isFree: true },
        { name: "堺・南大阪", districts: ["堺", "和泉", "岸和田", "泉佐野"],isFree: false }
    ];

    return (
        <div className="space-y-12">
            {/* メイン画像とキャッチコピー */}
            <div className="text-center mb-6">
                <h4 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
                    大阪全域対応
                </h4>
                <p className="text-base text-gray-600">
                    ご自宅までお伺いします
                </p>
            </div>

            <div className="flex justify-center"> 
                <Image
                    src={"/images/osaka.png"}
                    alt={"出張エリア"}
                    width={350}
                    height={180}
                    className={`object-contain h-auto mix-blend-multiply`}
                />
            </div>

            {/* エリア詳細カード */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {osakaAreas.map((area, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-5 h-5 text-blue-500" />
                            <h4 className="text-lg font-semibold text-gray-800">{area.name}</h4>
                            {area.isFree && (
                                <span className="ml-2
                                    px-2 py-[2px]
                                    text-[10px]       
                                    sm:px-2.5 sm:py-1 
                                    sm:text-xs     
                                    font-semibold
                                    text-white
                                    bg-red-500
                                    rounded-full
                                    whitespace-nowrap">
                                無料
                                </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            {area.districts.map((district, districtIndex) => (
                                <div key={districtIndex} className="text-sm text-gray-600 bg-gray-50 rounded-md px-3 py-1">
                                    {district}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* サービス詳細情報 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">出張時間</h4>
                        <p className="text-gray-600">9:00〜21:00<br />（最終受付20:00）</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Car className="w-8 h-8 text-orange-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">出張費</h4>
                        <p className="text-gray-600">大阪市内：無料<br />郊外：要相談</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">対応可能</h4>
                        <p className="text-gray-600">ご自宅・ホテル<br />オフィスなど</p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="text-center">
                <p className="text-gray-600 mb-4">
                    ご希望のエリアが含まれているかご確認ください。
                </p>
            </div>
        </div>
    );
}

export default AreaSection;