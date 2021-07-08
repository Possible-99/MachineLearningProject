import React,{useState} from "react";
import "./priori.styles.scss";
import MyLayout from "../../components/layout/layout.component";
import { Layout,Row,Col,InputNumber,Divider,message} from "antd";
import FileDragger from "../../components/fileDragger/fileDragger.component";
const { Content } = Layout;

const Priori = () => {
  const [state, setState] = useState({
    fileList: [],
    uploading: false,
    inputsStatus:{support:null,confidence:null,lift:null,minElements:null}
  });



  
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
            <InputNumber min={0.0001} max={100} onChange={e=>setState({...state,inputsStatus:{...state.inputsStatus,support:e}})}/></Col>
            <Col span={6}>
            <h3>Confianza</h3>
            <InputNumber min={0.00001} max={100} onChange={e=>setState({...state,inputsStatus:{...state.inputsStatus,confidence:e}})}/></Col>
            <Col span={6}>
            <h3>Lift</h3>
            <InputNumber min={0.00001} max={100} onChange={e=>setState({...state,inputsStatus:{...state.inputsStatus,lift:e}})} /></Col>
            <Col span={6}>
            <h3>Núm. de elementos min.</h3>
            <InputNumber min={1} max={100} onChange={e=>setState({...state,inputsStatus:{...state.inputsStatus,minElements:e}})}/></Col>
          </Row>
          <Divider>Para subir el archivo primero completa los campos anteriores</Divider>
          <FileDragger  state={state} setState={setState} />
        </div>
      </Content>
    </MyLayout>
  );
};

export default Priori;
