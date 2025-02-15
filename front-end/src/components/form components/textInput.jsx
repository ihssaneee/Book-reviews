import React from "react";

function TextInput({label,name,type="text"}){
    const allowedTypes=['text','number','email','date','password'];
    if (!allowedTypes.includes(type)){
        console.warn('type not supported')
    }
    return (
        <div >
           {label && <label htmlFor={name}>{label}</label>}
            <input type={type} id={name} name={name} />
        </div>
    )
};
export default TextInput;