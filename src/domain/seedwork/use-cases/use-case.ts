import { container } from "inversify-props";
import { IOC } from "@ioc";
import { Runner } from "../runner/runner";

export abstract class UseCase<Result = void, Param = void> {
  abstract readonly: boolean;
  abstract internalExecute(param: Param): Result;

  public execute(param: Param): Result {
    return container.get<Runner>(IOC.RUNNER).run(this, param) as Result;
  }
}
