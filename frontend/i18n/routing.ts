import { defineRouting } from 'next-intl/routing';

export const SUPPORTED_LOCALES = [
  'en',
  'hi',
  'ta',
  'te',
  'es',
  'fr',
  'ar',
  'zh',
  'ja',
  'de',
  'it',
  'pt',
  'ru',
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});