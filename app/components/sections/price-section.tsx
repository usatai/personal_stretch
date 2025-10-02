const PriceSection = () => {
    return (
        <section aria-labelledby="pricing-title" className="w-full py-5">
            <div className="mx-auto max-w-5xl px-6">
				{/* 初回半額の強調バナー */}
				<div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-800">
					<p className="text-center text-sm md:text-base"><span className="font-bold">初回ご来店は全コース<span className="text-blue-600">50%OFF</span></span> — 当日その場で割引が適用されます。</p>
				</div>

                <div className="grid gap-6 md:grid-cols-3">
                    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-800">40分コース</h3>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">6,000</span>
                            <span className="text-gray-600">円（税込）</span>
                        </div>
						<div className="mt-2 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1">
							<span className="text-xs font-semibold text-orange-700">初回限定 50%OFF</span>
							<span className="text-sm font-bold text-gray-900">→ 3,000円</span>
						</div>
                        <ul className="mt-4 space-y-2 text-sm text-gray-700">
                            <li>短時間でスッキリしたい方向け</li>
                            <li>気になる部位を集中ケア</li>
                        </ul>
                    </article>

                    <article className="relative rounded-xl border-2 border-gray-200 bg-white p-6 shadow-lg transition hover:shadow-xl">
                        {/* <div className="absolute -top-3 right-4 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">おすすめ</div> */}
                        <h3 className="text-lg font-semibold text-gray-800">60分コース</h3>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">9,000</span>
                            <span className="text-gray-600">円（税込）</span>
                        </div>
						<div className="mt-2 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1">
							<span className="text-xs font-semibold text-orange-700">初回限定 50%OFF</span>
							<span className="text-sm font-bold text-gray-900">→ 4,500円</span>
						</div>
                        <ul className="mt-4 space-y-2 text-sm text-gray-700">
                            <li>全身をしっかりメンテナンス</li>
                            <li>バランス良くケアしたい方向け</li>
                        </ul>
                    </article>

                    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-800">80分コース</h3>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">12,000</span>
                            <span className="text-gray-600">円（税込）</span>
                        </div>
						<div className="mt-2 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1">
							<span className="text-xs font-semibold text-orange-700">初回限定 50%OFF</span>
							<span className="text-sm font-bold text-gray-900">→ 6,000円</span>
						</div>
                        <ul className="mt-4 space-y-2 text-sm text-gray-700">
                            <li>より集中的なケア</li>
                            <li>ハイグレードな施術内容</li>
                        </ul>
                    </article>
                </div>
            </div>
        </section>
    )
}

export default PriceSection;