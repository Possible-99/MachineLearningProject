import React from 'react'
import {Row,Col,InputNumber,Typography} from "antd";


const {Title}=Typography
const PrioriInputs=({state,setState,disabled})=>{

    return(
        <div>
        <Title level={3}>Introduce los datos para generar las reglas</Title>
        <h4 style={{fontWeight:"300"}}>Introduce paramtros validos para obtener los mejores resultados, para subir el archivo introduce los parametros.
        </h4>
          <Row>
            <Col xs={24} sm={8} md={8} lg={6} xl={6}>
            <h3>Soporte</h3>
            <InputNumber min={0.0001} max={100} onChange={e=>setState({...state,support:e})} disabled={disabled}  /></Col>
            <Col xs={24} sm={8} md={8} lg={6} xl={6}>
            <h3>Confianza</h3>
            <InputNumber min={0.00001} max={100} onChange={e=>setState({...state,confidence:e})} disabled={disabled}/></Col>
            <Col xs={24} sm={8} md={8} lg={6} xl={6}>
            <h3>Lift</h3>
            <InputNumber min={0.00001} max={100} onChange={e=>setState({...state,lift:e})}  disabled={disabled}/></Col>
            <Col xs={24} sm={8} md={8} lg={6} xl={6}>
            <h3>Núm. de elementos min.</h3>
            <InputNumber min={1} max={100} onChange={e=>setState({...state,minElements:e})} disabled={disabled}/></Col>
          </Row>
        </div>
    )
}

export default PrioriInputs;