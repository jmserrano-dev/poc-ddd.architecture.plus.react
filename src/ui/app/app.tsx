import React from "react";
import { TodoPage } from "../features/todo";

import "./app.css";

export const App = () => {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <TodoPage />
    </div>
  );
};
