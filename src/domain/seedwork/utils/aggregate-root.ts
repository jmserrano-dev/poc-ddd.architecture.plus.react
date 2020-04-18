import { Guid } from "../../shared";

export abstract class AggregateRoot {
  protected constructor(protected id: Guid) {}
}
