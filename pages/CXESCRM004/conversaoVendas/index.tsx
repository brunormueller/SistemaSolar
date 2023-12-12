import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const options: ApexOptions = {
  chart: {
    height: 350,
    type: "line",
  },
  stroke: {
    width: [0, 4],
  },
  title: {
    text: "Conversão de Vendas",
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [1],
  },
  labels: [
    "01 Jan 2001",
    "02 Jan 2001",
    "03 Jan 2001",
    "04 Jan 2001",
    "05 Jan 2001",
    "06 Jan 2001",
    "07 Jan 2001",
    "08 Jan 2001",
    "09 Jan 2001",
    "10 Jan 2001",
    "11 Jan 2001",
    "12 Jan 2001",
  ],
  xaxis: {
    type: "datetime",
  },
};

const GraficoConversaoVendas = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Website Blog",
        type: "column",
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
      },
      {
        name: "Social Media",
        type: "line",
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 165],
      },
    ],
  });

  return (
    <div id="chart" className="bg-white rounded p-4">
      <ReactApexChart
        options={options}
        series={state.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default GraficoConversaoVendas;
