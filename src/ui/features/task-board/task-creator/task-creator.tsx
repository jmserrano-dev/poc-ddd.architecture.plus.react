import React from "react";
import { Input } from "antd";
import { CreateContract } from "../task.contracts";
import { Translator } from "@domain/seedwork/translator";
import { useInject } from "inversify-hooks";
import { IOC } from "@ioc";

interface Props extends CreateContract {}

export const TaskCreator = ({ onCreate }: Props) => {
  const [i18n] = useInject<Translator>(IOC.TRANSLATOR);

  return (
    <Input.Search
      className="width-100"
      placeholder={i18n.t("features.tasks.add.placeholder")}
      enterButton={i18n.t("features.tasks.add.button")}
      size="large"
      allowClear={true}
      onSearch={onCreate}
    />
  );
};
