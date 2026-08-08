'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { Languages, Check } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import {
  usePathname,
  useRouter,
} from '@/i18n/navigation';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const handleSelect = (code: string) => {
    // Don't do anything if the selected language
    // is already active.
    if (code === locale) {
      return;
    }

    // Change the locale in the URL.
    //
    // Examples:
    // /        -> /hi
    // /hi      -> /ta
    // /ta/home -> /fr/home
    startTransition(() => {
      router.replace(pathname, {
        locale: code,
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Change language"
          disabled={isPending}
        >
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48"
      >
        <DropdownMenuLabel>
          Select language
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onSelect={() => handleSelect(lang.code)}
            disabled={isPending}
            className={
              locale === lang.code
                ? 'bg-muted font-medium'
                : ''
            }
          >
            <span className="flex-1">
              {lang.name}
            </span>

            {locale === lang.code && (
              <Check className="ml-2 h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}