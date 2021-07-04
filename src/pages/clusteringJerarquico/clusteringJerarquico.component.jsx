import React from 'react'
import "./clusteringJerarquico.styles.scss"
import MyLayout from "../../components/layout/layout.component";
import { Layout} from 'antd';
const {Content} = Layout;

const ClusteringJerarquico = () => {
    
    return(
        <MyLayout menuKey="4">
          <Content style={{ marginTop:"10px" }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
             ClusteringJerarquico 
            </div>
          </Content>
          </MyLayout>
    )
}

export default ClusteringJerarquico;