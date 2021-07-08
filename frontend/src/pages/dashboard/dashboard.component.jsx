import React from "react";
import "./dashboard.styles.scss";
import MyLayout from "../../components/layout/layout.component";
import { Layout, Card } from "antd";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
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
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 16, sm: 16, md: 16, lg: 32 },
            ]}
            style={{ marginBottom: "10px", height: "140px" }}
          >
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Link to="/dashboard/priori">
                <Card className="card-algorithm " hoverable>
                  <span>Algoritmo a priori</span>
                </Card>
              </Link>
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Link to="/dashboard/metricas">
                <Card className="card-algorithm " hoverable>
                  <span>Metricas de similitud</span>
                </Card>
              </Link>
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Link to="/dashboard/clustering-jerarquico">
                <Card className="card-algorithm " hoverable>
                  <span>Clustering Jerarquico</span>
                </Card>
              </Link>
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Link to="/dashboard/clustering-particional">
                <Card className="card-algorithm " hoverable>
                  <span>Clustering Particional</span>
                </Card>
              </Link>
            </Col>
          </Row>
        </div>
      </Content>
    </MyLayout>
  );
};

export default Dashboard;
