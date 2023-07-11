

const columnsGenerator=(numberColumns)=>{
  const columns= [];
  columns.push({
    title:"",
    key:"index",
    render:(text,record,index)=>index ,
  })

  for (let index = 0; index < numberColumns; index++) {
    columns.push({
      title: `${index}`,
      dataIndex:`${index}` ,
      key: `${index}`,
    })
  }
  return columns;
}


export default columnsGenerator;