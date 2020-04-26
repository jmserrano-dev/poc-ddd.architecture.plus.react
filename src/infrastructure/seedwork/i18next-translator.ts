import { Injectable } from "domain/seedwork/di";
import { Locale, Translator } from "domain/locale";
import i18next from "i18next";

@Injectable()
export class I18nextTranslator implements Translator {
  public t(key: string): string {
    return i18next.t(key);
  }

  public async changeLanguage(language: string): Promise<string> {
    await i18next.changeLanguage(language);
    return language;
  }

  public getAvailableLanguages(): string[] {
    return Locale.ALL;
  }

  public getCurrentLanguage(): string {
    return i18next.language;
  }
}
