import React,{useState} from "react";

export const ReusableFilters=({data,filterType,defaultSelected,criteria,defaultSearched}) =>{
    const [selectedValue,setSelectedValue]=useState(defaultSelected);
    const [searchedValue,setSearchedValue]=useState(defaultSearched);
    const handleChange=(e)=>{
        setSelectedValue(e.target.value);
    }
    const handleSearchChange=(e)=>{
        setSearchedValue(e.target.value);
    }
    const selecteddData= data.filter(item=>{
        
           return selectedValue!=defaultSelected && user.criteria!==selectedValue?false:true;
        
    });
    const searchedData=data.filter(item=>{
        const formattedValue=selectedValue.toLowerCase();
        Object.values(item).some(val=>
            val!=null && val.toString().toLowerCase().includes(formattedValue)
        );
    });
     return(
        <>
        {filterType==='select'?<div>
            <select 
            value={selectedValue}
            onChange={handleChange}

            >
                <option value={defaultSelected} >{defaultSelected}</option>
                {data.map(item=>(
                    <option key={item.id} value={item.criteria}>{item.criteria}</option>
                ))}
            </select>

        </div>:<div>
            <input type='text' onChange={handleSearchChange}  />
            </div>}
        </>
     )
}