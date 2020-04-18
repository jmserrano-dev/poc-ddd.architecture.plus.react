import React, { useEffect } from "react";
import { Space, Row, Col } from "antd";

import { ITaskModel } from "@domain/task";

import { Task } from "./task/Task";
import { TaskCreator } from "./task-creator/task-creator";

export interface Props {
  tasks: ITaskModel[];
  onLoad: () => Promise<ITaskModel[]>;
  onCreate: (text: string) => Promise<void>;
}

export const TaskBoardComponent = ({ tasks, onLoad, onCreate }: Props) => {
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <Space className="width-100" direction="vertical" size="large">
      <TaskCreator onCreate={onCreate} />
      <Row gutter={[16, 16]}>
        {tasks.map((task) => (
          <Col key={task.id.value} span={6}>
            <Task {...task} />
          </Col>
        ))}
      </Row>
    </Space>
  );
};
