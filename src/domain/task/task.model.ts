import { AggregateRoot, Ensure } from "../seedwork/utils";
import { Guid } from "@domain/shared";
import { DomainException } from "@domain/seedwork/exceptions";

export interface ITaskModel extends AggregateRoot {
  text: string;
  completed: boolean;
}

export class TaskModel implements ITaskModel {
  public readonly id: Guid;
  public text: string;
  public completed: boolean;

  private constructor(id: Guid, text: string, completed: boolean) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }

  public static create({ text, completed }: ITaskModel, guid?: Guid) {
    Ensure.that<DomainException>(text.isEmpty(), t.ensure.empty);

    return new TaskModel(guid || Guid.create(), text, completed);
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
