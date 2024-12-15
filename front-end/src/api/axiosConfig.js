import axios from 'axios';

const getApiBaseUrl=()=> {
    const host=window.location.hostname;
    if (host.includes('localhost') || host.includes('127.0.0.1')){
        return 'http://localhost:8000';

    }
    else{
        return `http://${host}:8000`;
    }
};
// For debugging purposes
console.log('import.meta.env:', import.meta.env);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || getApiBaseUrl(),
  withCredentials: true,
  withXSRFToken : true,
});

 const initializeCsrfProtection=async()=>{
    try{
        await axiosInstance.get('/sanctum/csrf-cookie');
    }
    catch(error){
        console.error('error fetching csrf token:',error)
    }
 };
 
 export {axiosInstance,initializeCsrfProtection};