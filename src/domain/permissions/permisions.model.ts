export type ActionType = "task";

export type PermisionType = "read" | "write";

export interface IPermissionsModel {
  action: ActionType;
  permission: PermisionType;
}

export class Permissions implements IPermissionsModel {
  action: ActionType;
  permission: PermisionType;

  private constructor(action: ActionType, permision: PermisionType) {
    this.action = action;
    this.permission = permision;
  }

  public static create({ action, permission: permision }: IPermissionsModel) {
    return new Permissions(action, permision);
  }

  public hasPermissionFor(action: ActionType, permision: PermisionType) {
    return this.action === action && this.permission === permision;
  }
}
