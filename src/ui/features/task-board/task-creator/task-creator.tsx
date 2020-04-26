import React from "react";
import { Input } from "antd";
import { CreateContract } from "../task.contracts";
import { useTranslator } from "ui/seedwork";

interface Props extends CreateContract {}

export const TaskCreator = ({ onCreate }: Props) => {
  const { t } = useTranslator();

  const handleCreate = (value: string) => {
    if (value.trim().isNotEmpty()) {
      onCreate(value);
    }
  };

  return (
    <Input.Search
      className="width-100"
      placeholder={t("features.tasks.add.placeholder")}
      enterButton={t("features.tasks.add.button")}
      size="large"
      allowClear={true}
      onSearch={handleCreate}
    />
  );
};
