import { Injectable } from "domain/seedwork/di";
import {
  Permissions,
  PermissionsRepository,
  IPermissionsModel,
} from "domain/permissions";

@Injectable()
export class PermissionsInMemoryRepository implements PermissionsRepository {
  private permissions = new Array<Permissions>();

  public load(): Promise<void> {
    return new Promise((resolve) => {
      this.permissions.push(
        Permissions.create({ action: "task", permission: "read" })
      );
      this.permissions.push(
        Permissions.create({ action: "task", permission: "write" })
      );
      resolve();
    });
  }

  public hasPermissionFor({
    action,
    permission,
  }: IPermissionsModel): Promise<boolean> {
    return new Promise((resolve) => {
      const hasPermission = this.permissions.some((x) =>
        x.hasPermissionFor(action, permission)
      );
      resolve(hasPermission);
    });
  }
}
