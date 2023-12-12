import ModalComponente from "@/components/Modal/ModalComponente";
import { cadastrarAgendamento } from "@/requests/CRM/agenda";
import { editarCliente } from "@/requests/CRUD/Cliente/editarCliente";
import { useAuth } from "@/src/contexts/authContext";
import { GetForm } from "@/utils";
import { Pen, Plus, User } from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { FieldValues } from "react-hook-form";
import { BsWhatsapp } from "react-icons/bs";
import * as yup from "yup";
import EdicaoClienteCard from "../modal/edicaoCliente";
import NovaAtividadeCard from "../modal/novaAtividade";

const CardInfoCliente = ({ dadosCard, dadosCliente, updateDados }: any) => {
  const { logout, valuesSession } = useAuth();
  const { session } = valuesSession();
  const [yupSchema, setYupSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));
  const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);
  const [openModalAtividade, setOpenModalAtividade] = useState(false);
  const [openModalEditCliente, setOpenModalEditCliente] = useState(false);
  const telefoneFormatado = dadosCliente?.telefone1_cliente?.replace(
    /[\(\)\-\s]/g,
    ""
  );

  const campos = [
    { campo: "Valor:", valor: "-", tipo: "input" },
    { campo: "E-mail:", valor: dadosCliente?.email_cliente, tipo: "input" },
    { campo: "CPF:", valor: dadosCliente?.cpfcnpj_cliente, tipo: "input" },
    {
      campo: "Cidade:",
      valor: dadosCliente?.cidade_cliente + "-" + dadosCliente?.estado_cliente,
      tipo: "select",
    },
    { campo: "Endereço:", valor: dadosCliente?.rua_cliente, tipo: "input" },
    {
      campo: "Origem:",
      valor: dadosCliente?.origem_cliente,
      tipo: "select",
    },
    { campo: "Propostas:", valor: "0" },
    { campo: "Notas:", valor: "0" },
  ];
  const handleNovaAtividade = () => {
    setOpenModalAtividade(!openModalAtividade);
  };
  const handleCadastraAgendamento = (data: FieldValues) => {
    const id_card = dadosCard.id;
    const id_cliente = dadosCliente.id_cliente;
    const usuarioSelecionado = session.id_usuario;
    const origem = "card";
    const dados = { data, id_cliente, usuarioSelecionado, id_card, origem };

    cadastrarAgendamento(dados).then((res) => {
      if (res) handleNovaAtividade();
    });
  };
  const handleEdicaoCliente = (data: FieldValues) => {
    const id_card = dadosCard.id;
    const id_cliente = dadosCliente.id_cliente;
    const id_usuario = session.id_usuario;
    const dados = { data, id_cliente, id_usuario, id_card };

    editarCliente(dados).then((res) => {
      setOpenModalEditCliente(!openModalEditCliente);
      updateDados(true);
    });
  };
  return (
    <Fragment>
      <div className="grid gap-2">
        <div className="grid xl:w-64 w-full transition-all ease-linear z-9999 ficaComOScroll shadow-sm xl:shadow-sm h-full  bg-white rounded-md p-3 pt-2 ">
          <div className="flex justify-end">
            <div
              onClick={() => setOpenModalEditCliente(!openModalEditCliente)}
              className="w-fit p-1 rounded-sm cursor-pointer hover:bg-stroke"
            >
              <Pen size={14} />
            </div>
          </div>
          <div className="flex items-center mb-3 border-b-2 pb-3 gap-2 justify-center">
            <User size={40} className="bg-stroke rounded-md p-1" />
            <div className="grid">
              <span className="text-center font-medium">
                {dadosCliente.nome_cliente}
              </span>
              <Link target="_blank" href={`https://wa.me/${telefoneFormatado}`}>
                <span
                  title="Enviar Whatsapp"
                  className="text-center items-center flex gap-2 pl-2 text-success cursor-pointer text-sm"
                >
                  <BsWhatsapp />
                  {dadosCliente.telefone1_cliente}
                </span>
              </Link>
            </div>
          </div>
          {campos.map((campo, index) => (
            <div key={index} className="flex flex-wrap gap-2  py-1">
              <aside className="text-sm my-[1px] w-fit text-black">
                {campo.campo}
              </aside>
              <aside className="text-sm my-[1px] m-0 w-fit">
                {campo.valor}
              </aside>
            </div>
          ))}
        </div>
        {/* <div
          onClick={handleNovaAtividade}
          className="grid h-fit ficaComOScroll  cursor-pointer xl:w-64 w-full hover:brightness-90 z-9999999 bg-primary shadow-sm xl:shadow-xl p-3 rounded-md "
        >
          <div className="flex px-2 items-center justify-between">
            <div className="flex  gap-2 items-center">
              <span className="font-medium text-white">Nova atividade</span>
            </div>
            <div className="flex h-fit gap-1">
              <Plus color="white" />
            </div>
          </div>
        </div> */}
        <ModalComponente
          saved={handleSubmit(handleCadastraAgendamento)}
          size="md"
          opened={openModalAtividade}
          onClose={handleNovaAtividade}
        >
          <NovaAtividadeCard form={form} />
        </ModalComponente>
        <ModalComponente
          saved={handleSubmit(handleEdicaoCliente)}
          size="md"
          header={`Edição de ${dadosCliente.nome_cliente}`}
          opened={openModalEditCliente}
          onClose={() => setOpenModalEditCliente(!openModalEditCliente)}
        >
          <EdicaoClienteCard form={form} dadosCliente={dadosCliente} />
        </ModalComponente>
      </div>
    </Fragment>
  );
};

export default CardInfoCliente;
