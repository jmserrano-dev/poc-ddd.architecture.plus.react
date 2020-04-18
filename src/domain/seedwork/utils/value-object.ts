import { shallowEqual } from "shallow-equal-object";

export interface ValueObjectProps {
  [index: string]: any;
}

export class ValueObject<Props extends ValueObjectProps> {
  props: Readonly<Props>;

  public constructor(props: Props) {
    this.props = Object.freeze(props);
  }

  /**
   * Check equality by shallow equals of properties.
   * It can be override.
   */
  equals(object?: ValueObject<Props>): boolean {
    if (object === null || object === undefined) {
      return false;
    }
    if (object.props === undefined) {
      return false;
    }
    return shallowEqual(this.props, object.props);
  }
}
