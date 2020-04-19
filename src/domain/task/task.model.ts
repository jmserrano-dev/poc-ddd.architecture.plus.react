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
    Ensure.that<DomainException>(text.isEmpty(), "features.tasks.ensure.empty");

    this.id = id;
    this.text = text;
    this.completed = completed;
  }

  public static create({ text, completed }: ITaskModel, guid?: Guid) {
    return new TaskModel(guid || Guid.create(), text, completed);
  }

  public changeState() {
    this.completed = !this.completed;
    return this;
  }

  public changeText(text: string) {
    Ensure.that<DomainException>(text.isEmpty(), "features.tasks.ensure.empty");
    this.text = text;
    return this;
  }
}
