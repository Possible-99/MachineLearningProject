import React from "react";
import "./clusteringParticional.styles.scss";
import MyLayout from "../../components/layout/layout.component";
import { Layout } from "antd";
const { Content } = Layout;

const ClusteringParticional = () => {
  return (
    <MyLayout menuKey="5" title="Clustering Particional">
      <Content style={{ margin: "5px 16px 0px 16px" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          ClusteringParticional
        </div>
      </Content>
    </MyLayout>
  );
};

export default ClusteringParticional;
