import React, { useEffect } from "react";
import { Space, Row, Col, Result } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

import { ITaskModel } from "@domain/task";

import { Task } from "./task/Task";
import { TaskCreator } from "./task-creator/task-creator";
import {
  LoadContract,
  CreateContract,
  RemoveContract,
  ChangeStatusContract,
} from "./task.contracts";
import { useTranslator } from "@ui/seedwork/hoc";

export interface Props
  extends LoadContract,
    CreateContract,
    ChangeStatusContract,
    RemoveContract {
  tasks: ITaskModel[];
}

export const TaskBoardComponent = ({
  tasks,
  onLoad,
  onCreate,
  onRemove,
  onChangeStatus,
}: Props) => {
  const { t } = useTranslator();

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <Space className="width-100" direction="vertical" size="large">
      <TaskCreator onCreate={onCreate} />
      {tasks.length > 0 ? (
        <Row gutter={[16, 16]}>
          {tasks.map((task) => (
            <Col key={task.id.value} xs={24} sm={24} md={12} lg={6}>
              <Task
                {...task}
                onChangeStatus={onChangeStatus}
                onRemove={onRemove}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Result
          icon={<UnorderedListOutlined />}
          title={t("features.tasks.empty")}
        />
      )}
    </Space>
  );
};
