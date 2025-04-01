import React,{useState,useEffect} from "react";
import { useContext,createContext } from "react";

const DarkModeContext=createContext();
export const useDarkMode=()=>{
    return useContext(DarkModeContext);
};
const DarkModeProvider=({children})=>{
    const [darkMode,setDarkMode]=useState(()=>{
        return localStorage.getItem('darkMode')==="true"
    });


    const toggleDarkMode=()=>{
        setDarkMode((prev)=>{
            const newMode= !prev;
            localStorage.setItem('darkMode',newMode);
            return newMode;
        });
    }

    useEffect(()=>{
        if (darkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
    },[darkMode]);

    const values={
        darkMode,
        toggleDarkMode,
    };

    return(
        <DarkModeContext.Provider value={values} >
            {children}
        </DarkModeContext.Provider>
    )
}
export default DarkModeProvider;

