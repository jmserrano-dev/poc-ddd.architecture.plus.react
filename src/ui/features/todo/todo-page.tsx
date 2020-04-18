import React, { useState, useEffect, useCallback } from "react";
import { useInject } from "inversify-hooks";
import { StateManager } from "@application/state";
import { GetTodosQuery } from "@application/todo/queries/get-todos-query";
import { TodoModel } from "@domain/todo";
import { Observer } from "@domain/seedwork/observer";
import { IOC } from "@ioc";

export const TodoPage = () => {
  const { todos } = useStageManger();

  useGetTodosQuery();

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{`${todo.id}-${todo.text}-${todo.completed}`}</li>
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
  const [todos, setTodos] = useState<TodoModel[]>([]);
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
