import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { userGrowthData } from "../../utils/api";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
export default function Linechart() {
    const {darkMode}=useDarkMode();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["userGrowth"],
        queryFn: userGrowthData,
        staleTime: 1000 * 60 * 50,
    });
    if (isLoading) {
        return (
            <div className="w-full h-40 flex items-center justify-center">
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

    const series = [
        {
            name: "Users registered",
            data:data&& data.map((item) => item.user_count),
        },
    ];
    const options = {
        chart: {
            type: "line",
            
            height: 300,

            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories:data&& data.map((item) => `${item.year}-${item.month.toString().padStart(2, "0")}`),
           title:{
            text:"Month",
            style:{
                color:darkMode&&"#BBBBBB",
                fontFamily:"Public Sans,sans-serif",
                fontWeight:"500",
                fontSize:14,
            }
           },
           labels: {
            style: {
              fontSize: '12px', // change font size
              colors: darkMode&&"#BBBBBB" // change font size
            }
          }
           
            
           
          },
        yaxis: {
            title:{ 
                text:"Number of Users",
                style:{
                    color:darkMode&&"#BBBBBB",
                    fontFamily:"Public Sans,sans-serif",
                    fontWeight:"500",
                    fontSize:14,
                }
            },
            labels: {
                style: {
                  fontSize: '12px', // change font size
                  colors: [darkMode&&"#BBBBBB"] // change font size
                }
              }
            
            
        },
        title: {
            text: "Monthly User Growth",
            align: "center",
            style:{
                fontFamily:"Public Sans,sans-serif",
                fontWeight:"500",
                fontSize:'18px',
                color:darkMode&&'#BBBBBB ',
            },
        },
        
        stroke: {
            curve: "smooth",
            width: 3,
        },
        markers: {
            size: 5,
            hover: {
                sizeOffset: 2,
            },
        },
       grid:{
        
       
    }};
    if (data&&data.length<0){
        return (<div className="">
            No data to fetch
        </div>)
    }
    return (
        <div className="my-4 bg-white border dark:bg-[#22242B]  dark:border-none  rounded-md p-2  shadow-sm" >
            <ReactApexChart
                options={options}
                series={series}
                height={350}
                type="line"
                className="z-0 py-3  "

            />
        </div>
    );
}
