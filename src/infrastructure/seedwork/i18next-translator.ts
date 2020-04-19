import { Injectable } from "@domain/seedwork/di";
import { Translator } from "@domain/seedwork/translator";
import i18next from "i18next";

@Injectable()
export class I18nextTranslator implements Translator {
  public t(key: string): string {
    return i18next.t(key);
  }
}
