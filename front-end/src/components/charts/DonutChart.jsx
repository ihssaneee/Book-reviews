import React from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import { usersByCountry } from "../../utils/api";

export default function DonutChart() {
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["usersByCountry"],
        queryFn: usersByCountry,
        staleTime: 1000 * 60 * 5,
    });

    const series = data ? data.map((item) => item.users_percent) : [];
    const options = {
        chart: {
            type: "donut",
            height: 350, // Set a fixed height for the chart
        },
        labels: data && data.map((item) => item.country),
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(2) + "%";
            },
        },
        title: {
            text: "Users By Country",
            align: "center",
            offsetY: -5, // Move the title upwards
            style: {
                fontFamily: "Public Sans, sans-serif",
                fontWeight: "500",
                fontSize: "18px",
                color: "#444050",
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "36%",
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
                <div className="flex flex-col items-center pb-10 pt-4 bg-white border rounded-md p-2 shadow-sm">
                    <ReactApexChart
                        series={series}
                        options={options}
                        type="donut"
                        height={350} // Match the height set in the options
                    />
                </div>
            )}
        </>
    );
}