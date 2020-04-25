import { IPermissionsModel } from "./permisions.model";

export interface PermissionsRepository {
  load: () => Promise<void>;
  hasPermissionFor: (permissions: IPermissionsModel) => Promise<boolean>;
}
