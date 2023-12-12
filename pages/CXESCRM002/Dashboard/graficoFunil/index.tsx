import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const GraficoFunil = ({ listas }: any) => {
  // console.log(listas);

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 0,

        horizontal: true,
        barHeight: "80%",
        isFunnel: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      dropShadow: {
        enabled: true,
      },
    },

    xaxis: {
      categories: listas.map((item: any) => item.title),
    },
    legend: {
      show: false,
    },
  });
  const [state, setState] = useState({
    series: [
      {
        name: "Propostas",
        data: listas.map((item: any) => item.cards.length),
      },
    ],
  });
  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };

  handleReset;

  return (
    <div id="chart" className="bg-white rounded p-4 mt-3 w-full">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Propostas por Classificação</p>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div>
      </div>
      <ReactApexChart
        options={options}
        series={state.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default GraficoFunil;
