/**
 * Repo: https://github.com/Steve-Fenton/TypeScriptUtilities
 */

import { ValueObject } from "../../seedwork/utils";

interface GuidValueObject {
  value: string;
}

export class Guid extends ValueObject<GuidValueObject> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: GuidValueObject) {
    super(props);
  }

  private static generate() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  public static create(): Guid {
    return new Guid({ value: this.generate() });
  }
}
