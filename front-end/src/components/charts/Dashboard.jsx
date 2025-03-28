import React,{useState,useEffect} from 'react';
import Linechart from './LineChart';
import BarChart from './BarChart';

export default function Dashboard(){
    return(
        <div className='w-full pt-22 mt-2 bg-slate-100'>
            <Linechart />
            <BarChart />

        </div>
    )
};
