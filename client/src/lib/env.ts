import { z } from 'zod';

// Environment variables validation schema
const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Server configuration
  PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)).default('5000'),
  HOST: z.string().default('127.0.0.1'),
  
  // Database configuration
  DATABASE_URL: z.string().url('Invalid database URL'),
  
  // Email configuration
  GMAIL_USER: z.string().email('Invalid Gmail user email').optional(),
  GMAIL_PASS: z.string().min(1, 'Gmail password is required').optional(),
  SALON_EMAIL: z.string().email('Invalid salon email').default('celucylar@gmail.com'),
  
  // External APIs
  OPENAI_API_KEY: z.string().optional(),
  
  // Security
  SESSION_SECRET: z.string().min(32, 'Session secret must be at least 32 characters').optional(),
  
  // CORS
  ALLOWED_ORIGINS: z.string().transform((str) => str.split(',')).optional(),
  
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).pipe(z.number().positive()).default('900000'), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).pipe(z.number().positive()).default('1000'),
  RATE_LIMIT_FORM_MAX: z.string().transform(Number).pipe(z.number().positive()).default('50'),
  RATE_LIMIT_CHAT_MAX: z.string().transform(Number).pipe(z.number().positive()).default('100'),
});

// Environment validation function
export function validateEnv(): z.infer<typeof envSchema> {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`Environment validation failed:\n${missingVars.join('\n')}`);
    }
    throw error;
  }
}

// Get validated environment configuration
export const env = validateEnv();

// Type-safe environment access
export type Environment = z.infer<typeof envSchema>;

// Development helpers
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

// Database configuration
export const dbConfig = {
  url: env.DATABASE_URL,
  ssl: isProduction,
  maxConnections: 10,
  connectionTimeout: 30000,
};

// Email configuration
export const emailConfig = {
  service: 'gmail' as const,
  user: env.GMAIL_USER,
  password: env.GMAIL_PASS,
  salonEmail: env.SALON_EMAIL,
  enabled: !!(env.GMAIL_USER && env.GMAIL_PASS),
};

// CORS configuration
export const corsConfig = {
  origins: env.ALLOWED_ORIGINS || (isProduction 
    ? [
        'https://centroesteticalucylara.com',
        'https://www.centroesteticalucylara.com',
        'https://centroesteticalucylara.es',
        'https://www.centroesteticalucylara.es'
      ]
    : ['http://localhost:5000', 'http://localhost:5173', 'http://127.0.0.1:5000']
  ),
  credentials: true,
};

// Rate limiting configuration
export const rateLimitConfig = {
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  formMax: env.RATE_LIMIT_FORM_MAX,
  chatMax: env.RATE_LIMIT_CHAT_MAX,
};

// Security configuration
export const securityConfig = {
  sessionSecret: env.SESSION_SECRET || (isDevelopment ? 'dev-secret-key-not-for-production' : undefined),
  hsts: isProduction,
  cspEnabled: true,
};

// Validation helpers
export function requireEnvVar(key: keyof Environment): string {
  const value = env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return String(value);
}

export function getEnvVar(key: keyof Environment, defaultValue?: string): string | undefined {
  return String(env[key]) || defaultValue;
}

// Environment status check
export function getEnvironmentStatus() {
  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    databaseConnected: !!env.DATABASE_URL,
    emailConfigured: emailConfig.enabled,
    openaiAvailable: !!env.OPENAI_API_KEY,
    securityEnabled: isProduction,
    timestamp: new Date().toISOString(),
  };
}

export default env;