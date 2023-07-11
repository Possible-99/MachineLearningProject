import React from 'react'
import {Table} from 'antd';
import "./dataTable.styles.scss"

const DataTable=({data,columns,tableTitle,size,scroll,pagination})=>{
    return(
        <div style={{display:"block"}}>
        <h3>{tableTitle}</h3>
        <Table columns={columns} dataSource={data} scroll={scroll} size={size} pagination={pagination} />
        </div>
    )
}


export default DataTable;