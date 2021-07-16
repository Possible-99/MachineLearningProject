import React from "react";
import "./dashboard.styles.scss";
import MyLayout from "../../components/layout/layout.component";
import { Divider, Layout} from "antd";
import DashboardAlgoButtons from "../../components/dashboardAlgoButtons/dashboardAlgoButtons.component";
import HowToSection from "../../components/howToSection/howToSection.component";

const { Content } = Layout;

const Dashboard = () => {
  return (
    <MyLayout menuKey="1" title="Home">
      <Content style={{ margin: "5px 16px 0px 16px" }}>
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: "100%",
          }}
        >
          <DashboardAlgoButtons/>
          <Divider/>
          <HowToSection title="Como usar cada algoritmo" tabNames={["A priori","Metricas de similitud","Clustering"]}/>

        </div>
      </Content>
    </MyLayout>
  );
};

export default Dashboard;
