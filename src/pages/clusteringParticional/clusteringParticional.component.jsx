import React from 'react'
import "./clusteringParticional.styles.scss"
import MyLayout from "../../components/layout/layout.component";
import { Layout} from 'antd';
const {Content} = Layout;

const ClusteringParticional = () => {
    
    return(
        <MyLayout menuKey="5">
          <Content style={{ marginTop:"10px" }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
             ClusteringParticional 
            </div>
          </Content>
          </MyLayout>
    )
}

export default ClusteringParticional;