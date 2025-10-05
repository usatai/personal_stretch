// 型定義

export interface ConcernItem {
  text: string;
  imageSrc: string;
  alt: string;
}

export interface TrainerInfo {
  name: string;
  experience: string;
  specialties: string[];
  imageSrc: string;
  alt: string;
}

export interface ServiceArea {
  name: string;
  districts: string[];
}

export interface BeforeAfterCase {
  beforeSrc: string;
  afterSrc: string;
  description?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredDate?: string;
  preferredTime?: string;
}

export interface PricingPlan {
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}
