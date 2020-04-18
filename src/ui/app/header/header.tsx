import React from "react";
import { Layout, Menu } from "antd";

import "./header.css";

export const Header = () => {
  return (
    <Layout.Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">TASKS</Menu.Item>
      </Menu>
    </Layout.Header>
  );
};
