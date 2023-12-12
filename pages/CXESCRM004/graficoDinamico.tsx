import { listarCfgDashboard } from "@/requests/CRM/Dashboard/listarDashboard";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const options: ApexOptions = {
  chart: {
    height: 390,
    type: "radialBar",
  },
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: "30%",
        background: "transparent",
        image: undefined,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          show: false,
        },
      },
    },
  },
  colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
  labels: ["Redes Sociais", "Site", "Indicação", "Pesquisa"],
  legend: {
    show: true,
    floating: true,
    fontSize: "16px",
    position: "left",

    offsetX: 160,
    offsetY: 15,
    labels: {
      useSeriesColors: true,
    },

    formatter: function (seriesName, opts) {
      return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
    },
    itemMargin: {
      vertical: 3,
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          show: false,
        },
      },
    },
  ],
};
const GraficoDinamico = ({ tipoGrafico }: any) => {
  // const [cfgDashboard, setCfgDashboard] = useState();
  const [state, setState] = useState({
    series: [76, 67, 61, 90],
  });

  useEffect(() => {
    // listarCfgDashboard().then((res) => {
    //   setCfgDashboard(res);
    // });
  }, []);

  return (
    <div id="" className="bg-white rounded ml-3 p-4 mt-3 w-1/2">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Origem do Cliente</p>
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
        type="radialBar"
        height={350}
      />
    </div>
  );
};

export default GraficoDinamico;
