import { StateManager } from "@application/state";
import { Command } from "@domain/seedwork/use-cases";
import { TaskModel, TaskRepository } from "@domain/task";
import { Injectable, Inject } from "@domain/seedwork/di";
import { Guid } from "@domain/shared";
import { IOC } from "@ioc";

@Injectable()
export class CreateTaskCommand extends Command<string> {
  @Inject(IOC.STATE_MANAGER)
  private stateManager!: StateManager;

  @Inject(IOC.TASK_REPOSITORY)
  private taskRepository!: TaskRepository;

  async internalExecute(text: string): Promise<void> {
    const { tasks } = this.stateManager.state;

    const newTask = TaskModel.create({
      id: Guid.create(),
      text,
      completed: false,
    });

    await this.taskRepository.create(newTask);
    this.stateManager.patch({ tasks: [...tasks, newTask] });
  }
}
