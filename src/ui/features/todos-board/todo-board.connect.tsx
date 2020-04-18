import React, { useState, useEffect, useCallback } from "react";
import { useInject } from "inversify-hooks";
import { StateManager } from "./node_modules/@application/state";
import { GetTodosQuery } from "./node_modules/@application/todo/queries/get-todos.query";
import { ITodoModel } from "./node_modules/@domain/todo";
import { Observer } from "./node_modules/@domain/seedwork/observer";
import { IOC } from "./node_modules/@ioc";

export const TodoPage = () => {
  const { todos } = useStageManger();

  useGetTodosQuery();

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id.value}>{`${todo.text}-${todo.completed}`}</li>
      ))}
    </ul>
  );
};

const useGetTodosQuery = () => {
  const [getTodosQuery] = useInject<GetTodosQuery>(IOC.GET_TODOS_QUERY);

  const fetchData = useCallback(async () => await getTodosQuery.execute(), [
    getTodosQuery,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
};

const useStageManger = () => {
  const [todos, setTodos] = useState<ITodoModel[]>([]);
  const [stateManager] = useInject<StateManager>(IOC.STATE_MANAGER);

  const observer: Observer = {
    notify: () => setTodos(stateManager.state.todos),
  };

  useEffect(() => {
    stateManager.register(observer);
    return () => stateManager.unregister(observer);
  }, [observer, stateManager]);

  return { todos };
};
