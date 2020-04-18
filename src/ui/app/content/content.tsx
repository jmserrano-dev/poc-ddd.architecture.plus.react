import React, { PropsWithChildren } from "react";
import { Layout, Breadcrumb } from "antd";

import "./content.css";

interface Props {}

export const Content = ({ children }: PropsWithChildren<Props>) => {
  return (
    <Layout.Content className="content">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Tasks</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">{children}</div>
    </Layout.Content>
  );
};
