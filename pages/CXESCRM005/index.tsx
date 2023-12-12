"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Divider from "@/components/Forms/Divider";
import PDFViewer from "@/components/PdfViewer/PDFViewer";
import StepperEtapa from "@/components/Stepper/Stepper";
import LoaderSun from "@/components/common/Loader/LoaderSun";
import Distribuidores from "@/pages/CXESCRM005/CardDistribuidores";
import { ComponentesKit } from "@/pages/CXESCRM005/ComponentesKit";
import DadosGerais from "@/pages/CXESCRM005/DadosGerais";
import ItensMarkup from "@/pages/CXESCRM005/ItensMarkup";
import ObservaçãoColeta from "@/pages/CXESCRM005/Observação";
import TiposTelhado from "@/pages/CXESCRM005/TipoTelhado";
import { listarImgCategoriasTelhados } from "@/requests/CRUD/CategoriasTelhado/listarCategoriaTelhado";
import {
  cadastrarColetaDados,
  listarComponentes,
} from "@/requests/CRUD/ColetaDados/cadastroColetaDados";
import {
  RSIB,
  cadastrarProposta,
} from "@/requests/CRUD/Propostas/cadastrarProposta";
import {
  ICidade,
  listarCidadesComEstado,
} from "@/requests/common/EstadosCidades/estadosCidades";
import { IValueLabel } from "@/types/formInterfaces";
import { GetForm } from "@/utils";
import { Button } from "@material-tailwind/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { Fragment, useEffect, useState } from "react";
import { BiLogoWhatsapp } from "react-icons/bi";
import {
  BsArrowLeftShort,
  BsFileEarmarkPdf,
  BsFiletypeDoc,
} from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import * as yup from "yup";

const schemas = [
  yup.object().shape({}),
  yup.object().shape({}),
  yup.object().shape({}),
  yup.object().shape({}),
  yup.object().shape({}),
  yup.object().shape({}),
];
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
declare global {
  interface Window {
    Apex?: any;
  }
}
interface ChartState {
  series: Array<{ name: string; data: number[] }>;
}
const ColetaDados = ({ inCard, dadosCliente, idColeta }: any) => {
  const [componentes, setComponentes] = useState([]);
  const [stepAtual, setStepAtual] = useState(0);
  const [yupSchema, setYupSchema] = useState<(typeof schemas)[0]>(schemas[0]);
  const [mostrarPdf, setMostrarPdf] = useState(false);
  const [dadosGerados, setDadosGerados] = useState(false);
  const [edicaoDados, setEdicaoDados] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [geraRsi, setGeraRsi] = useState(false);
  const [pdfLink, setPdfLink] = useState("");
  const [chartVisible, setChartVisible] = useState(false);
  const [cidades, setCidades] = useState<IValueLabel[]>([]);

  const [base64, setbase64] = useState();
  const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);
  const { nome, modulosNecessarios, valorFinalComponentes, idCliente } =
    form.control._formValues;

  const [state, setState] = useState<ChartState>({ series: [] });
  const [options, setOptions] = useState<ApexOptions>({});
  const [anos, setAnos] = useState<string[]>([]);
  const [id_coleta, setId_coleta] = useState();
  const [imgTelhados, setImgTelhados] = useState([]);
  const submitFormFunction = async () => {
    const data = form.control._formValues;
    const res = await cadastrarColetaDados(data);
    if (res.status) {
      setId_coleta(inCard ? idColeta : res.body);
      setIsLoading(true);
      donwloadGrafico(inCard ? idColeta : res.body);
    }
  };
  const novoContato = localStorage.getItem("NovoContato");
  useEffect(() => {
    const data = form.control._formValues;
    // if (novoContato && novoContato != "") {
    //   const dadosNovoContato = JSON.parse(novoContato);
    //   // data.setValue("idCliente", dadosNovoContato.id_cliente);
    //   data.setValue("nome", dadosNovoContato.nome_cliente);
    //   data.setValue("cidadeInCard", dadosNovoContato.cidade_estado_cliente);
    //   data.setValue("telefone", dadosNovoContato.telefone1_cliente);
    //   localStorage.setItem("NovoContato", "");
    // }
    // if (inCard) {
    //   data.setValue("idCliente", dadosCliente.id_cliente);
    //   data.setValue("nome", dadosCliente.nome_cliente);
    //   data.setValue(
    //     "cidadeInCard",
    //     dadosCliente.cidade_cliente + "-" + dadosCliente.estado_cliente
    //   );
    //   data.setValue("telefone", dadosCliente.telefone1_cliente);
    // }
    listarCidadesComEstado().then((arr) => {
      setCidades(
        arr.map((estado: ICidade) => ({
          label: `${estado.nome_cidade} - ${estado.estado_cidade}`,
          value: `${estado.id_cidade}`,
        }))
      );
    });
    listarImgCategoriasTelhados().then((res: any) => {
      setImgTelhados(res);
    });

    // listarComponentes().then((res: any) => {
    //   setComponentes(res.body.componentes);
    // });
  }, []);
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfLink;
    link.setAttribute("download", "Proposta.pdf");
    link.click();
  };
  const botoes = [
    {
      label: "Editar dados",
      icon: <BsArrowLeftShort size={24} />,
      className: "bg-primary flex items-center rounded-md mr-5 py-2",
      onClick: () => {
        setMostrarPdf(false);
        setEdicaoDados(true);
      },
      mostrar: !inCard,
    },
    {
      label: "Enviar por Whatsapp",
      icon: <BiLogoWhatsapp size={24} />,
      className: "bg-success flex items-center rounded-md py-2",
      onClick: () => {
        // enviarLink();
      },
      mostrar: true,
    },
    {
      label: "Enviar por E-mail",
      icon: <HiOutlineMail size={24} />,
      className: "bg-primary flex items-center rounded-md py-2 gap-1",
      onClick: () => {
        setMostrarPdf(false);
        setEdicaoDados(true);
      },
      mostrar: true,
    },
    {
      label: "Baixar DOC",
      icon: <BsFiletypeDoc size={20} />,
      className: "bg-primary flex items-center rounded-md py-2 gap-1",
      onClick: () => {
        setMostrarPdf(false);
        setEdicaoDados(true);
      },
      mostrar: true,
    },
    {
      label: "Baixar PDF",
      icon: <BsFileEarmarkPdf size={20} />,
      className: "bg-danger flex items-center rounded-md py-2 gap-1",
      onClick: handleDownload,
      mostrar: true,
    },
  ];
  const donwloadGrafico = async (id_coleta: any) => {
    const valorFinalFormatado = valorFinalComponentes
      .replace(/[^\d,]/g, "") // Remove tudo exceto números e vírgula
      .replace(",", ".");

    const dados = {
      concessionaria: "CELESC-DIS",
      uf_concessionaria: "SC",
      coleta: id_coleta,
      investimento: valorFinalFormatado,
    };
    await RSIB(dados).then((res) => {
      const dadosRsi = JSON.parse(res.body);
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
            columnWidth: "90%",
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
    });

    setChartVisible(true);

    setTimeout(() => {
      const chartInstance = window.Apex._chartInstances.find(
        (chart: any) => chart.id === "LineGraph1"
      );

      if (chartInstance && chartInstance.chart) {
        chartInstance.chart.dataURI().then(async (chart64: any) => {
          setbase64(chart64);
          const data = form.control._formValues;
          const dataColeta = { ...data, id_coleta, chart64 };
          await cadastrarProposta(dataColeta).then((res) => {
            setMostrarPdf(true);
            console.log(res.body);

            setPdfLink(res.body);
            setIsLoading(false);
          });

          return chart64;
        });
      }
    }, 1000);
  };

  const handleStepSelected = (value: number) => {
    setYupSchema(schemas[value]);

    setStepAtual(value);
    setGeraRsi(true);
  };
  const updateDadosGerados = (value: boolean) => {
    setDadosGerados(value);
  };
  const voltaPdf = (value: boolean) => {
    setMostrarPdf(value);
  };

  const stepsComponents = [
    {
      rotina: (
        <DadosGerais
          inCard={inCard}
          cidades={cidades}
          form={form}
          updateDadosGerados={updateDadosGerados}
        />
      ),
    },
    {
      rotina: <Distribuidores form={form} componentesKit={componentes} />,
    },
    { rotina: <TiposTelhado form={form} imgTelhados={imgTelhados} /> },
    {
      rotina: <ComponentesKit form={form} componentesKit={componentes} />,
    },
    { rotina: <ItensMarkup form={form} /> },
    { rotina: <ObservaçãoColeta form={form} /> },
  ];

  return (
    <Fragment>
      {isLoading ? (
        <>
          <div className="flex justify-center w-full mt-19">
            <LoaderSun />
          </div>
          {chartVisible && (
            <div className="opacity-[0.01] ">
              <ReactApexChart
                options={options}
                series={state.series}
                type="bar"
                height={350}
              />
            </div>
          )}
        </>
      ) : !mostrarPdf ? (
        <Fragment>
          {!inCard && <Breadcrumb pageName="Proposta Rápida" />}
          <form action="#" onSubmit={submitFormFunction}>
            <StepperEtapa
              onStepChange={handleStepSelected}
              onStepCompletion={() => {
                submitFormFunction();
              }}
              voltaPdf={voltaPdf}
              edicaoDados={edicaoDados}
              dadosGerados={dadosGerados}
            >
              {stepsComponents.map(
                (componente, index) =>
                  stepAtual === index && (
                    <div key={index}>{componente.rotina}</div>
                  )
              )}
            </StepperEtapa>
          </form>
          <button onClick={() => console.log(form)}>testeee form</button>
        </Fragment>
      ) : (
        <div>
          <h1 className="text-2xl text-center m-4 font-medium">
            Proposta Comercial Nº X / Rev. X - Cliente {nome}
          </h1>
          <Divider />
          <div className="flex gap-2 justify-center">
            {!inCard &&
              botoes.map(
                (botao, index) =>
                  botao.mostrar && (
                    <Button
                      key={index}
                      className={botao.className}
                      onClick={botao.onClick}
                    >
                      {botao.icon}
                      {botao.label}
                    </Button>
                  )
              )}
          </div>
          <div className="flex justify-center h-1/2 mt-4">
            <PDFViewer pdfUrl={pdfLink} />
          </div>
          {!inCard && (
            <div className="fixed right-10 bottom-2">
              <Button className="bg-success ">Prosseguir</Button>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};
export default ColetaDados;
