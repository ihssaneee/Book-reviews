// import React, { useContext } from "react";
// import { useState } from "react";
// import MyContext from "./AuthContext";
// export default function Component1(){
//     const [name,setName]=useState('');
//     const formName=useContext(MyContext);
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         formName(name);
//       };
//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input type='text' onChange={(e)=>setName(e.target.value)} />
//                 <button type="submit">send</button>
//             </form>
//         </div>
//     )
// }