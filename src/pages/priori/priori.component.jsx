import React from 'react'
import "./priori.styles.scss"
import MyLayout from "../../components/layout/layout.component";
import { Layout} from 'antd';
const {Content} = Layout;

const Priori = () => {
    
    return(
        <MyLayout menuKey="2">
          <Content style={{ marginTop:"10px" }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Priori
            </div>
          </Content>
          </MyLayout>
    )
}

export default Priori;