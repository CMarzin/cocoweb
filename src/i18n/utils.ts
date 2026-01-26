import { ui, defaultLang, type Lang, type UIKey } from './ui';

export type { Lang, UIKey };

/**
 * Get the language from a URL
 * Returns 'en' if the URL starts with /en/, otherwise returns the default language
 */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) {
    return lang as Lang;
  }
  return defaultLang;
}

/**
 * Create a translation function for a given language
 */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

/**
 * Get the localized URL for a given path and language
 */
export function getLocalizedUrl(path: string, lang: Lang): string {
  // Remove leading slash for consistency
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Remove existing language prefix if present
  const pathWithoutLang = cleanPath.replace(/^(en|fr)\//, '');

  // For default language (en), don't add prefix
  if (lang === defaultLang) {
    return `/${pathWithoutLang}`;
  }

  // For other languages, add the prefix
  return `/${lang}/${pathWithoutLang}`;
}

/**
 * Get the content language prefix for a given UI language
 * Used to filter content collections by language
 */
export function getContentLangPrefix(lang: Lang): string {
  return `${lang}/`;
}

/**
 * Check if content exists for the requested language, otherwise fallback
 */
export function getContentLang(requestedLang: Lang, availableLangs: Lang[]): Lang {
  if (availableLangs.includes(requestedLang)) {
    return requestedLang;
  }
  // Fallback to French content if English not available
  return 'fr';
}

/**
 * Get the alternate language for a given language
 */
export function getAlternateLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}

/**
 * Format a date according to the locale
 */
export function formatDate(date: Date, lang: Lang): string {
  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Get the HTML lang attribute value
 */
export function getHtmlLang(lang: Lang): string {
  return lang === 'fr' ? 'fr' : 'en';
}
