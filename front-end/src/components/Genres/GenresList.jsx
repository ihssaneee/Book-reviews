import React from "react";
import { useState } from "react";
import { useGenres } from "../../contexts/GenreContext";
import { RotatingLines } from 'react-loader-spinner'


const Genres=()=>{
    const {genres,loading}=useGenres();


    return(
        <div className="flex flex-col border ">
            <h2>Genres</h2>
            <table className="border">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {loading?
                    
                    <tr  >
                <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
            
                />
            </tr>:(
                   genres.map((genre)=>(
                    <tr key={genre.id}>
                        <td>{genre.id}</td>
                        <td>{genre.name}</td>
                        <td>{genre.description}</td>
                    </tr>
               
                    
                        ))
                        
                    )} 
                </tbody>
            </table>
        </div>
    )
}
export default Genres;