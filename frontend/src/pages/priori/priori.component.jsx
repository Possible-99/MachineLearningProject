import React,{useState} from "react";
import "./priori.styles.scss";
import MyLayout from "../../components/layout/layout.component";
import { Layout,Divider,message,Button} from "antd";
import FileDragger from "../../components/fileDragger/fileDragger.component";
import PrioriInputs from '../../components/prioriInputs/prioriInputs.component';
import PrioriTable from "../../components/dataTable/dataTable.component"
import {columns} from "../../pages/priori/columns"
const { Content } = Layout;

const Priori = () => {
  const [state, setState] = useState({support:null,confidence:null,lift:null,minElements:null})
  const [disabledStatus, setDisabledStatus] = useState(false)
  const [prioriData, setPrioriData] = useState(null)

  const props = {
    name: 'file',
    accept:".csv",
    data:state,
    maxCount:"1",
    disabled:Object.values(state).indexOf(null) > -1 || disabledStatus ,
    multiple: false,
    action: '/api/priori',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        setDisabledStatus(true)
      }
      // if (status=="uploading"){
      //   setTimeout(()=>{
      //     if(status=="donde"){
      //       return
      //     }
      //     message.error("Hubo un error. Intenta con otros parametros")
      //     window.location.reload()
      //   },60000)
      // }
      if (status === 'done') {
        if (info.file.response.rules.length === 0){
          message.error("Ingresa un archivo o parametros validos") 
          setPrioriData(info.file.response)
        }
        else{
          message.success(`Se completo exitosamente`);
          setPrioriData(info.file.response)
        }
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      // console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const refreshPage = ()=>{
    window.location.reload();
 }

  return (
    <MyLayout menuKey="2" title="A priori">
      <Content style={{ margin: "5px 16px 0px 16px" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <PrioriInputs state={state} setState={setState} disabled={disabledStatus}/>
          <Divider/>
          <FileDragger {...props} />
          <Divider></Divider>
          {prioriData==null? null:(<div>
          <PrioriTable data={prioriData.rules} columns={columns} tableTitle="Tabla Apriori"/>
          <Button type="primary" onClick={refreshPage}>Nuevo estudio</Button></div>)
          }

        </div>
      </Content>
    </MyLayout>
  );
};

export default Priori;
