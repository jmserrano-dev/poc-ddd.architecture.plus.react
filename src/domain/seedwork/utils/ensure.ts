import { DomainException } from "../exceptions";

export class Ensure {
  public static that<T extends DomainException>(
    condition: boolean,
    message?: string
  ) {
    if (condition) {
      const exception = { message } as T;
      throw exception;
    }
  }
}
