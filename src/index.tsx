import "./domain/seedwork/prototypes";

import "reflect-metadata";
import React from "react";

import { render } from "react-dom";
import { Container } from "@ioc";

import { App } from "@ui/app";

Container.instance();

const rootElement = document.getElementById("root");
render(<App />, rootElement);
