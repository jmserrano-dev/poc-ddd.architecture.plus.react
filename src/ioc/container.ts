import * as inversify from "inversify-props";
import { IOC } from "./ioc";
import { TodoRepository } from "@domain/todo";
import { Logger } from "@domain/seedwork/use-cases";
import { Runner, ExecutorLink, LoggerLink } from "@domain/seedwork/runner";
import { ConsoleLogger, ReactStateManager } from "@infrastructure/seedwork";
import { GetTodosQuery } from "@application/todo";
import { TodoInMemoryRepository } from "@infrastructure/todos";
import { StateManager } from "@application/state";

export class Container {
  private static _instance: Container | null = null;
  private readonly _container: inversify.Container;

  private constructor() {
    inversify.container
      .bind<Logger>(IOC.LOGGER)
      .to(ConsoleLogger)
      .inSingletonScope();

    inversify.container.bind<Window>(IOC.WINDOW).toConstantValue(window);

    inversify.container.bind<Runner>(IOC.RUNNER).to(Runner).inSingletonScope();

    inversify.container
      .bind<ExecutorLink>(IOC.EXECUTOR_LINK)
      .to(ExecutorLink)
      .inSingletonScope();

    inversify.container
      .bind<LoggerLink>(IOC.LOGGER_LINK)
      .to(LoggerLink)
      .inSingletonScope();

    inversify.container
      .bind<StateManager>(IOC.STATE_MANAGER)
      .to(ReactStateManager)
      .inSingletonScope();

    inversify.container
      .bind<TodoRepository>(IOC.TODO_REPOSITORY)
      .to(TodoInMemoryRepository)
      .inSingletonScope();

    inversify.container
      .bind<GetTodosQuery>(IOC.GET_TODOS_QUERY)
      .to(GetTodosQuery)
      .inSingletonScope();

    this._container = inversify.container;
  }

  static instance() {
    if (this._instance === null) {
      Container._instance = new Container();
    }

    return this._instance!._container;
  }
}
