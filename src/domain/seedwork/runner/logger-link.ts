import { BaseLink } from "./base-link";
import { Context } from "./context";
import { IOC } from "@ioc";
import { Injectable } from "../di/injectable";
import { Inject } from "../di/inject";
import { Logger } from "../use-cases/logger";

@Injectable()
export class LoggerLink extends BaseLink {
  @Inject(IOC.LOGGER) private readonly logger!: Logger;

  next(context: Context): void {
    this.logger.group(context.useCase.constructor.name);
    this.logger.group("Parameters");
    this.logger.log(`${context.param ?? "-"}`);
    this.logger.groupEnd();
    this.logger.group("Result");
    this.logger.object(context.result ?? "-");
    this.logger.groupEnd();
    this.logger.groupEnd();
    this.nextLink.next(context);
  }
}
