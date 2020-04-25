import { IOC } from "@ioc";
import { BaseLink } from "../base-link";
import { Context } from "../context";
import { Inject, Injectable } from "../../di";
import {
  PermissionsRepository,
  PermissionsDeniedException,
} from "@domain/permissions";
import { Logger } from "@domain/seedwork/use-cases";

@Injectable()
export class PermissionsLink extends BaseLink {
  @Inject(IOC.LOGGER) private readonly logger!: Logger;
  @Inject(IOC.PERMISSIONS_REPOSITORY)
  private readonly permissionsRepository!: PermissionsRepository;

  async next(context: Context) {
    const { permissions } = context.useCase;

    const hasPermission = await this.permissionsRepository.hasPermissionFor(
      permissions
    );

    this.logger.group(context.useCase.constructor.name);
    this.logger.group("Permisions");
    this.logger.object(context.useCase.permissions);
    this.logger.log(`Result: ${hasPermission}`);
    this.logger.groupEnd();
    this.logger.groupEnd();

    if (!hasPermission) {
      throw new PermissionsDeniedException();
    }

    return await this.nextLink.next(context);
  }
}
