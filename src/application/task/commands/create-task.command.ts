import { StateManager } from "application/state";
import { Command } from "domain/seedwork/use-cases";
import { TaskModel, TaskRepository } from "domain/task";
import { Injectable, Inject } from "domain/seedwork/di";
import { Guid } from "domain/shared";
import { Permissions } from "domain/permissions";
import { IOC } from "ioc";

@Injectable()
export class CreateTaskCommand extends Command<string> {
  permissions: Permissions = Permissions.create({
    action: "task",
    permission: "write",
  });

  @Inject(IOC.STATE_MANAGER)
  private stateManager!: StateManager;

  @Inject(IOC.TASK_REPOSITORY)
  private taskRepository!: TaskRepository;

  async internalExecute(text: string): Promise<void> {
    const { loading, tasks } = this.stateManager.state;

    const newTask = TaskModel.create({
      id: Guid.create(),
      text,
      completed: false,
    });

    console.log({ loading });

    await this.taskRepository.create(newTask);
    this.stateManager.patch({ tasks: [...tasks, newTask] });
  }
}
