import { IOC } from "@ioc";
import { Injectable, Inject } from "@domain/seedwork/di";
import { Logger } from "@domain/seedwork/use-cases";

@Injectable()
export class ConsoleLogger implements Logger {
  @Inject(IOC.WINDOW) private readonly window!: Window;

  object<T>(object: T): void {
    this.window.console.dir(object);
  }

  groupEnd(): void {
    this.window.console.groupEnd();
  }

  info(message: string): void {
    this.window.console.info(message);
  }

  group(label: string): void {
    this.window.console.group(label);
  }

  log(message: string): void {
    this.window.console.log(message);
  }
}
