import "./domain/seedwork/prototypes";

import "reflect-metadata";
import React from "react";
import { render } from "react-dom";
import { I18nextProvider } from "react-i18next";

import { Container } from "@ioc";
import { App } from "@ui/app";

import i18n from "./i18next";

Container.instance();

const rootElement = document.getElementById("root");

const Root = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
};

render(<Root />, rootElement);
