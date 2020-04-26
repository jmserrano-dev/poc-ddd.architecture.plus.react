import { Guid } from "domain/shared";
import { ITaskModel } from "domain/task";

export interface LoadContract {
  onLoad: () => Promise<ITaskModel[]>;
}

export interface CreateContract {
  onCreate: (text: string) => Promise<void>;
}

export interface ChangeStatusContract {
  onChangeStatus: (id: Guid) => Promise<void>;
}

export interface RemoveContract {
  onRemove: (id: Guid) => Promise<void>;
}
