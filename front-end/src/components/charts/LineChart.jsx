import React,{useState,useEffect} from "react";
import ReactApexChart from 'react-apexcharts';
import { userGrowthData } from "../../utils/api";
import { fontSize } from "@mui/system";

export default function Linechart(){
    const [chartData,setChartData]=useState([]);
    const [loading,setLoading]=useState(false);
   
    useEffect(()=>{
        const fetchUserGrowthData=async()=>{
            setLoading(true);
            try{
                const userData= await userGrowthData();
                setChartData(userData);
                console.log("user growth data fetched successfully.");
            }
            catch(error){
                console.error('an error occured, user growth data could not be fetched',error.response.message);
            }
            finally{
                setLoading(false);
            }
        };
        fetchUserGrowthData();
    },[])
    const series=[{
        name:'Users registered',
        data:chartData.map((item)=>item.user_count),
    }]
    const options={
        chart:{
            type:'line',
            height:350,
            toolbar:{
                show:true
            }
        },
        xaxis:{
            categories:chartData.map(item=>`${item.year}-${item.month.toString().padStart(2,'0')}`),
            title:'Month'
        },
        yaxis:{
            title:"Number of Users"
        },
        title:{
            text:"Monthly User Growth",
            align:'left',
        },
        dataLabels:{
            enabled:true,
            style:{
                fontSize:"12px",
                colors:['#333']
            }
        },
        stroke:{
            curve:'smooth',
            width:3,
        },
        markers:{
            size:5,
           hover:{
            sizeOffset:2
           }
        },
        grid:{
            row:{
                colors:['#f3f3f3', 'transparent'],
                opacity:0.5,
            }
        }
    }
    if (loading){
        return <div>Loading user growth data...</div>
    }
    return (
        <div >
            
            <ReactApexChart options={options} series={series} height={350} />
        </div>
    )
}
