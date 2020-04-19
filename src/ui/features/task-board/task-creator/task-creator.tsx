import React from "react";
import { Input } from "antd";
import { CreateContract } from "../task.contracts";
import { useTranslator } from "@ui/seedwork/hoc";

interface Props extends CreateContract {}

export const TaskCreator = ({ onCreate }: Props) => {
  const { t } = useTranslator();

  return (
    <Input.Search
      className="width-100"
      placeholder={t("features.tasks.add.placeholder")}
      enterButton={t("features.tasks.add.button")}
      size="large"
      allowClear={true}
      onSearch={onCreate}
    />
  );
};
