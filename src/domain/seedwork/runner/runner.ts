import { Inject, Injectable } from "../di";
import { LoggerLink, ExecutorLink, PermissionsLink } from "./links";
import { UseCase } from "../use-cases/use-case";
import { IOC } from "ioc";
import { inject } from "inversify-props";
import { StateManager } from "application/state";

@Injectable()
export class Runner {
  @inject(IOC.PERMISIONS_LINK)
  private readonly permissionsLink!: PermissionsLink;
  @Inject(IOC.EXECUTOR_LINK)
  private readonly executorLink!: ExecutorLink;
  @Inject(IOC.LOGGER_LINK)
  private readonly loggerLink!: LoggerLink;

  @Inject(IOC.STATE_MANAGER)
  private stateManager!: StateManager;

  async run(
    useCase: UseCase<unknown, unknown>,
    param: unknown
  ): Promise<unknown> {
    const context = { useCase, result: undefined, param, exception: null };

    this.stateManager.patch({ loading: true });

    await this.permissionsLink
      .setNext(this.executorLink.setNext(this.loggerLink))
      .next(context)
      .finally(() => this.stateManager.patch({ loading: false }));

    return context.result;
  }
}
