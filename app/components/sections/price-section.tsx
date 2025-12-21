'use client';

import { PRICING } from "@/app/lib/constants";

const pricing = [
    { duration: PRICING.trial.duration, price: PRICING.trial.price, firstprice: PRICING.trial.firstprice, comment: PRICING.trial.comment, comment2: PRICING.trial.comment2},
    { duration: PRICING.regular.duration, price: PRICING.regular.price, firstprice: PRICING.regular.firstprice, comment: PRICING.regular.comment, comment2: PRICING.regular.comment2},
    { duration: PRICING.highgrade.duration, price: PRICING.highgrade.price, firstprice: PRICING.highgrade.firstprice, comment: PRICING.highgrade.comment, comment2: PRICING.highgrade.comment2},
]

const PriceSection = () => {
    return (
        <section aria-labelledby="pricing-title" className="w-full py-2">
            <div className="mx-auto max-w-5xl px-6">
				{/* 初回半額の強調バナー */}
				<div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-800">
					<p className="text-center text-sm md:text-base"><span className="font-bold">初回ストレッチは全コース<span className="text-blue-600">50%OFF</span></span> — 当日その場で割引が適用されます。</p>
				</div>

                <div className="grid gap-6 md:grid-cols-3">
                    {pricing.map((data,index) => (
                        <article key={index} className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-800">{data.duration}</h3>
                            <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-gray-900">{data.price}</span>
                                <span className="text-gray-600">円（税込）</span>
                            </div>
                            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1">
                                <span className="text-xs font-semibold text-orange-700">初回限定 50%OFF</span>
                                <span className="text-sm font-bold text-gray-900">→ {data.firstprice}</span>
                            </div>
                            <ul className="mt-4 space-y-2 text-sm text-gray-700">
                                <li>{data.comment}</li>
                                <li>{data.comment2}</li>
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PriceSection;