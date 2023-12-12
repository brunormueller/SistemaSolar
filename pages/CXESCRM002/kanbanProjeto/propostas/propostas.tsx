import Button from "@/components/Forms/Button";
import ColetaDados from "@/pages/CXESCRM005";
import { enviarLinkProposta } from "@/requests/CRM/enviarProposta";
// import { listarPropostas } from "@/requests/CRUD/Propostas/listarPropostas";
import { listarPropostas } from "@/requests/CRUD/Propostas/listarPropostas";
import { ArrowLeft, Download, FilePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { BiLogoWhatsapp } from "react-icons/bi";
import Swal from "sweetalert2";
import { Combobox } from "./combobox";
import { DatePickerWithRange } from "./filtroData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const options = [
  {
    value: "0",
    label: "Aguardando Aprovação",
  },
  {
    value: "1",
    label: "Aprovada",
  },
  {
    value: "3",
    label: "Cancelada",
  },
  {
    value: "2",
    label: "Reprovada",
  },
];
const PropostasTab = ({ dadosCliente, dadosCard }: any) => {
  const [propostas, setPropostas] = useState<any[]>([]);
  const [view, setView] = useState("Propostas");
  const [statusPropostas, setStatusPropostas] = useState<string>("");
  const idColeta = dadosCard.id_coleta_cliente;
  useEffect(() => {
    console.log(dadosCard);
    buscaPropostas();
  }, []);
  const buscaPropostas = () => {
    listarPropostas(dadosCard.id_cliente).then((res) => {
      setPropostas(res);
    });
  };
  const statusProposta = [
    { name: "Aguardando Aprovação", color: "bg-[#619ce8]", value: "0" },
    { name: "Aprovada", color: "bg-[#07b51c]", value: "1" },
    { name: "Inativa", color: "bg-[#8d968e]", value: "2" },
    { name: "Cancelada", color: "bg-[#b5071e]", value: "3" },
  ];

  const handleChange = (status: any) => {
    if (statusPropostas === status) {
      setStatusPropostas("");
    } else {
      setStatusPropostas(status);
    }
  };
  const enviarLink = (data: any) => {
    enviarLinkProposta(data).then((e) => {
      window.open(e["Whatsapp"]);
    });
  };
  const filteredPropostas =
    statusPropostas !== ""
      ? propostas.filter(
          (proposta) => proposta.status_proposta === statusPropostas
        )
      : propostas;
  return (
    <div className="flex flex-col">
      <div className="flex justify-start">
        <Button
          type="button"
          onClick={() => {
            buscaPropostas();
            setView("Propostas");
          }}
          className={`w-fit h-fit mb-2 px-8 gap-2 ${
            view === "Propostas" ? "hidden" : "flex"
          } items-center`}
        >
          <ArrowLeft size={18} />
          Voltar
        </Button>
      </div>
      {view === "Propostas" ? (
        <>
          <div className="flex justify-end">
            <Button
              onClick={() => setView("NovaProposta")}
              className="w-fit px-8 gap-2 flex items-center "
            >
              <FilePlus size={18} />
              Nova Proposta
            </Button>
          </div>
          <div className="bg-white w-full h-11 gap-4 items-center p-7 flex rounded-md my-2">
            <input
              placeholder="Procure por aqui..."
              className="rounded-[6px] border-[1px] font-medium p-2 pl-3 text-[#71717A] w-full text-sm border-[#E4E4E7]"
              type="text"
            />
            <Combobox
              handleChange={handleChange}
              placeholder="Selecione um status"
              options={options}
            />
            <DatePickerWithRange />
          </div>
          {filteredPropostas.map((proposta, index) => {
            console.log(proposta);

            return (
              <div
                key={index}
                className="bg-white flex w-full justify-between rounded-md my-2"
              >
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="p-0">
                      <div className="p-3 text-start">
                        <p className="text-sm">
                          Proposta Nº {proposta.id_proposta}
                        </p>
                        <p className="text-sm font-medium">
                          Revisão {proposta.revisao_proposta}
                        </p>
                        <p className="font-semibold">Proposta comercial</p>
                        <span>
                          Quantidade de módulos: {proposta.qtdModulos1_proposta}
                        </span>
                      </div>
                      <div className="flex flex-col ">
                        {statusProposta.map(
                          (status, statusIndex) =>
                            proposta.status_proposta === status.value && (
                              <>
                                <div key={statusIndex} className="grid gap-5">
                                  <div className=" rounded-bl-xl text-white font-medium rounded-tr-md gap-2  flex items-center h-fit justify-center bg-[#000]">
                                    <span
                                      className={`w-2 h-2 ${status.color} rounded-full ml-2`}
                                    ></span>
                                    <p className="mr-2">{status.name}</p>
                                  </div>

                                  <div className="rounded-sm gap-6 flex items-center h-fit justify-center mb-2 mr-2">
                                    <Download color="#5193fc" size={17} />

                                    <Button
                                      type="button"
                                      className={`bg-transparent   text-[green] ${
                                        +status.value == 0 ? "flex" : "hidden"
                                      } items-center rounded-md p-0 m-0 h-fit`}
                                      onClick={() => {
                                        const dados = {
                                          caminho_proposta:
                                            proposta.caminho_proposta,
                                          aprovacao_cliente:
                                            proposta.aprovacao_cliente,
                                          coleta_proposta:
                                            proposta.coleta_proposta,
                                          id_proposta: proposta.id_proposta,
                                          status_proposta:
                                            proposta.status_proposta,
                                          id_cliente: proposta.cliente_proposta,
                                        };

                                        Swal.fire({
                                          icon: "question",
                                          title: "Confirmação",
                                          html: `
                                    Tem certeza que deseja  <b>Enviar</b> a proposta?`,
                                          showDenyButton: true,
                                          confirmButtonText: "Sim",
                                          denyButtonText: `Não`,
                                        }).then((result) => {
                                          if (result.isConfirmed) {
                                            enviarLink(dados);
                                            Swal.fire({
                                              title: "Sucesso",
                                              html: "Em breve você sera redirecionado!",
                                              didOpen: () => {
                                                Swal.showLoading();
                                              },
                                              timer: 6700,
                                            }).then((result) => {
                                              /* Read more about handling dismissals below */
                                              if (
                                                result.dismiss ===
                                                Swal.DismissReason.timer
                                              ) {
                                              }
                                            });
                                          }
                                        });
                                      }}
                                    >
                                      <BiLogoWhatsapp size={24} />
                                    </Button>
                                    <p>{proposta.data_proposta}</p>
                                  </div>
                                </div>
                              </>
                            )
                        )}
                        <p className="text-lg p-1 font-medium">
                          R${" "}
                          {Number(proposta.valorTotal_proposta).toLocaleString(
                            "pt-BR",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-stroke shadow-lg">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam vehicula sapien vitae lectus accumsan, in tincidunt
                      urna ultrices. nisl, quis aliquet nisl tellus a libero
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            );
          })}
        </>
      ) : (
        <ColetaDados
          inCard={true}
          idColeta={idColeta}
          dadosCliente={dadosCliente}
        />
      )}
    </div>
  );
};

export default PropostasTab;
