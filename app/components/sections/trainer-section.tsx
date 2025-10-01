import Image from 'next/image';

const TrainerSection = () => {
    return (
        <div className={`flex flex-col md:flex-row items-center gap-10 md:gap-16`}>
          {/* 画像エリア */}
          <div className="md:w-1/2 w-full">
            <Image
              src={"/images/trainer.jpeg"}
              alt={"トレーナー"}
              width={350}
              height={180}
              className={`object-contain h-auto rounded-2xl ml-5`}
            />
          </div>
    
          {/* テキストエリア */}
          <div className="md:w-1/2 w-full text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{"トレーナーについて"}</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {"大手ストレッチ専門店に何百人のお客様を担当"} <br />
              {"技術を身につけ、今もトレーニングを続けています。"}
            </p>
          </div>
        </div>
    )
}

export default TrainerSection;