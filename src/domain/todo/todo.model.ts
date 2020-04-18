import { AggregateRoot } from "../seedwork/utils";
import { Guid } from "@domain/shared";

export interface TodoModel {
  id: number;
  text: string;
  completed: boolean;
}

// interface ITodoModel {
//   text: string;
//   completed: boolean;
// }

// export class TodoModel extends AggregateRoot implements ITodoModel {
//   public text: string;
//   public completed: boolean;

//   private constructor(id: Guid, text: string, completed: boolean) {
//     super(id);
//     this.text = text;
//     this.completed = completed;
//   }

//   public static create({ text, completed }: ITodoModel, guid?: Guid) {
//     return new TodoModel(guid || Guid.create(), text, completed);
//   }
// }
