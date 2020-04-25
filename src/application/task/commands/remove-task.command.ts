import { StateManager } from "@application/state";
import { Command } from "@domain/seedwork/use-cases";
import { TaskRepository } from "@domain/task";
import { Injectable, Inject } from "@domain/seedwork/di";
import { Guid } from "@domain/shared";
import { Permissions } from "@domain/permissions";
import { IOC } from "@ioc";

@Injectable()
export class RemoveTaskCommand extends Command<Guid> {
  permissions: Permissions = Permissions.create({
    action: "task",
    permission: "write",
  });

  @Inject(IOC.STATE_MANAGER)
  private stateManager!: StateManager;

  @Inject(IOC.TASK_REPOSITORY)
  private taskRepository!: TaskRepository;

  async internalExecute(id: Guid): Promise<void> {
    const { tasks } = this.stateManager.state;

    await this.taskRepository.remove(id);
    this.stateManager.patch({ tasks: [...tasks.filter((x) => x.id !== id)] });
  }
}
