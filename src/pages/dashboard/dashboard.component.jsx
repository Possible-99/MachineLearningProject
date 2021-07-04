import React from 'react'
import "./dashboard.styles.scss"
import MyLayout from "../../components/layout/layout.component";
import { Layout} from 'antd';
const {Content} = Layout;

const Dashboard=()=> {
 


  return(
      <MyLayout menuKey="1">
          <Content style={{ marginTop:"10px" }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Home
            </div>
          </Content>
          </MyLayout>
          
  )
}

export default Dashboard;