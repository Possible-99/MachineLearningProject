import React,{useState} from "react";
import "./priori.styles.scss";
import MyLayout from "../../components/layout/layout.component";
import { Layout,Row,Col,InputNumber,Divider,message} from "antd";
import FileDragger from "../../components/fileDragger/fileDragger.component";

const { Content } = Layout;

const Priori = () => {
  const [state, setState] = useState({support:null,confidence:null,lift:null,minElements:null})
  const props = {
    name: 'file',
    accept:".csv",
    data:state,
    maxCount:"1",
    disabled:Object.values(state).indexOf(null) > -1?true:false,
    multiple: false,
    action: '/api/priori',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        console.log(info.response)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  console.log(state)
  return (
    <MyLayout menuKey="2" title="A priori">
      <Content style={{ margin: "5px 16px 0px 16px" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
        <h2>Introduce los datos para generar las reglas</h2>
          <Row>
            <Col span={6}>
            <h3>Soporte</h3>
            <InputNumber min={0.0001} max={100} onChange={e=>setState({...state,support:e})} /></Col>
            <Col span={6}>
            <h3>Confianza</h3>
            <InputNumber min={0.00001} max={100} onChange={e=>setState({...state,confidence:e})} /></Col>
            <Col span={6}>
            <h3>Lift</h3>
            <InputNumber min={0.00001} max={100} onChange={e=>setState({...state,lift:e})} /></Col>
            <Col span={6}>
            <h3>Núm. de elementos min.</h3>
            <InputNumber min={1} max={100} onChange={e=>setState({...state,minElements:e})}/></Col>
          </Row>
          <Divider>Para subir el archivo primero completa los campos anteriores</Divider>
          <FileDragger {...props} />
        </div>
      </Content>
    </MyLayout>
  );
};

export default Priori;
