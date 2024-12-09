import {React,useState} from "react";
const addGenre=()=>{
    const [formData,setFormData]=useState({
        name:'',
        description:'',

    });
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value

        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
    }


    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label> Name</label>
                <input type="text" 
            </div>
        </form>
    )
}