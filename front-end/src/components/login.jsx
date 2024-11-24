import { useState, useEffect } from "react";
import React from "react";
import { useNavigate} from 'react-router-dom';
import { axiosInstance } from "../api/axiosConfig";
import { useAuth } from "../contexts/AuthContext";


export default function Login() {
  const navigate=useNavigate();
  const {login}=useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[error,setError]=useState(null);
    const validateForm=()=>{
      if (!email ||!password){
        setError('all fields are required !');
        return false;
      }
      setError(null);
      return true;
    }

    const handleSubmit = async (e) => {
      
        e.preventDefault();
        if (!validateForm()){
          return;
        };
        try {
         const loggedUser=  await login({email,password});
            if (loggedUser.role==='admin'){
              navigate('/dashboard');

            }
            else{
              navigate('/');
            }
           
        } catch (error) {
            console.error('Error logging in:', error);
            setError('invalid email or password .Please try again.')
            
        }
    };

    return (
       
    <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form   className="space-y-6"  onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                      Password
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                  <div className="text-red-500 p-2">
                    
                      {error? 
                      error:
                      <></>}
                  </div>
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Not a member?{' '}
                <a  onClick={()=>{navigate('/Signup')}} className="font-semibold cursor-pointer text-indigo-600 hover:text-indigo-500">
                 Sign Up
                </a>
              </p>
            </div>
          </div>
        </>
      )
}
