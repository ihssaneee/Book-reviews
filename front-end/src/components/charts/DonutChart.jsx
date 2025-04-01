import React from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import { usersByCountry } from "../../utils/api";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { dark } from "@mui/material/styles/createPalette";
export default function DonutChart() {
    const {darkMode}=useDarkMode();
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["usersByCountry"],
        queryFn: usersByCountry,
        staleTime: 1000 * 60 * 5,
    });

    const series = data ? data.map((item) => item.users_percent) : [];
    const options = {
        chart: {
            type: "donut",
            height: 350, 
        },
        labels: data && data.map((item) => item.country),
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + "%";
            },
            
        },
       legend:{
        labels:{
            colors:darkMode&&"#BBBBBB",
            
        },
        fontWeight:500,
        position:'right',
        show:true,
        markers:{
            offsetX:-6
        }
       },
        plotOptions: {
          
            pie: {
                donut: {
                    size: "56%",
                   
                },
            },
            
        },
        stroke: { show: false },
        colors: ["#405189", "#0ab39c", "#f7b84b", "#f06548", "#299cdb"],
    };

    return (
        <>
            {isLoading ? (
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
            ) : isError ? (
                <div>Error fetching user growth data: {error?.message}</div>
            ) : (
                <div className="flex flex-col gap-3 items-center pb-10 pt-4 bg-white border dark:border-none rounded-md  shadow-sm dark:bg-[#22242B] ">
                    <h5 className={`${darkMode?"text-neutral-300":"text-gray-800"} dark:border-b-slate-500 border-b w-full text-center pb-3 font-Inter`} >Users By Country</h5>
                    <ReactApexChart
                        series={series}
                        options={options}
                        type="donut"
                        height={350} // Match the height set in the options
                        className="dark:bg-[#22242B] py-4 "
                    />
                </div>
            )}
        </>
    );
}