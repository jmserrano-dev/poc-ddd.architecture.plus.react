import { ITodoModel } from "./todo.model";
import { Guid } from "@domain/shared";

export interface TodoRepository {
  all: () => Promise<ITodoModel[]>;
  create: (todo: ITodoModel) => Promise<void>;
  update: (id: Guid, todo: Partial<ITodoModel>) => Promise<void>;
}
