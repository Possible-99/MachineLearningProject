import React,{useState} from "react";
import "./clusteringJerarquico.styles.scss";
import MyLayout from "../../components/layout/layout.component";
import { Layout,message } from "antd";
import ClusteringFirstPart from "../../components/clusteringFirstPart/clusteringFirstPart.component";
import ClusteringResults from "../../components/clusteringResults/clusteringResults.component";
const { Content } = Layout;

const ClusteringJerarquico = () => {
  const [corrVariables,setCorrVariables]=useState(null)
  const [variablesSelected, setVariablesSelected] = useState(null)

  
  
  console.log(corrVariables)
  return (
    <MyLayout menuKey="4" title="Clustering Jerarquico">
      <Content style={{ margin: "5px 16px 0px 16px" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <h2>Sube un archivo para generar los clusters</h2>
          <h4 style={{fontWeight:"300"}}>Suber un archivo solo con los datos necesarios(sin columnas que contengan ID,etc)</h4>
          <ClusteringFirstPart setCorrVariables={setCorrVariables} corrVariables={corrVariables} variablesSelected={variablesSelected} setVariablesSelected={setVariablesSelected}/>
          {variablesSelected!=null &&(
            <div>
            <ClusteringResults variablesSelected={variablesSelected} corrVariables={corrVariables} clusteringAlgorithm="Jerarquico" clusterName="clusterH"/>
            </div>
          ) }
        </div>
      </Content>
    </MyLayout>
  );
};

export default ClusteringJerarquico;
