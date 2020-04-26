import { Injectable } from "domain/seedwork/di";
import { TaskRepository, TaskNotFoundException, ITaskModel } from "domain/task";
import { Guid } from "domain/shared";
import { sleep } from "infrastructure/seedwork";

const REQUEST_TIME_IN_MILLISECONDS = 2000;

@Injectable()
export class TaskInMemoryRepository implements TaskRepository {
  private readonly tasks = new Map<Guid, ITaskModel>();

  public async all(): Promise<ITaskModel[]> {
    await sleep(REQUEST_TIME_IN_MILLISECONDS);
    return Array.from(this.tasks.values());
  }

  public async update(id: Guid, task: Partial<ITaskModel>): Promise<void> {
    await sleep(REQUEST_TIME_IN_MILLISECONDS);

    const oldTask = this.tasks.get(id);
    if (oldTask === undefined) {
      throw new TaskNotFoundException();
    }
    const updatedTask: ITaskModel = {
      ...oldTask,
      ...task,
    };
    this.tasks.set(id, updatedTask);
  }

  public async create(task: ITaskModel): Promise<void> {
    await sleep(REQUEST_TIME_IN_MILLISECONDS);

    this.tasks.set(task.id, task);
  }

  public async remove(id: Guid): Promise<void> {
    await sleep(REQUEST_TIME_IN_MILLISECONDS);

    this.tasks.delete(id);
  }
}
