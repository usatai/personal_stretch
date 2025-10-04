// サイト全体で使用する定数

export const SITE_CONFIG = {
  name: "田島ストレッチ",
  description: "プロのトレーナーによる完全マンツーマンストレッチ指導",
  url: "https://tajima-stretch.com",
  ogImage: "/images/og-image.jpg",
} as const;

export const CONTACT_INFO = {
  phone: "090-1234-5678",
  email: "info@tajima-stretch.com",
  businessHours: "9:00〜21:00（最終受付20:00）",
} as const;

export const SERVICE_AREAS = [
  "大阪市内",
  "北摂エリア", 
  "東大阪・八尾",
  "堺・南大阪"
] as const;

export const PRICING = {
  trial: {
    duration: "40分コース",
    price: "6,000",
    firstprice: "3,000",
    comment: "短時間でスッキリしたい方向け",
    comment2: "気になる部位を集中ケア"
  },
  regular: {
    duration: "60分コース", 
    price: "9,000",
    firstprice: "4,500",
    comment: "全身をしっかりメンテナンス",
    comment2: "バランス良くケアしたい方向け"
  },
  highgrade: {
    duration: "80分コース",
    price: "12,000",
    firstprice: "6,000",
    comment: "より集中的なケア",
    comment2: "ハイグレードな施術内容"
  }
} as const;
