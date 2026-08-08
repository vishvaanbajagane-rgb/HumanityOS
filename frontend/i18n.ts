import { getRequestConfig } from 'next-intl/server';
import { routing } from './i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale =
    requested &&
    routing.locales.includes(
      requested as (typeof routing.locales)[number]
    )
      ? requested
      : routing.defaultLocale;

  return {
    locale,
    messages: (
      await import(`./locales/${locale}.json`)
    ).default,
  };
});