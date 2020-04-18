import { Inject, Injectable } from "../di";
import { LoggerLink } from "./logger-link";
import { ExecutorLink } from "./executor-link";
import { UseCase } from "../use-cases/use-case";
import { IOC } from "@ioc";

@Injectable()
export class Runner {
  @Inject(IOC.EXECUTOR_LINK)
  private readonly executorLink!: ExecutorLink;
  @Inject(IOC.LOGGER_LINK)
  private readonly loggerLink!: LoggerLink;

  run(useCase: UseCase<unknown, unknown>, param: unknown): unknown {
    const context = { useCase, result: undefined, param };
    this.executorLink.setNext(this.loggerLink).next(context);
    return context.result;
  }
}
