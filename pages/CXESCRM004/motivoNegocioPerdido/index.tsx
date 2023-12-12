import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      // endingShape: false ,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"],
  },
  yaxis: {
    title: {
      text: "Propostas",
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " propostas";
      },
    },
  },
};

const GraficoMotivoNegocioPerdido = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Concorrente com menor preço",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Preço",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Concorrente",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
      {
        name: "Crédito não aprovado",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
      {
        name: "Área disponível insuficiente",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
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
    <div id="" className="bg-white rounded ml-3 p-4 mt-3 w-1/2">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Motivos negócio perdido</p>
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

export default GraficoMotivoNegocioPerdido;
