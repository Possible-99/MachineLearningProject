import React from 'react'
import { InboxOutlined } from '@ant-design/icons';
import {Upload} from "antd";
import "./fileDragger.styles.scss";
const { Dragger } = Upload;

const FileDragger=(props)=>{

    return(
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
            <InboxOutlined />
        </p>
        <p className="ant-upload-text">Haz click o arrastra el archivo hasta aqui para subirlo</p>
        <p className="ant-upload-hint">
            Se debe subir un archivo en formato .csv
        </p>
        </Dragger>
    )
}

export default FileDragger