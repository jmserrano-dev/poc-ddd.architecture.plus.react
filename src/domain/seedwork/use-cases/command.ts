import { UseCase } from "./use-case";

export abstract class Command<Param = void> extends UseCase<
  Promise<void>,
  Param
> {
  readonly = false;
}
