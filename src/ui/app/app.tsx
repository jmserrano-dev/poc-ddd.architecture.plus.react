import React from "react";
import { Layout } from "antd";
import { Header } from "./header/header";
import { Content } from "./content/content";
import { Footer } from "./footer/footer";
import { TaskBoard } from "../features/task-board";
import { useLocale } from "../seedwork";

import "./app.css";
import "antd/dist/antd.css";

export const App = () => {
  useLocale();

  return (
    <Layout id="components-layout-demo-top" className="layout">
      <Header />
      <Content>
        <TaskBoard />
      </Content>
      <Footer />
    </Layout>
  );
};
