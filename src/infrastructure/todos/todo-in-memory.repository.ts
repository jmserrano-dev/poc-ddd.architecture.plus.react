import { Injectable } from "@domain/seedwork/di";
import {
  TodoRepository,
  TodoModel,
  TodoNotFoundException,
  ITodoModel,
} from "@domain/todo";
import { Guid } from "@domain/shared";

@Injectable()
export class TodoInMemoryRepository implements TodoRepository {
  private readonly todos = new Map<Guid, ITodoModel>();

  public all(): Promise<TodoModel[]> {
    const todos: TodoModel[] = [
      TodoModel.create({
        id: Guid.create(),
        text: "Do homeworks",
        completed: true,
      }),
      TodoModel.create({
        id: Guid.create(),
        text: "Go to market",
        completed: false,
      }),
      TodoModel.create({
        id: Guid.create(),
        text: "ReactJS course",
        completed: false,
      }),
    ];
    return Promise.resolve(todos);

    // return Promise.resolve(Array.from(this.todos.values()));
  }

  public update(id: Guid, todo: Partial<ITodoModel>): Promise<void> {
    return new Promise((resolve) => {
      const oldTodo = this.todos.get(id);

      if (oldTodo === undefined) {
        throw new TodoNotFoundException();
      }

      const updatedTodo: ITodoModel = {
        ...oldTodo,
        ...todo,
      };

      this.todos.set(id, updatedTodo);

      resolve();
    });
  }

  public create(todo: ITodoModel): Promise<void> {
    return new Promise((resolve) => {
      const guid = Guid.create();
      this.todos.set(guid, TodoModel.create(todo, guid));
      resolve();
    });
  }
}
