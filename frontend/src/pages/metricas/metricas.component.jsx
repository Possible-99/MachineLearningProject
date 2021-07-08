import React from "react";
import "./metricas.styles.scss";
import MyLayout from "../../components/layout/layout.component";
import { Layout } from "antd";
const { Content } = Layout;

const Metricas = () => {
  return (
    <MyLayout menuKey="3" title="Metricas">
      <Content style={{ margin: "5px 16px 0px 16px" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          Metricas
        </div>
      </Content>
    </MyLayout>
  );
};

export default Metricas;
