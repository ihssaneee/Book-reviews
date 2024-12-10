import {React,useState} from "react";
import { useGenres } from "../../contexts/GenreContext";
const AddGenreForm=()=>{
    const [formData,setFormData]=useState({
        name:'',
        description:'',

    });
    const [error,setError]=useState(null);
    const {addGenre}=useGenres();
    const [success,setSuccess]=useState(null);
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value,

        })
    }
    const validateForm=()=>{
        if (!formData.name.trim() || !formData.description.trim()){
            setError('All Fields are required!');
            return false;
        }
        setError(null);
        return true;
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if (!validateForm()){
            return;
        }
        try{
            await addGenre(formData);
            setFormData({
                name:'',
                description:'',
            });
            setError(null);
            setSuccess('genre Added successfully!');

        }
        catch(error){
            console.error('could not add genre!',error);
           const errorMessage=error.response?.data?.message || 'an unexpected error occured!';
           setError(errorMessage);
           setSuccess(null);
        }
    }


    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label> Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
            </div>
            <div>
                <label>Description</label>
                <input type='text' name='description' value={formData.description} onChange={handleChange} required />
            </div>
            <button type="submit" >Add Genre</button>
            {error?<span>
                {error}
            </span>:""}
        </form>
    )
}
export default AddGenreForm;