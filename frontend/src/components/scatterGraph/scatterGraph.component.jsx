import React,{useState} from 'react'
import { Scatter } from '@ant-design/charts';
import { Divider,Select } from 'antd';

const { Option } = Select;

const ScatterGraph=({data,clusterName,clusters})=>{
    const [graphVariables, setGraphVariables] = useState({
        xfield:Object.keys(clusters[0])[0],
        yfield:Object.keys(clusters[0])[1]
    })

    const handleChangeX=(value)=>{
        setGraphVariables({...graphVariables,xfield:value})
    }
    const handleChangeY=(value)=>{
        setGraphVariables({...graphVariables,yfield:value})
    }

    var config = {
        appendPadding: 30,
        data: data,
        xField: graphVariables.xfield,
        yField: graphVariables.yfield,
        colorField: clusterName,
        color: ["#332288", "#88CCEE", "#44AA99", "#117733", "#999933"],
        // sizeField: clusterName,
        size: 5,
        shape: 'circle',
        yAxis: {
          nice: true,
          line: { style: { stroke: '#eee' } },
          title:{
              text:graphVariables.yfield
          }
        },
        xAxis: {
          grid: { line: { style: { stroke: '#eee' } } },
          line: { style: { stroke: '#eee' } },
          title:{
            text:graphVariables.xfield
        }
        },
      };

    return(
        <div>
            <Divider/>
           
            <h2>Gráfico de dispersión</h2>
            <Scatter {...config} />
            <Select defaultValue={graphVariables.xfield} style={{ width: 120 }} onChange={handleChangeX} >
                {
                    Object.keys(data[0]).map(key=>(
                        key===graphVariables.xfield || key===graphVariables.yfield || key==="clusterH"|| key==="clusterP"?null:(<Option value={key}>{key}</Option>)
                    ))
                }
                
            </Select>
            <Select defaultValue={graphVariables.yfield} style={{ width: 120 }} onChange={handleChangeY}>
                {
                    Object.keys(data[0]).map(key=>(
                        key===graphVariables.xfield || key===graphVariables.yfield || key==="clusterH"|| key==="clusterP"?null:(<Option value={key}>{key}</Option>)
                    ))
                } 
            </Select>
        </div>
    )
}

export default ScatterGraph;