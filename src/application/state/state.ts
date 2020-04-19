import { ITaskModel } from "@domain/task";
import { Locale } from "@domain/locale";

export class State {
  locale: string = Locale.DEFAULT;
  tasks: ITaskModel[] = [];
  [key: string]: any;
}
