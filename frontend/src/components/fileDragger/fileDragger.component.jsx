import React from 'react'
import {Upload,Button, message } from "antd";
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios';
import "./fileDragger.styles.scss"

const FileDragger=({state,setState})=>{

    const handleUpload = () => {
        const { fileList } =state;
        const formData = new FormData();
        fileList.forEach(file => {
          formData.append('file', file);
        });
    
        setState({...state,
          uploading: true,
        });
    
        // You can use any AJAX library you like
        axios.post('/api/priori', {formData,inputValues:state.inputsStatus}, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then(()=>{setState({
            ...state,
            uploading: false,
          })
          message.success('upload successfully.')})
          .catch(()=>{
            setState({
              uploading: false,
            });
            message.error('upload failed.');
          })
      };
    
      const {fileList,uploading } = state;
      const props = {
          accept:".csv",
        onRemove: file => {
          setState(state => {
            const index = state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();
            newFileList.splice(index, 1);
            return {...state,
              fileList: newFileList,
            };
          });
        },
        beforeUpload: file => {
          setState(state => ({...state,
            fileList: [...state.fileList, file],
          }));
          return false;
        },
        fileList,
      };

    return(
    <div>
        <Upload {...props}>
        <Button icon={<UploadOutlined />}>Selecciona o arrastra el archivo</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0 || Object.values(state.inputsStatus).indexOf(null) > -1 }
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
      </div>
    )
}

export default FileDragger