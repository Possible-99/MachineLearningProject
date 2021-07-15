import React,{useState,useEffect} from 'react'
// import {} from 'antd';
import axios from "axios";
import DataTable from '../dataTable/dataTable.component';
import {columnsGenerator,columnsGeneratorWithoutIndex} from './columns';
import { Divider, message } from 'antd';
import ScatterGraph from '../scatterGraph/scatterGraph.component';

const ClusteringResults=({variablesSelected,corrVariables,clusteringAlgorithm, clusterName})=>{
    const [responseData, setResponseData] = useState(null)
    const [columns,setColumns]=useState(null)
    
    
    // Enviamos los campos seleccionados por el usuario
   const url="/api/clustering"+clusteringAlgorithm
   const file=new FormData()
   const jsonVariables=JSON.stringify(variablesSelected)
   file.append("file",corrVariables.file)
   file.append("variablesSelected",jsonVariables)
    
   useEffect(() => {
        axios.post(url,file,{headers: {'Content-Type': 'multipart/form-data'}}).then(response=>{
            const dataWithoutJson={clustersQuantity:response.data.clustersQuantity,centroidesH:JSON.parse(response.data.centroidesH),tablaGeneral:JSON.parse(response.data.tablaGeneral)}
            setResponseData(dataWithoutJson)
        })
        .catch(error=>message.error("Hubo un error, intentalo de nuevo"))

    }, [])

    useEffect(()=>{
        if(responseData!=null){
            const {tablaGeneral,centroidesH,clustersQuantity}=responseData
            const columnsEskeleton={tablaGeneralColumns:columnsGeneratorWithoutIndex(tablaGeneral),centroidesHColumns:columnsGenerator(centroidesH),clustersQuantity:columnsGeneratorWithoutIndex([clustersQuantity])}
            setColumns(columnsEskeleton)
        }
    },[responseData])
    


    return(
        <div>
        {columns!=null && (
            <div>
                <Divider/>
                <DataTable data={responseData.tablaGeneral} columns={columns.tablaGeneralColumns} scroll={{ x: 1500}} pagination={true} size="large" tableTitle="Tabla de todos los elementos con su cluster"/>
                <Divider/>
                <DataTable data={[responseData.clustersQuantity]} columns={columns.clustersQuantity} scroll={{ x: 1500}} pagination={false} size="large" tableTitle="Num. Elementos en cada cluster"/>
                <Divider/>
                <DataTable data={responseData.centroidesH} columns={columns.centroidesHColumns} scroll={{ x: 1500 }} pagination={false} size="large" tableTitle="Clusters"/>
                <ScatterGraph data={responseData.tablaGeneral} clusterName={clusterName} clusters={responseData.centroidesH}/>
            </div> )}
        </div>
    )
}


export default ClusteringResults;