import { StateManager } from "@application/state";
import { Query } from "@domain/seedwork/use-cases";
import { TodoRepository, ITodoModel } from "@domain/todo";
import { Injectable, Inject } from "@domain/seedwork/di";
import { IOC } from "@ioc";

@Injectable()
export class GetTodosQuery extends Query<Promise<ITodoModel[]>> {
  @Inject(IOC.STATE_MANAGER)
  private stateManager!: StateManager;

  @Inject(IOC.TODO_REPOSITORY)
  private todoRepository!: TodoRepository;

  async internalExecute(): Promise<ITodoModel[]> {
    if (this.stateManager.state.todos.length === 0) {
      const todos = await this.todoRepository.all();
      this.stateManager.patch({ todos });
    }

    return this.stateManager.state.todos;
  }
}
