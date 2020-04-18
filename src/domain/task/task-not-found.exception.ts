import { DomainException } from "../seedwork/exceptions/domain.exception";

export class TaskNotFoundException extends DomainException {
  constructor() {
    super("Task not found");
  }
}
