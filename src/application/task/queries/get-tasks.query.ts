import { StateManager } from "application/state";
import { Query } from "domain/seedwork/use-cases";
import { TaskRepository, ITaskModel } from "domain/task";
import { Injectable, Inject } from "domain/seedwork/di";
import { IOC } from "ioc";
import { Permissions } from "domain/permissions";

@Injectable()
export class GetTasksQuery extends Query<Promise<ITaskModel[]>> {
  permissions: Permissions = Permissions.create({
    action: "task",
    permission: "read",
  });

  @Inject(IOC.STATE_MANAGER)
  private stateManager!: StateManager;

  @Inject(IOC.TASK_REPOSITORY)
  private taskRepository!: TaskRepository;

  async internalExecute(): Promise<ITaskModel[]> {
    if (this.stateManager.state.tasks.length === 0) {
      const tasks = await this.taskRepository.all();
      this.stateManager.patch({ tasks: tasks });
    }

    return this.stateManager.state.tasks;
  }
}
