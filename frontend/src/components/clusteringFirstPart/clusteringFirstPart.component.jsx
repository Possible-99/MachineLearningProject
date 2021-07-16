import React,{useState} from 'react'
import { Divider,message,Button } from "antd";
import FileDragger from "../../components/fileDragger/fileDragger.component";
import DataTable from "../../components/dataTable/dataTable.component";
import {fixData,columns} from "../../pages/clusteringJerarquico/columns";
import SelectVariables from "../../components/selectVariables/selectVariables.component";



const ClusteringFirstPart=({setCorrVariables,corrVariables,variablesSelected,setVariablesSelected,setLoading,loading})=>{
    const [disabledStatus, setDisabledStatus] = useState(false)
    const props = {
        name: 'file',
        accept:".csv,.txt",
        maxCount:"1",
        disabled: disabledStatus ,
        multiple: false,
        action: '/api/clusteringVariables',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            setDisabledStatus(true)
          }
          if (status === 'done') {
            if (Object.keys(info.file.response).length === 0){
              message.error("Ingresa un archivo o parametros validos") 
            }
            else{
              message.success(`Se completo exitosamente`)
              console.log("===========")
              console.log(info)
              setCorrVariables({file:info.file.originFileObj,variables:info.file.response.variables})
    
            }
          } else if (status === 'error') {
            message.error("Error. Introduzca un archivo o parametrtos validos");
          }
        }
      }; 

    return(
        <div>
        <FileDragger {...props}/>
          <Button type="primary" style={{float:"right",margin:"10px 0",display:disabledStatus?"":"none"}} onClick={()=>window.location.reload()}>Otro estudio</Button>
          {
            corrVariables!==null && (
            <div>
              <Divider/> 
              <DataTable columns={columns} data={fixData(corrVariables.variables[0]).fixedData} tableTitle="Correlacion de Variables" pagination={false}/>
              <SelectVariables state={variablesSelected} setVariablesSelected={setVariablesSelected} text="Selecciona cinco variables o usa todas las variables de tu tabla" data={fixData(corrVariables.variables[0]).variables} setLoading={setLoading} loading={loading}/>
            </div>)
          }
          </div>
    )
}


export default ClusteringFirstPart;