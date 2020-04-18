import { DomainException } from "../seedwork/exceptions/domain.exception";

export class TodoNotFoundException extends DomainException {
  constructor() {
    super("The todo with the given Id was not found");
  }
}
