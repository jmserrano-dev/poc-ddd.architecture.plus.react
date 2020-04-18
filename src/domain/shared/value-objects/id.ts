import { ValueObject } from "../../seedwork/utils/";

interface IdValueObject {
  value: string;
}

export class Id extends ValueObject<IdValueObject> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: IdValueObject) {
    super(props);
  }

  public static create(id: string): Id {
    if (id === undefined || id === null || id.length <= 2 || id.length > 100) {
      throw new Error("User must be greater than 2 chars and less than 100.");
    } else {
      return new Id({ value: id });
    }
  }
}
