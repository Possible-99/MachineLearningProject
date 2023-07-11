import React,{useState,useEffect} from 'react'

import { Divider, Select,Button } from 'antd';



const SelectVariables=({text,state,setVariablesSelected,data,loading,setLoading})=>{
    const OPTIONS = data;
    const [items, setItems] = useState({"selectedItems": [],allVariables:false})
    
    const handleChange = selectedItems => {
        setItems({ selectedItems });
      };

    useEffect(() => {
        if (items.selectedItems.length===6){
            setVariablesSelected(items.selectedItems)
            setLoading(true)
        }
    }, [items])
    
    const handleClick=()=>{
        setItems({...items,allVariables:true})
        setVariablesSelected("all")
        setLoading(true)
    }

    const { selectedItems } = items;
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
    const disabled=selectedItems.length===6?true:false || items.allVariables===true?true:false

    return(
       
        <div>
         <Divider/>
            <h3>Selecciona solo 6 variables</h3>
            <Select
            showArrow
            mode="multiple"
            value={selectedItems}
            onChange={handleChange}
            style={{ width: '100%' }}
            loading={loading}
            disabled={disabled}
            >
                {filteredOptions.map(item => (
                <Select.Option key={item} value={item} disabled={disabled}>
                    {item}
                </Select.Option>
            ))}
            </Select>
            <Divider/>
            <h3>Ó selecciona todas las variables en la tabla</h3>
            <Button type="primary" loading={loading} onClick={handleClick} disabled={disabled} >Todas</Button>
        </div>
    )
}


export default SelectVariables;