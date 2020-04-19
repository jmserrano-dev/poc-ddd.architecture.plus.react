import { DomainException } from "../seedwork/exceptions/domain.exception";

export class TaskNotFoundException extends DomainException {
  constructor() {
    super();
    this.message = "features.tasks.exception.not-found";
  }
}
