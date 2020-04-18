import React from "react";
import { Card } from "antd";

import { ITaskModel } from "@domain/task";

interface Props extends ITaskModel {
  onChangeText?: () => Promise<void>;
  onChangeStatus?: () => Promise<void>;
}

export const Task = ({ text, completed }: Props) => {
  return (
    <Card title={text} style={{ width: "100%" }}>
      <p>{`Completed: ${completed}`}</p>
    </Card>
  );
};
