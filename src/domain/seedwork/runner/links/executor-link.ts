import { BaseLink } from "../base-link";
import { Context } from "../context";
import { Injectable } from "../../di/injectable";

@Injectable()
export class ExecutorLink extends BaseLink {
  async next(context: Context) {
    context.result = await context.useCase.internalExecute(context.param);
    return await this.nextLink.next(context);
  }
}
