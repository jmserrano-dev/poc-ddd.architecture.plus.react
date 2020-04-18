import { Injectable } from "@domain/seedwork/di";
import { TodoRepository, TodoModel, TodoNotFoundException } from "@domain/todo";

@Injectable()
export class TodoInMemoryRepository implements TodoRepository {
  private readonly todos = new Map<number, TodoModel>();

  public all(): Promise<TodoModel[]> {
    const todos: TodoModel[] = [
      { id: 1, text: "Do homeworks", completed: true },
      { id: 2, text: "Go to market", completed: false },
      { id: 3, text: "ReactJS course", completed: false },
    ];
    return Promise.resolve(todos);

    return Promise.resolve(Array.from(this.todos.values()));
  }

  public update(id: number, todo: Partial<TodoModel>): Promise<void> {
    return new Promise((resolve) => {
      const oldTodo = this.todos.get(id);

      if (oldTodo === undefined) {
        throw new TodoNotFoundException();
      }

      const updatedTodo: TodoModel = {
        ...oldTodo,
        ...todo,
      };

      this.todos.set(id, updatedTodo);

      resolve();
    });
  }

  public create(todo: TodoModel): Promise<void> {
    return new Promise((resolve) => {
      this.todos.set(todo.id, todo);
      resolve();
    });
  }
}
