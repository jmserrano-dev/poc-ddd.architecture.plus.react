import { container } from "inversify-props";
import { IOC } from "ioc";
import { Runner } from "../runner/runner";
import { Permissions } from "domain/permissions";

export abstract class UseCase<Result = void, Param = void> {
  abstract readonly: boolean;
  abstract permissions: Permissions;
  abstract internalExecute(param: Param): Result;

  public async execute(param: Param): Promise<Result> {
    return (await container.get<Runner>(IOC.RUNNER).run(this, param)) as Result;
  }
}
