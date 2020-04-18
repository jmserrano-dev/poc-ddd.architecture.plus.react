import { AggregateRoot, Ensure } from "../seedwork/utils";
import { Guid } from "@domain/shared";
import { DomainException } from "@domain/seedwork/exceptions";

export interface ITodoModel extends AggregateRoot {
  text: string;
  completed: boolean;
}

export class TodoModel implements ITodoModel {
  public readonly id: Guid;
  public text: string;
  public completed: boolean;

  private constructor(id: Guid, text: string, completed: boolean) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }

  public static create({ text, completed }: ITodoModel, guid?: Guid) {
    Ensure.that<DomainException>(text.isEmpty(), t.ensure.empty);

    return new TodoModel(guid || Guid.create(), text, completed);
  }

  public changeState() {
    this.completed = !this.completed;
  }

  public changeText(text: string) {
    Ensure.that<DomainException>(text.isEmpty(), t.ensure.empty);
    this.text = text;
  }
}

const t = {
  ensure: {
    empty: "El texto no puede ser vacío",
  },
};
