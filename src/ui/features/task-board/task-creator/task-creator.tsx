import React from "react";
import { Input } from "antd";

interface Props {
  onCreate: (text: string) => Promise<void>;
}

export const TaskCreator = ({ onCreate }: Props) => {
  return (
    <Input.Search
      className="width-100"
      placeholder={t.placeholder}
      enterButton={t.button}
      size="large"
      onSearch={onCreate}
    />
  );
};

const t = {
  placeholder: "Add new task...",
  button: "Add",
};
