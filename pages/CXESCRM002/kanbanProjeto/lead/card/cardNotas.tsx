import Button from "@/components/Forms/Button";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import ModalComponente from "@/components/Modal/ModalComponente";
import { cadastroNotasCard } from "@/requests/CRM/notas";
import { Plus } from "lucide-react";
import { Fragment, useState } from "react";
import NovaAtividadeCard from "../modal/novaAtividade";

const CardNotas = ({ form, dataCard }: any) => {
  const [notas, setNotas] = useState("");
  const [openModalAtividade, setOpenModalAtividade] = useState(false);

  const cadastroNota = (e: any) => {
    e.preventDefault();

    const { notas } = form.control._formValues;
    const idCard = dataCard.id;
    const data = { notas, idCard };
    cadastroNotasCard(data);
    setNotas("");
  };
  const [tab, setTab] = useState("Nota");
  const nomeTabs = ["Agendamentos", "Nota"];

  const dados = [
    { label: "Dias aberto", value: 3 },
    { label: "Visualizações", value: 1 },
    { label: "Propostas", value: 1 },
    { label: "Validade", value: "23/07" },
  ];
  const handleNovaAtividade = () => {
    setOpenModalAtividade(!openModalAtividade);
  };
  const handleCadastraAgendamento = () => {
    console.log(form);

    // const id_card = dadosCard.id;
    // const id_cliente = dadosCliente.id_cliente;
    // const usuarioSelecionado = session.id_usuario;
    // const origem = "card";
    // const dados = { data, id_cliente, usuarioSelecionado, id_card, origem };

    // cadastrarAgendamento(dados).then((res) => {
    //   if (res) handleNovaAtividade();
    // });
  };
  return (
    <div className="grid xl:flex xl:flex-col outline-none border-none  w-full items-center gap-4 xl:-z-1  xl:fixed lg:xl:w-[95%] h-auto">
      <div className="grid grid-cols-4 xl:w-1/2 w-full  xl:gap-12 shadow-sm xl:shadow-xl bg-white rounded-md p-3 h-19">
        {dados.map((dado, index) => (
          <div key={index} className="grid text-center">
            <span className="font-medium lg:text-base justify-center flex text-sm text-primary">
              {dado.value}
            </span>
            <span className="lg:text-sm text-xs flex justify-center flex-wrap">
              {dado.label}
            </span>
          </div>
        ))}
      </div>
      <div className="grid xl:w-1/2 gap-3 w-full bg-white p-3 h-full shadow-sm xl:shadow-xl rounded-md ">
        <div className="flex justify-center h-7   xl:mb-2  mb-5 gap-5 px-5">
          <ul className="grid w-full lg:w-min">
            <div className="flex">
              {nomeTabs.map((tabName, index) => (
                <li
                  key={index}
                  onClick={() => setTab(tabName)}
                  className={`font-medium cursor-pointer lg:text-base items-center flex justify-center transition-all ease-linear  text-sm  mb-0 w-full lg:w-60 text-center
                  ${tab === tabName ? "" : "border-b-2 border-stroke"} `}
                >
                  {tabName}
                </li>
              ))}
            </div>
            <li
              className={`bg-primary  h-[2px] w-1/2 -translate-y-[2px] transition-all ease-linear duration-150 ${
                tab === "Agendamentos" ? "" : "translate-x-full"
              }`}
              role="presentation"
            ></li>
          </ul>
        </div>
        {tab === "Agendamentos" ? (
          <div className="h-59">
            <div
              onClick={handleNovaAtividade}
              className="grid h-fit cursor-pointer xl:w-44 w-full hover:brightness-90 z-9999999 bg-primary shadow-sm p-2 rounded-md "
            >
              <div className="flex px-2 items-center justify-between">
                <div className="flex  gap-2 items-center">
                  <span className="font-medium text-sm text-white">
                    Novo agendamento
                  </span>
                </div>
                <div className="flex h-fit gap-1">
                  <Plus size={16} color="white" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 h-4/5 overflow-auto mt-3">
              {Array.from({ length: 30 }, (_, index) => (
                <div
                  key={index}
                  className="flex flex-col px-2 bg-primary hover:bg-opacity-80 transition-all cursor-pointer text-sm text-white bg-opacity-60 shadow-md rounded-sm justify-center"
                >
                  07/01 - 16:00
                  <span>Este é o assunto.</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Fragment>
            <Input
              onChange={(e) => setNotas(e.target.value)}
              defaultValue={notas}
              id="notas"
              formulario={form}
              name="notas"
              rows={7}
              type="textarea"
            />

            <div className="flex text-sm mt-2 h-fit justify-end w-full ">
              <Button
                type="submit"
                onClick={cadastroNota}
                className="px-4 xl:w-fit w-full py-1"
              >
                Salvar
              </Button>
            </div>
          </Fragment>
        )}
        <ModalComponente
          saved={handleCadastraAgendamento}
          size="md"
          opened={openModalAtividade}
          onClose={handleNovaAtividade}
        >
          <NovaAtividadeCard form={form} />
        </ModalComponente>
      </div>
    </div>
  );
};

export default CardNotas;
