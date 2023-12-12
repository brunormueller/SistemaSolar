import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartState {
  series: Array<{ name: string; data: number[] }>;
}

let base64 = "";
const GraficoRsi = ({ dadosRsi }: any) => {
  const [state, setState] = useState<ChartState>({ series: [] });
  const [options, setOptions] = useState<ApexOptions>({});
  const [anos, setAnos] = useState<string[]>([]);
  // const [base64, setBase64] = useState<string>();
  useEffect(() => {
    const years = Object.keys(dadosRsi);
    setAnos(years);

    const seriesData = years.map((year) => parseFloat(dadosRsi[year]));

    setOptions({
      chart: {
        id: "LineGraph1",
        type: "bar",
        height: 380,
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: -100000,
                to: -46,
                color: "#F15B46",
              },
              {
                from: -45,
                to: 0,
                color: "#FEB019",
              },
            ],
          },
          columnWidth: "80%",
        },
      },
      dataLabels: {
        enabled: false,
        formatter: function (y: number) {
          return (
            "R$ " +
            y.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          );
        },
        style: {
          colors: ["#000"],
          fontSize: "9px",
        },
        offsetY: 0.7,
      },
      yaxis: {
        labels: {
          formatter: function (y: number) {
            return (
              "R$ " +
              y.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            );
          },
        },
      },
      xaxis: {
        categories: years,
        labels: {
          rotate: -90,
        },
      },
    });

    setState({
      series: [
        {
          name: "Retorno",
          data: seriesData,
        },
      ],
    });
    const donwloadGrafico = async () => {
      const chartInstance = window.Apex._chartInstances.find(
        (chart: any) => chart.id === "LineGraph1"
      );
      base64 = await chartInstance.chart.dataURI();
      console.log(base64);
    };
    donwloadGrafico();
  }, [dadosRsi]);
  // async function downloadSVG(chartId: any) {

  //   const chartInstance = window.Apex._chartInstances.find(
  //     (chart: any) => chart.id === chartId
  //   );
  //   base64 = await chartInstance.chart.dataURI();
  //   // const downloadLink = document.createElement("a");
  //   // downloadLink.href = base64.imgURI;
  //   // downloadLink.download = "image.png";

  //   // // Add the anchor element to the document
  //   // document.body.appendChild(downloadLink);

  //   // // Simulate a click event to initiate the download
  //   // downloadLink.click();

  //   // // Remove the anchor element from the document
  //   // document.body.removeChild(downloadLink);
  // }

  return (
    <div>
      <ReactApexChart
        options={options}
        series={state.series}
        type="bar"
        height={350}
      />
      {/* <button onClick={() => downloadSVG("LineGraph1")}>Download svg</button> */}
    </div>
  );
};

export default { GraficoRsi, base64 };
