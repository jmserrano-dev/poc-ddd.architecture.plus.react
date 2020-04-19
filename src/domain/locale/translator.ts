export interface Translator {
  t(key: string): string;
  changeLanguage: (locale: string) => Promise<string>;
  getCurrentLanguage: () => string;
  getAvailableLanguages: () => string[];
}
