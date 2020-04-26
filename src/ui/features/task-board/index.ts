import { withTaskBoardConnector } from "./task-board.connector";
import { TaskBoardComponent } from "./task-board";
import { withLoading } from "ui/seedwork";

export const TaskBoard = withLoading(
  withTaskBoardConnector(TaskBoardComponent)
);
