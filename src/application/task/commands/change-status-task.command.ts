import { StateManager } from "@application/state";
import { Command } from "@domain/seedwork/use-cases";
import {
  TaskRepository,
  TaskModel,
  TaskNotFoundException,
  ITaskModel,
} from "@domain/task";
import { Injectable, Inject } from "@domain/seedwork/di";
import { Guid } from "@domain/shared";
import { IOC } from "@ioc";

@Injectable()
export class ChangeStatusTaskCommand extends Command<Guid> {
  @Inject(IOC.STATE_MANAGER)
  private stateManager!: StateManager;

  @Inject(IOC.TASK_REPOSITORY)
  private taskRepository!: TaskRepository;

  async internalExecute(id: Guid): Promise<void> {
    const { tasks } = this.stateManager.state;
    const task = tasks.find((x) => x.id === id);

    if (task === undefined) {
      throw new TaskNotFoundException();
    }

    const taskUpdated = TaskModel.create({ ...task }, task.id).changeState();

    await this.taskRepository.update(id, taskUpdated);
    this.updateState(taskUpdated, tasks);
  }

  private updateState(taskUpdated: ITaskModel, tasks: ITaskModel[]) {
    const tasksUpdated = tasks.map((task) => {
      return task.id === taskUpdated.id ? taskUpdated : task;
    });
    this.stateManager.patch({ tasks: tasksUpdated });
  }
}
