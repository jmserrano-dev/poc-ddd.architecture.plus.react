import { StateManager, State } from "@application/state";
import { Injectable } from "@domain/seedwork/di";
import { Observer } from "@domain/seedwork/observer";

@Injectable()
export class ReactStateManager implements StateManager {
  private _state: State = new State();
  private readonly observers: Observer[] = [];

  get state(): State {
    return this._state;
  }

  set state(value: State) {
    this._state = value;
    this.notifyAll();
  }

  patch(state: Partial<State>): void {
    type Keys = keyof State;
    Object.entries(state).forEach(([key, value]) => {
      const accessor = key as Keys;
      if (value !== undefined) {
        this.state[accessor] = value;
      }
    });
    this.notifyAll();
  }

  notifyAll() {
    this.observers.forEach((observer) => observer.notify());
  }

  register(observer: Observer) {
    this.observers.push(observer);
  }

  unregister(observer: Observer) {
    const observerIndex = this.observers.findIndex((x) => x === observer);
    this.observers.splice(observerIndex, 1);
  }
}
