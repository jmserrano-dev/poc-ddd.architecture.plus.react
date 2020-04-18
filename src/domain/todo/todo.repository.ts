import { TodoModel } from "./todo.model";

export interface TodoRepository {
  all: () => Promise<TodoModel[]>;
  create: (todo: TodoModel) => Promise<void>;
  update: (id: number, todo: Partial<TodoModel>) => Promise<void>;
}
