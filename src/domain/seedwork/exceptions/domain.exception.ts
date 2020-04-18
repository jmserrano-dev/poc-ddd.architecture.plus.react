export class DomainException extends Error {
  protected constructor(message?: string) {
    super(message);
  }
}
