// import { RSIB } from "@/requests/CRUD/Propostas/cadastrarProposta";
// import { ApexOptions } from "apexcharts";
// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// const ReactApexChart = dynamic(() => import("react-apexcharts"), {
//   ssr: false,
// });

// interface ChartState {
//   series: Array<{ name: string; data: number[] }>;
// }
// let base64 = "";
// function getBase64Image() {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     const svgElement = document.getElementById("apexchartsLineGraph1");
//     // Obtém o próximo elemento SVG
//     const nextSvgElement = svgElement?.nextElementSibling;

//     console.log(nextSvgElement);
//     // const imageBlobURL =
//     //   "data:image/svg+xml;charset=utf-8," +
//     //   encodeURIComponent(svgElement.outerHTML);
//     // img.onload = () => {
//     //   var canvas = document.createElement("canvas");
//     //   canvas.width = img.width;
//     //   canvas.height = img.height;
//     //   const ctx = canvas.getContext("2d");
//     //   ctx.drawImage(img, 0, 0);
//     //   const dataURL = canvas.toDataURL("image/png");
//     //   resolve(dataURL);
//     // };
//     // img.onerror = (error) => {
//     //   reject(error);
//     // };
//     console.log(svgElement);

//     // img.src = imageBlobURL;
//   });
// }
// const GraficoRSI = ({ geraRsi }: any) => {
//   const [state, setState] = useState<ChartState>({ series: [] });
//   const [options, setOptions] = useState<ApexOptions>({});
//   const [anos, setAnos] = useState<string[]>([]);
//   const dados = {
//     concessionaria: "CELESC-DIS",
//     uf_concessionaria: "SC",
//     coleta: 132,
//     investimento: "31428.00",
//   };
//   useEffect(() => {
//     RSIB(dados).then((res) => {
//       const dadosRsi = JSON.parse(res.body);
//       const years = Object.keys(dadosRsi);
//       setAnos(years);

//       const seriesData = years.map((year) => parseFloat(dadosRsi[year]));

//       setOptions({
//         chart: {
//           id: "LineGraph1",
//           type: "bar",
//           height: 380,
//         },
//         plotOptions: {
//           bar: {
//             colors: {
//               ranges: [
//                 {
//                   from: -100000,
//                   to: -46,
//                   color: "#F15B46",
//                 },
//                 {
//                   from: -45,
//                   to: 0,
//                   color: "#FEB019",
//                 },
//               ],
//             },
//             columnWidth: "80%",
//           },
//         },
//         dataLabels: {
//           enabled: true,
//           formatter: function (y) {
//             return (
//               "R$ " +
//               y.toLocaleString("pt-BR", {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })
//             );
//           },
//           style: {
//             fontSize: "10px",
//           },
//           offsetY: 0.7,
//         },
//         yaxis: {
//           labels: {
//             formatter: function (y) {
//               if (y === 0) {
//                 return 0;
//               }
//               return (
//                 "R$ " +
//                 y.toLocaleString("pt-BR", {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })
//               );
//             },
//           },
//         },

//         xaxis: {
//           categories: years,
//           labels: {
//             rotate: -90,
//           },
//         },
//       });

//       setState({
//         series: [
//           {
//             name: "Retorno",
//             data: seriesData,
//           },
//         ],
//       });
//     });
//   }, []);

//   return (
//     <>
//       <div className="">
//         <ReactApexChart
//           options={options}
//           series={state.series}
//           type="bar"
//           height={350}
//         />
//       </div>
//       <button onClick={getBase64Image}>ffffffff</button>
//     </>
//   );
// };

// export default GraficoRSI;
