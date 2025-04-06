import React,{useState} from "react";
import { useQuery } from "@tanstack/react-query";
import { popularBooksData } from "../../utils/api";
import ReactApexChart from "react-apexcharts";
import {Oval} from 'react-loader-spinner';
import { useDarkMode } from "../../contexts/DarkModeContext";
import { fontFamily, fontSize } from "@mui/system";
export default function BarChart(){
    const {data,isLoading,error,isError}=useQuery({
        queryKey:['popularBooks'],
        queryFn:popularBooksData,
        staleTime:1000*60*5,
    })
    const {darkMode}=useDarkMode();

    if (isLoading) {
            return (
                <div className="w-full h-40 flex items-center justify-center ">
                    <Oval
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            );
        }
        if (isError) {
            return <div>Error fetching user growth data: {error?.message}</div>;
        }

        const series=[
            {
                name:"Reviews Count",
                data:data.map(item=>item.reviews_count),
            },
        ]
        const options={
            chart: {
                type: 'bar',
                height: 350,
              },
            plotOptions:{
                bar:{
                horizontal:true,
                borderRadius:4,
                borderRadiusApplication:false,
                columnHeight:'30%',

                }
            },
            dataLabels: {
                enabled: false
              },
            title:{
                text:"Popular Books",
                align:'center',
                style:{
                    fontFamily:"Public Sans,sans-serif",
                    fontWeight:"500",
                    fontSize:'18px',
                    color:darkMode&&"#BBBBBB",
                },
                
            },
            xaxis: {
                categories: data.map(item=>item.book_title),
                min: 0,
                forceNiceScale: true,
                labels: {
                    formatter: function(val) {
                        return val.toFixed();
                    },
                    style: {
                        cssClass: darkMode ? "yaxis-dark" : "yaxis-light",
                        fontFamily:"Public Sans,sans-serif",
                        fontSize:"14px",
                    },
                   
                },
            },
            yaxis: {
                labels: {
                    style: {
                        cssClass: darkMode ? "yaxis-dark" : "yaxis-light",
                        fontFamily:"Public Sans,sans-serif",
                        fontSize:"14px",
                    },
                },
            },



              
        }

        return (
            <div className="w-full py-2 bg-white border dark:border-none rounded-md  shadow-sm dark:bg-[#22242B] " >
                <ReactApexChart series={series} options={options} type="bar" height={350} className="dark:bg-[#22242B] " />
            </div>
        )


}