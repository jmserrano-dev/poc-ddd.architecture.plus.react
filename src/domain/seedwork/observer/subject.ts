import { Observer } from "./observer";

export interface Subject {
  notifyAll: () => void;
  register: (observer: Observer) => void;
  unregister: (observer: Observer) => void;
}
