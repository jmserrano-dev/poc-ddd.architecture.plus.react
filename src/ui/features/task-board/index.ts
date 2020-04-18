import { withTaskBoardConnector } from "./task-board.connector";
import { TaskBoardComponent } from "./task-board";

export const TaskBoard = withTaskBoardConnector(TaskBoardComponent);
