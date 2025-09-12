// Service types with proper enums
export enum ServiceType {
  HIGIENE_FACIAL_SUPREMA = 'higiene-facial-suprema',
  ICE_SKIN_CRIOTERAPIA = 'ice-skin-crioterapia',
  MICROPIGMENTACION_CEJAS = 'micropigmentacion-cejas',
  MICROPIGMENTACION_LABIOS = 'micropigmentacion-labios',
  TRATAMIENTO_CORPORAL = 'tratamiento-corporal',
}

export enum TimeSlot {
  SLOT_10_00 = '10:00',
  SLOT_10_30 = '10:30',
  SLOT_11_00 = '11:00',
  SLOT_11_30 = '11:30',
  SLOT_12_00 = '12:00',
  SLOT_12_30 = '12:30',
  SLOT_16_00 = '16:00',
  SLOT_16_30 = '16:30',
  SLOT_17_00 = '17:00',
  SLOT_17_30 = '17:30',
  SLOT_18_00 = '18:00',
  SLOT_18_30 = '18:30',
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

// Enhanced booking interfaces
export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: ServiceType;
  date: Date;
  time: TimeSlot;
  message?: string;
}

export interface BookingRecord extends BookingFormData {
  id: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface BookingResponse extends ApiResponse {
  data?: {
    bookingId: string;
    confirmationCode?: string;
  };
}

// Error types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: ValidationError[];
}

// Environment configuration types
export interface DatabaseConfig {
  url: string;
  maxConnections?: number;
  connectionTimeout?: number;
}

export interface EmailConfig {
  service: 'gmail' | 'sendgrid' | 'custom';
  user: string;
  password?: string;
  apiKey?: string;
  from: string;
  templates: {
    booking: string;
    confirmation: string;
  };
}

export interface AppConfig {
  nodeEnv: 'development' | 'production' | 'test';
  port: number;
  database: DatabaseConfig;
  email: EmailConfig;
  cors: {
    origins: string[];
    credentials: boolean;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
}

// Service catalog types
export interface ServiceDetails {
  id: ServiceType;
  name: string;
  description: string;
  duration: number; // in minutes
  price?: number;
  category: 'facial' | 'micropigmentation' | 'body';
  features: string[];
  isActive: boolean;
}

export interface ServiceCatalog {
  services: ServiceDetails[];
  categories: {
    id: string;
    name: string;
    description: string;
  }[];
}

// User interface types
export interface ContactInfo {
  phone: string[];
  email: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    website?: string;
  };
}

export interface BusinessHours {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  openTime: string; // HH:MM format
  closeTime: string; // HH:MM format
  isOpen: boolean;
}

export interface BusinessInfo extends ContactInfo {
  name: string;
  description: string;
  hours: BusinessHours[];
  services: ServiceType[];
}

// Component prop types
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

// Utility types
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Form validation types
export type FormFieldError = {
  type: string;
  message: string;
};

export type FormErrors<T> = {
  [K in keyof T]?: FormFieldError;
};

// Analytics types
export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

// SEO types
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
}

export default {
  ServiceType,
  TimeSlot,
  BookingStatus,
};