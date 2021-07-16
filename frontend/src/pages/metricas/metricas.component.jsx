import React,{useState} from "react";
import "./metricas.styles.scss";
import MyLayout from "../../components/layout/layout.component";
import { Divider, Layout,message,Button, Typography,notification} from "antd";
import FileDragger from "../../components/fileDragger/fileDragger.component";
import DataTable from "../../components/dataTable/dataTable.component";
import columnsGenerator from "../../pages/metricas/columns"
const { Content } = Layout;
const {Title}=Typography

const Metricas = () => {

  const [disabledStatus, setDisabledStatus] = useState(false)
  const [metricasData, setMetricasData] = useState(null)
  const [columns, setColumns] = useState(null)
  const props = {
    name: 'file',
    accept:".csv,.txt",
    maxCount:"1",
    disabled: disabledStatus ,
    multiple: false,
    action: '/api/metricas',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        setDisabledStatus(true)
      }
      if (status === 'done') {
        if (Object.keys(info.file.response).length === 0){
          message.error("Ingresa un archivo o parametros validos") 
          setMetricasData(info.file.response)
        }
        else{
          message.success(`Se completo exitosamente`);
          setMetricasData(info.file.response)
          const columnsSkeleton=columnsGenerator(info.file.response.numberColumns)
          setColumns(columnsSkeleton)
        }
      } else if (status === 'error') {
        message.error("Error. Suba un archivo valido");
      }
    },
    onDrop(e) {
      // console.log('Dropped files', e.dataTransfer.files);
    },
  }; 

  console.log(metricasData)

  return (
    <MyLayout menuKey="3" title="Metricas">
      <Content style={{ margin: "5px 16px 0px 16px" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
        <Title level={3}>Sube el archivo para obtener las metricas de similitud</Title>
        <h4 style={{fontWeight:"300"}}>Suber un archivo solo con los datos necesarios(sin columnas que contengan ID,etc)</h4>
          <FileDragger {...props}/>
          <Button type="primary" style={{float:"right",margin:"10px 0",display:disabledStatus?"":"none"}} size="middle" onClick={()=>window.location.reload()} >Nuevo estudio</Button>
          
          {
            metricasData==null?null:(
                Object.keys(metricasData).length !== 0 && (
              <div>
                <Divider></Divider>
                <DataTable data={metricasData.euclidian} columns={columns} tableTitle={"Tabla Euclidiana"} size="small" scroll={{ x: 1500}}pagination={false} />
                <Divider/>
                <DataTable data={metricasData.minkowski} columns={columns} tableTitle={"Tabla Minkowski "} size="small" scroll={{ x: 1500}}pagination={false} />
                <Divider/>
                <DataTable data={metricasData.chebyshev} columns={columns} tableTitle={"Tabla Chebyshev(P=1.5)"} size="small" scroll={{ x: 1500}}pagination={false} />
                <Divider/>
                <DataTable data={metricasData.manhattan} columns={columns} tableTitle={"Tabla Manhattan"} size="small" scroll={{ x: 1500}}pagination={false} />
              </div>
              )
            )
            }
        </div>
      </Content>
    </MyLayout>
  );
};

export default Metricas;
