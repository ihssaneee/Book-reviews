import axios from 'axios';


const axiosInstance=axios.create({
    baseURL:'http://localhost:8000',
    withCredentials:true,
    withXSRFToken: true,
   
});
 const initializeCsrfProtection=async()=>{
    try{
        await axiosInstance.get('/sanctum/csrf-cookie');
    }
    catch(error){
        console.error('error fetching csrf token:',error)
    }
 };
 initializeCsrfProtection();
 export {axiosInstance,initializeCsrfProtection};