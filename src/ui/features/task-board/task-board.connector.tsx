import React, { useState, useEffect, useCallback } from "react";
import { useInject } from "inversify-hooks";

import { IOC } from "@ioc";
import { StateManager } from "@application/state";
import {
  GetTasksQuery,
  CreateTaskCommand,
  RemoveTaskCommand,
  ChangeStatusTaskCommand,
} from "@application/task";
import { Observer } from "@domain/seedwork/observer";
import { ITaskModel } from "@domain/task";
import { Guid } from "@domain/shared";
import { Notify } from "../../seedwork";
import { Translator } from "@domain/seedwork/translator";

export const withTaskBoardConnector = (
  Component: React.ComponentType<any>
) => () => {
  const { tasks } = useStageManger();
  const callbacks = useConnetors();

  return <Component tasks={tasks} {...callbacks} />;
};

const useStageManger = () => {
  const [tasks, setTasks] = useState<ITaskModel[]>([]);
  const [stateManager] = useInject<StateManager>(IOC.STATE_MANAGER);

  const observer: Observer = {
    notify: () => setTasks(stateManager.state.tasks),
  };

  useEffect(() => {
    stateManager.register(observer);
    return () => stateManager.unregister(observer);
  }, [observer, stateManager]);

  return { tasks };
};

const useConnetors = () => {
  const [i18n] = useInject<Translator>(IOC.TRANSLATOR);
  const [getTasksQuery] = useInject<GetTasksQuery>(IOC.GET_TASKS_QUERY);
  const [createTaskCommand] = useInject<CreateTaskCommand>(
    IOC.CREATE_TASK_COMMAND
  );
  const [changeStatusTaskCommand] = useInject<ChangeStatusTaskCommand>(
    IOC.CHANGE_STATUS_TASK_COMMAND
  );
  const [removeTaskCommand] = useInject<RemoveTaskCommand>(
    IOC.REMOVE_TASK_COMMAND
  );

  const onLoad = useCallback(async () => await getTasksQuery.execute(), [
    getTasksQuery,
  ]);

  const onCreate = useCallback(
    (text: string) => {
      createTaskCommand
        .execute(text)
        .catch(({ message }) =>
          Notify.show(
            i18n.t("features.tasks.exception.create"),
            i18n.t(message)
          )
        );
    },
    [createTaskCommand, i18n]
  );

  const onRemove = useCallback(
    (id: Guid) =>
      removeTaskCommand
        .execute(id)
        .catch(({ message }) =>
          Notify.show(
            i18n.t("features.tasks.exception.remove"),
            i18n.t(message)
          )
        ),
    [removeTaskCommand, i18n]
  );

  const onChangeStatus = useCallback(
    async (id: Guid) =>
      await changeStatusTaskCommand
        .execute(id)
        .catch(({ message }) =>
          Notify.show(
            i18n.t("features.tasks.exception.status"),
            i18n.t(message)
          )
        ),
    [changeStatusTaskCommand, i18n]
  );

  return { onLoad, onCreate, onChangeStatus, onRemove };
};
