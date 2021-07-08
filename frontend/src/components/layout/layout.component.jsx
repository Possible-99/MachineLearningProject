import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { PageHeader, Button } from "antd";
import { BellFilled, BulbFilled } from "@ant-design/icons";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./layout.styles.scss";

const { Header, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const MyLayout = ({ children, menuKey, title }) => {
  const [isCollapsed, setCollapsed] = useState({
    collapsed: false,
  });

  const onCollapse = () => {
    setCollapsed({ collapsed: !collapsed });
  };
  const { collapsed } = isCollapsed;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[menuKey]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/dashboard" style={{ color: "white" }}>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/dashboard/priori" style={{ color: "white" }}>
              A priori
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<DesktopOutlined />}>
            <Link to="/dashboard/metricas" style={{ color: "white" }}>
              Metricas S.
            </Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Clustering">
            <Menu.Item key="4">
              <Link to="/dashboard/clustering-jerarquico">Jerarquico</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/dashboard/clustering-particional">Particional</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="6" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title={title}
          ghost={false}
          extra={[
            <BulbFilled style={{ cursor: "pointer" }} />,
            <BellFilled style={{ cursor: "pointer" }} />,
            <Button key="1" type="primary">
              Primary
            </Button>,
          ]}
        />
        {children}
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
