import { BaseLink } from "../base-link";
import { Context } from "../context";
import { IOC } from "ioc";
import { Inject, Injectable } from "domain/seedwork/di";
import { Logger } from "domain/seedwork/use-cases";

@Injectable()
export class LoggerLink extends BaseLink {
  @Inject(IOC.LOGGER) private readonly logger!: Logger;

  async next(context: Context) {
    this.logger.group(context.useCase.constructor.name);
    this.logger.group("Parameters");
    this.logger.object(context.param ?? "-");
    this.logger.groupEnd();
    this.logger.group("Result");
    this.logger.object(context.result ?? "-");
    this.logger.groupEnd();
    this.logger.groupEnd();

    return await this.nextLink.next(context);
  }
}
