import Image from 'next/image';

const trainerData = [{
    "所有資格" : "JSA-CSTP (日本ストレッチ協会ストレッチングトレーナーパートナー)",
    "経歴" : "大阪リゾート&スポーツ専門学校",
    "趣味" : "サウナ、露天風呂、フットサル",
    "お客様に一言" : "ストレッチが生活習慣に取り入れられるようストレッチの楽しいさや良さをお伝え出来ればと思います！いつまで若い身体でいられるように全力でサポートさせていただきます！よろしくお願いいたします🙇" 
}]

const TrainerSection = () => {
    return (
        <div className={`flex flex-col md:flex-row items-center gap-10 md:gap-16`}>
          {/* 画像エリア */}
          <div className="md:w-1/2 w-full flex justify-center md:justify-start">
            <Image
              src={"/images/trainer.jpg"}
              alt={"トレーナー"}
              width={350}
              height={180}
              className={`object-contain h-auto rounded-2xl md:ml-5`}
              priority={true}
            />
          </div>
    
          {/* テキストエリア */}
          <div className="md:w-1/2 w-full text-left">
            <p className='font-bold text-gray-500'>名前</p>
            <h3 className="text-2xl font-bold text-gray-500 mb-4 pt-5">
                <ruby>
                    田島<rt>たしま</rt>
                    樹騎邪<rt>じゅきや</rt>
                </ruby>
            </h3>
            <div className="text-gray-500 leading-relaxed whitespace-pre-line pt-5">
              {trainerData.map((data,index) => (
                <div key={index}>
                    {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="mb-4"> {/* 各項目ごとにもスペースを */}
                      <p className="font-bold text-gray-500">{key}</p>
                      <p className="mt-1 whitespace-pre-line">{value}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
    )
}

export default TrainerSection;