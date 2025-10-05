import Image from 'next/image';
import { TrainerInfo } from '@/app/lib/types';

const trainerInfo = {

}

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
            />
          </div>
    
          {/* テキストエリア */}
          <div className="md:w-1/2 w-full text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{"田島樹騎邪"}</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {"テストテストテストテストテストテストテストテストテスト"} <br />
              {"テストテストテストテストテストテストテストテストテスト"} <br />
              {"テストテストテストテストテストテストテストテストテスト"} <br />
              {"テストテストテストテストテストテストテストテストテスト"} <br />
              {"テストテストテストテストテストテストテストテストテスト"} <br />
              {"テストテストテストテストテストテストテストテストテスト"} <br />
              {"テストテストテストテストテストテストテストテストテスト"} <br />
            </p>
          </div>
        </div>
    )
}

export default TrainerSection;