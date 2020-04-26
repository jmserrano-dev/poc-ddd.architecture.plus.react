import { State } from "./state";
import { Subject } from "domain/seedwork/observer";

export interface StateManager extends Subject {
  state: State;
  patch(state: Partial<State>): void;
}
