import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Dashboard from "@/components/Dashboard/E-commerce";
import { BarChart3 } from "lucide-react";
import GraficoDinamico from "./graficoDinamico";
import { useEffect, useState } from "react";
import ModalComponente from "@/components/Modal/ModalComponente";
import { listarCfgDashboard } from "@/requests/CRM/Dashboard/listarDashboard";
import pie from "@/public/images/charts/PieChart.png";
import bar from "@/public/images/charts/BarChart.png";
import line from "@/public/images/charts/LineChart.png";
import Image from "next/image";

const dadosClienteChart = [{ nome: "Origem", coluna: "origem_cliente" }];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dadoEscolhido, setDadoEscolhido] = useState("");
  const [graficoEscolhido, setGraficoEscolhido] = useState();
  const [cfgDashboard, setCfgDashboard] = useState<any[]>([]);
  useEffect(() => {
    listarCfgDashboard().then((res) => {
      setCfgDashboard(res);
    });
  }, []);
  return (
    <>
      <Breadcrumb pageName="Dashboard" />
      <div className="flex justify-end">
        <button
          onClick={() => setModalOpen(!modalOpen)}
          className="bg-primary flex items-center gap-2 rounded-md px-2 text-white p-1"
          type="button"
        >
          <BarChart3 size={17} />
          Adicionar Gráfico
        </button>
      </div>
      <ModalComponente
        hasSaveButton={false}
        opened={modalOpen}
        onClose={() => setModalOpen(!modalOpen)}
        size="lg"
      >
        <div className="flex items-center">
          <aside className="w-full grid  grid-cols-3 gap-y-2">
            {cfgDashboard &&
              cfgDashboard.map((cfg_dash, index) => (
                <div key={index} className="flex flex-col">
                  <Image
                    className="w-34 h-34  hover:bg-stroke p-1 self-center rounded-md hover:-translate-y-2 transition-all"
                    onClick={() =>
                      setGraficoEscolhido(cfg_dash.tipo_cfg_dashboard)
                    }
                    src={
                      cfg_dash.tipo_cfg_dashboard === "pie"
                        ? pie
                        : cfg_dash.tipo_cfg_dashboard === "bar"
                        ? bar
                        : line
                    }
                    alt=""
                  />

                  <p className="text-center">{cfg_dash.nome_cfg_dashboard}</p>
                </div>
              ))}
          </aside>
          <aside className="w-1/4 flex flex-col gap-1  justify-end">
            <p className="text-center font-medium text-lg">Dados clientes</p>
            {dadosClienteChart.map((dado, index) => (
              <span
                onClick={() => setDadoEscolhido(dado.coluna)}
                key={index}
                className={`text-center cursor-pointer ${
                  dado.coluna === dadoEscolhido && "bg-primary text-white"
                } hover:bg-stroke rounded`}
              >
                {dado.nome}
              </span>
            ))}
          </aside>
        </div>
      </ModalComponente>
      <GraficoDinamico tipoGrafico={graficoEscolhido} />
      <Dashboard />
    </>
  );
}
