export function envRequired(name: string, fallbackValue?: string): string {
  const value = process.env[name];

  if (value) return value;

  if (fallbackValue) return fallbackValue;

  throw new Error(`❌ Missing required environment variable: ${name}`);
}
