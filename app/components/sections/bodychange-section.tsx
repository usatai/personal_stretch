import Image from "next/image";

type BodyChangeCase = {
	beforeSrc: string;
	afterSrc: string;
	beforeAlt?: string;
	afterAlt?: string;
};

type BodyChangeSectionProps = {
	cases?: BodyChangeCase[];
};

const BodyChangeSection = ({
	cases = [
		
	],
}: BodyChangeSectionProps) => {
	return (
		<section aria-labelledby="bodychange-title" className="w-full py-2">
			<div className="mx-auto max-w-5xl px-6">
				<div className="mb-8">
					<h2 id="bodychange-title" className="text-2xl font-bold text-gray-500">Before / After</h2>
					<p className="mt-2 text-gray-500">写真でわかるビフォーアフター。変化を直感的にご覧ください。</p>
                    <p className="mt-2 text-gray-500">※ ストレッチ時間15分</p>
				</div>

				{cases.map((c, index) => (
					<div key={index} className="mb-8 grid gap-6 md:grid-cols-2">
						<article className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-md">
							<span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-gray-800/90 px-3 py-1 text-xs font-semibold text-white">Before</span>
							<div className="overflow-hidden rounded-lg">
								<Image
									src={c.beforeSrc}
									alt={c.beforeAlt ?? `施術前の状態（Before ${index + 1}）`}
									width={640}
									height={400}
									className="h-auto w-full object-cover"
									priority={true}
								/>
							</div>
						</article>

						<article className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-md">
							<span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">After</span>
							<div className="overflow-hidden rounded-lg">
								<Image
									src={c.afterSrc}
									alt={c.afterAlt ?? `施術後の状態（After ${index + 1}）`}
									width={640}
									height={400}
									className="h-auto w-full object-cover"
									priority={true}
								/>
							</div>
						</article>

					</div>
				))}

				<p className="mt-6 text-center text-sm text-gray-600">※ 写真はイメージです。効果には個人差があります。</p>
			</div>
		</section>
	);
}

export default BodyChangeSection;