
export const columnsGenerator=(data)=>{
    let columns=[]
    columns.push({
    title:"",
    key:"index",
    render:(text,record,index)=>index ,
  })
    const keys=Object.keys(data[0])
    keys.forEach(item=>{
        columns.push({
            title:item,
            dataIndex:item,
        })
    })
    return columns
}

export const columnsGeneratorWithoutIndex=(data)=>{
    console.log(data)
    let columns=[]
    const keys=Object.keys(data[0])
    keys.forEach(item=>{
        columns.push({
            title:item,
            dataIndex:item,
        })
    })
    return columns
}

