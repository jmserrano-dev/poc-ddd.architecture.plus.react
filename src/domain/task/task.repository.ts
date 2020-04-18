import { ITaskModel } from "./task.model";
import { Guid } from "@domain/shared";

export interface TaskRepository {
  all: () => Promise<ITaskModel[]>;
  create: (task: ITaskModel) => Promise<void>;
  update: (id: Guid, task: Partial<ITaskModel>) => Promise<void>;
}
