import { Injectable } from "@domain/seedwork/di";
import {
  TaskRepository,
  TaskNotFoundException,
  ITaskModel,
} from "@domain/task";
import { Guid } from "@domain/shared";

@Injectable()
export class TaskInMemoryRepository implements TaskRepository {
  private readonly tasks = new Map<Guid, ITaskModel>();

  public all(): Promise<ITaskModel[]> {
    return Promise.resolve(Array.from(this.tasks.values()));
  }

  public update(id: Guid, task: Partial<ITaskModel>): Promise<void> {
    return new Promise((resolve) => {
      const oldTask = this.tasks.get(id);

      if (oldTask === undefined) {
        throw new TaskNotFoundException();
      }

      const updatedTask: ITaskModel = {
        ...oldTask,
        ...task,
      };

      this.tasks.set(id, updatedTask);

      resolve();
    });
  }

  public create(task: ITaskModel): Promise<void> {
    return new Promise((resolve) => {
      this.tasks.set(task.id, task);
      resolve();
    });
  }
}
