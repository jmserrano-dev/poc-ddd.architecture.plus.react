import React from "react";
import { Menu, Dropdown } from "antd";
import { FlagOutlined } from "@ant-design/icons";
import { useInject } from "inversify-hooks";
import { Translator } from "@domain/locale";
import { IOC } from "@ioc";
import { Notify } from "@ui/seedwork";
import { StateManager } from "@application/state";
import { useLocale } from "@ui/seedwork/hoc";

export const Language = () => {
  const [i18n] = useInject<Translator>(IOC.TRANSLATOR);
  const [stateManager] = useInject<StateManager>(IOC.STATE_MANAGER);

  const { locale } = useLocale();

  const handleChangeLanguage = (language: string) => {
    i18n
      .changeLanguage(language)
      .then((locale) => stateManager.patch({ ...stateManager.state, locale }))
      .catch(() =>
        Notify.show(
          i18n.t("features.language.title"),
          i18n.t("features.language.exception.not-found")
        )
      );
  };

  return (
    <Dropdown.Button
      overlay={
        <Menu onClick={({ key }) => handleChangeLanguage(key)}>
          {i18n.getAvailableLanguages().map((language) => (
            <Menu.Item key={language}>{language}</Menu.Item>
          ))}
        </Menu>
      }
      icon={<FlagOutlined />}
    >
      {locale}
    </Dropdown.Button>
  );
};
