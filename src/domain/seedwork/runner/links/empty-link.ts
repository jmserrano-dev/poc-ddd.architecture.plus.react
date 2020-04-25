import { Link } from "../link";
import { Injectable } from "../../di/injectable";

@Injectable()
export class EmptyLink implements Link {
  setNext(): Link {
    return this;
  }

  next(): Promise<void> {
    return Promise.resolve();
  }
}
