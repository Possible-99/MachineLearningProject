import React from 'react'
import {Row,Col,InputNumber} from "antd";

const PrioriInputs=({state,setState,disabled})=>{

    return(
        <div>
        <h2>Introduce los datos para generar las reglas</h2>
          <Row>
            <Col span={6}>
            <h3>Soporte</h3>
            <InputNumber min={0.0001} max={100} onChange={e=>setState({...state,support:e})} disabled={disabled}  /></Col>
            <Col span={6}>
            <h3>Confianza</h3>
            <InputNumber min={0.00001} max={100} onChange={e=>setState({...state,confidence:e})} disabled={disabled}/></Col>
            <Col span={6}>
            <h3>Lift</h3>
            <InputNumber min={0.00001} max={100} onChange={e=>setState({...state,lift:e})}  disabled={disabled}/></Col>
            <Col span={6}>
            <h3>Núm. de elementos min.</h3>
            <InputNumber min={1} max={100} onChange={e=>setState({...state,minElements:e})} disabled={disabled}/></Col>
          </Row>
        </div>
    )
}

export default PrioriInputs;