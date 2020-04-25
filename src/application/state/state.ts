import { ITaskModel } from "@domain/task";
import { Locale } from "@domain/locale";

export class State {
  loading: boolean = false;
  locale: string = Locale.DEFAULT;
  tasks: ITaskModel[] = [];
  [key: string]: any;
}
