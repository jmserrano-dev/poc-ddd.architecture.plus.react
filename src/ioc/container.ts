import * as inversify from "inversify-props";
import { IOC } from "./ioc";
import { TaskRepository } from "@domain/task";
import { Logger } from "@domain/seedwork/use-cases";
import { Runner, ExecutorLink, LoggerLink } from "@domain/seedwork/runner";
import { Translator } from "@domain/locale";
import {
  ConsoleLogger,
  ReactStateManager,
  I18nextTranslator,
} from "@infrastructure/seedwork";
import {
  GetTasksQuery,
  CreateTaskCommand,
  RemoveTaskCommand,
  ChangeStatusTaskCommand,
} from "@application/task";
import { TaskInMemoryRepository } from "@infrastructure/tasks";
import { StateManager } from "@application/state";

export class Container {
  private static _instance: Container | null = null;
  private readonly _container: inversify.Container;

  private constructor() {
    inversify.container
      .bind<Logger>(IOC.LOGGER)
      .to(ConsoleLogger)
      .inSingletonScope();

    inversify.container
      .bind<Translator>(IOC.TRANSLATOR)
      .to(I18nextTranslator)
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
      .bind<TaskRepository>(IOC.TASK_REPOSITORY)
      .to(TaskInMemoryRepository)
      .inSingletonScope();

    inversify.container
      .bind<GetTasksQuery>(IOC.GET_TASKS_QUERY)
      .to(GetTasksQuery)
      .inSingletonScope();

    inversify.container
      .bind<CreateTaskCommand>(IOC.CREATE_TASK_COMMAND)
      .to(CreateTaskCommand)
      .inSingletonScope();

    inversify.container
      .bind<ChangeStatusTaskCommand>(IOC.CHANGE_STATUS_TASK_COMMAND)
      .to(ChangeStatusTaskCommand)
      .inSingletonScope();

    inversify.container
      .bind<RemoveTaskCommand>(IOC.REMOVE_TASK_COMMAND)
      .to(RemoveTaskCommand)
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
