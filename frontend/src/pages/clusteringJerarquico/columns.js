export const columns=[
    {
        title:"Variable",
        dataIndex:"variable",
    },
    {
        title:"Value",
        dataIndex:"value",
    }
]


export const fixData=(data)=>{
    const fixedData=[]
    const variables=Object.keys(data)
    const values=Object.values(data)

    for (let index = 0; index < variables.length; index++) {
        fixedData.push({
            variable:variables[index],
            value:values[index]
        })
    }
    return {fixedData:fixedData,variables:variables}
}
