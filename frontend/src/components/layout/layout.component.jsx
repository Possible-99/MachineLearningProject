import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { PageHeader } from "antd";
import { BellFilled, BulbFilled, GithubFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import {
  TableOutlined,
  HomeOutlined,
  ColumnWidthOutlined,
  DotChartOutlined,
} from "@ant-design/icons";

import "./layout.styles.scss";

const {  Footer, Sider } = Layout;
const { SubMenu } = Menu;

const MyLayout = ({ children, menuKey, title }) => {
  const [isCollapsed, setCollapsed] = useState({
    collapsed: false,
  });

  const onCollapse = () => {
    setCollapsed({ collapsed: !collapsed });
  };
  const { collapsed } = isCollapsed;
  let history = useHistory();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} >
        <Menu theme="dark" defaultSelectedKeys={[menuKey]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/dashboard" style={{ color: "white" }}>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<TableOutlined />}>
            <Link to="/dashboard/priori" style={{ color: "white" }}>
              A priori
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ColumnWidthOutlined />}>
            <Link to="/dashboard/metricas" style={{ color: "white" }}>
              Metricas S.
            </Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<DotChartOutlined />} title="Clustering">
            <Menu.Item key="4">
              <Link to="/dashboard/clustering-jerarquico">Jerarquico</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/dashboard/clustering-particional">Particional</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <PageHeader
          className="site-page-header"
          onBack={history.goBack}
          title={title}
          ghost={false}
          // extra={[
          //   <BulbFilled style={{ cursor: "pointer" }} />,
          //   <BellFilled style={{ cursor: "pointer" }} />,
          //   <Button key="1" type="primary">
          //     Primary
          //   </Button>,
          // ]}
        />
        {children}
        <Footer style={{ textAlign: "center" }}>
          <a href="https://github.com/Possible-99" id="gitHubLink">
            Created by Juan SR  <GithubFilled style={{fontSize:"1.5em",margin:"0 0 0 4px"}}/>
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
