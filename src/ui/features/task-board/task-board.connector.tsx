import React, { useState, useEffect, useCallback } from "react";
import { useInject } from "inversify-hooks";

import { IOC } from "@ioc";
import { StateManager } from "@application/state";
import { GetTasksQuery, CreateTaskCommand } from "@application/task";
import { Observer } from "@domain/seedwork/observer";
import { ITaskModel } from "@domain/task";

export const withTaskBoardConnector = (
  Component: React.ComponentType<any>
) => () => {
  const { tasks } = useStageManger();
  const { onLoad, onCreate } = useConnetors();

  return <Component tasks={tasks} onLoad={onLoad} onCreate={onCreate} />;
};

const useConnetors = () => {
  const [getTasksQuery] = useInject<GetTasksQuery>(IOC.GET_TASKS_QUERY);
  const [createTaskCommand] = useInject<CreateTaskCommand>(
    IOC.CREATE_TASK_COMMAND
  );

  const onLoad = useCallback(async () => await getTasksQuery.execute(), [
    getTasksQuery,
  ]);

  const onCreate = useCallback(
    async (text: string) => await createTaskCommand.execute(text),
    [createTaskCommand]
  );

  return { onLoad, onCreate };
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
