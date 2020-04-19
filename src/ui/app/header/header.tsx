import React from "react";
import { Layout, Menu, Row, Col } from "antd";
import { useTranslator } from "@ui/seedwork/hoc";
import { Language } from "./language/language";

import "./header.css";

export const Header = () => {
  const { t } = useTranslator();

  return (
    <Layout.Header className="header">
      <Row>
        <Col span={3}>
          <div className="logo" />
        </Col>
        <Col span={19}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">{t("menu.tasks")}</Menu.Item>
          </Menu>
        </Col>
        <Col span={2}>
          <Language />
        </Col>
      </Row>
    </Layout.Header>
  );
};
