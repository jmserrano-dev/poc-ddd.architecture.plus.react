import React, { useState } from "react";
import { Checkbox, Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { ITaskModel } from "@domain/task";
import { ChangeStatusContract, RemoveContract } from "../task.contracts";

interface Props extends ITaskModel, ChangeStatusContract, RemoveContract {}

export const Task = ({
  id,
  text,
  completed,
  onChangeStatus,
  onRemove,
}: Props) => {
  const [disabled, setDisabled] = useState(false);

  const handleChangeStatus = () => {
    setDisabled(disabled);
    onChangeStatus(id).finally(() => setDisabled(false));
  };

  const handleRemove = () => {
    setDisabled(true);
    onRemove(id).finally(() => setDisabled(false));
  };

  return (
    <Card
      className="with-100"
      hoverable
      actions={[
        <DeleteOutlined
          key="close"
          disabled={disabled}
          onClick={handleRemove}
        />,
      ]}
    >
      <Card.Meta
        avatar={
          <Checkbox
            checked={completed}
            disabled={disabled}
            onChange={handleChangeStatus}
          />
        }
        title={text}
      />
    </Card>
  );
};
