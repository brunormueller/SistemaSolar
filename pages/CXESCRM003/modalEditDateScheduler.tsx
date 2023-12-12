import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarClientesConsulta } from "@/requests/CRUD/Cliente/listarClientes";
import { useAuth } from "@/src/contexts/authContext";
import { format } from "date-fns";
// import DialogAlert from "@/components/Alerts/dialogAlert";

import { useEffect, useState } from "react";
import DeleteDateScheduler from "./modalDeleteDataScheduler";
import { dialog } from "@material-tailwind/react";
import { parseISO } from "date-fns";
import DialogAlert from "@/components/Alerts/dialogAlert";
import NewDateScheduler from "@/components/Calender/modalNewDateScheduler";
const EditDateScheduler = ({ form, selectedDateTime, taskData }: any) => {
  const [isDiaTodo, setIsDiaTodo] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [cliente, setCliente] = useState([]);
  const { logout, valuesSession } = useAuth();

  const { session } = valuesSession();
  const id_usuario = session.id_usuario;
  const [usuario, setUsuario] = useState<any[]>([]);
  const [selectedTaskData, setSelectedTaskData] = useState(null);

  const [openModalAlert, setOpenModalAlert] = useState(false);
  const [modalData, setModalData] = useState(null);

  const arrayOrigem = [
    { value: "1", label: "Baixa" },
    { value: "2", label: "Média" },
    { value: "3", label: "Alta" },
  ];

  useEffect(() => {
    const buscarCliente = async () => {
      try {
        const response = await listarClientesConsulta();
        const clientesNumerico = response.map((cliente: any) => ({
          value: cliente.id_cliente,
          label: cliente.nome_cliente,
        }));
        setCliente(clientesNumerico);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    buscarCliente();
  }, []);

  console.log("console das tarefas:", taskData);
  console.log("console das selectedDateTime:", selectedDateTime);

  return (
    <>
      <div className="flex flex-col gap-2 ">
        <InputGroup>
          {taskData && (
            <InputSelectComponent
              formulario={form}
              name="urgencia"
              label="Urgência"
              error="Preencha a Urgência"
              width="xl:w-1/1"
              options={arrayOrigem}
              defaultValue={taskData.urgencia_agendamento}
            />
          )}

          {taskData && (
            <InputSelectComponent
              formulario={form}
              name="id_cliente"
              label="Cliente"
              error="Preencha o Cliente"
              width="xl:w-1/1"
              options={cliente}
              defaultValue={taskData.cod_cliente}
            />
          )}
        </InputGroup>

        <InputGroup className="items-center">
          {taskData && (
            <Input
              formulario={form}
              label="Data Inicio"
              mascara="data"
              name="diaAtividade"
              defaultValue={format(selectedDateTime, "dd/MM/yyyy")}
            />
          )}

          {taskData && (
            <Input
              formulario={form}
              label="Hora Inicio"
              type="time"
              name="horaAtividade"
              defaultValue={format(selectedDateTime, "HH:mm:ss")}
            />
          )}
        </InputGroup>

        <InputGroup className="items-center ">
          <>
            {taskData && (
              <Input
                formulario={form}
                name="datafim"
                label="Data Fim"
                error="Preencha a data"
                width="xl:w-1/1"
                mascara="data"
                defaultValue={
                  taskData.dt_fim_agendamento &&
                  format(parseISO(taskData.dt_fim_agendamento), "dd/MM/yyyy")
                }
              />
            )}

            {taskData && (
              <Input
                formulario={form}
                name="horafim"
                type="time"
                label="Hora Fim"
                error="Preencha a hora"
                width="xl:w-1/1"
                defaultValue={taskData.hora_fim_agendamento}
              />
            )}
          </>
        </InputGroup>

        {taskData && (
          <Input
            formulario={form}
            type="textarea"
            label="Descrição"
            name="tipoAtv"
            defaultValue={taskData.descricao_agendamento}
          />
        )}
      </div>
    </>
  );
};

export default EditDateScheduler;
