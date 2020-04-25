import { DomainException } from "../seedwork/exceptions/domain.exception";

export class PermissionsDeniedException extends DomainException {
  constructor() {
    super();
    this.message = "features.permissions.exception.denied";
  }
}
