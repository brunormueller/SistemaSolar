import Container from "@/components/Forms/Container";
import ModalComponente from "@/components/Modal/ModalComponente";
import {
  // GravaLogAgenda,
  apagarAgendamento,
  cadastrarAgendamento,
  editarAgendamento,
  listarAgendamentos,
  listarUsuario,
} from "@/requests/CRM/agenda";
import { useAuth } from "@/src/contexts/authContext";
import { GetForm } from "@/utils";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import * as yup from "yup";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import InputGroup from "../../components/Forms/InputGroup";
import InputSelectComponent from "../../components/Forms/InputSelect";
import EditDateScheduler from "./modalEditDateScheduler";
import NewDateScheduler from "./modalNewDateScheduler";
import { values } from "lodash";
import DialogAlert from "@/components/Alerts/dialogAlert";
import { log } from "console";

const Calendar = ({ onSubmitFunction }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalAlert, setOpenModalAlert] = useState(false);

  const [formValues, setFormValues] = useState({
    urgencia: "",
    id_cliente: "",
    diaAtividade: "",
    horaAtividade: "",
    datafim: "",
    horafim: "",
    tipoAtv: "",
  });

  const [valuesForm, setValues] = useState({
    urgencia: "",
    id_cliente: "",
    tipoAtv: "",
  });

  const [agendamento, setAgendamento] = useState<any[]>([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const { logout, valuesSession } = useAuth();
  const { session } = valuesSession();
  const id_usuario = session.id_usuario;
  const perfil_usuario = session.perfil_usuario;

  const [usuario, setUsuario] = useState<any[]>([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<any>(id_usuario);
  const [modalType, setModalType] = useState("");
  const [selectedTaskData, setSelectedTaskData] = useState<any>(null);
  const [yupSchema, setYupSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));
  const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

  useEffect(() => {
    listarUsuario().then((e: any) => {
      setUsuario(e);
    });
    getEvents();
  }, []);

  console.log(perfil_usuario);
  const getEvents = async () => {
    const res = await listarAgendamentos(usuarioSelecionado || id_usuario);
    console.log(res);
    console.log(usuarioSelecionado);
    const eventosFormatados = res.map((evento: any) => ({
      title: evento.descricao_agendamento,
      start:
        evento.dt_inicio_agendamento +
        (evento.hora_inicio_agendamento
          ? "T" + evento.hora_inicio_agendamento
          : ""),
      end: evento.dt_fim_agendamento,
      data: evento,
      onclick: handleclickTask,
    }));
    setAgendamento(eventosFormatados);
  };

  const handleclickTask = (data: any) => {
    data = { ...data, id_usuario };
    console.log(data);
    console.log(id_usuario);
  };

  const handleDataClick = (info: any) => {
    if (info.event) {
      setModalType("Editar Agendamento");
      setSelectedTaskData(info.event.extendedProps.data);
    } else {
      Object.keys(valuesForm).map((values: any) => {
        formEvent.setValue(values as never, "" as never);
      });

      setModalType("Novo Agendamento");
    }
    setOpenModal(true);
    setSelectedDateTime(info.date || info.event.start);
  };

  const handleCadastrar = (data: any) => {
    console.log("data", data);
    const dados = {
      data,
      id_usuario,
      usuarioSelecionado,
    };
    cadastrarAgendamento(dados).then((res: any) => {
      console.log(res);

      setValues({
        urgencia: "",
        id_cliente: "",
        tipoAtv: "",
      });

      // Feche o modal
      setOpenModal(false);
      getEvents();
    });
    console.log("dados:", dados);

    // GravaLogAgenda(dados).then((response: any) => {
    //   console.log(response);
    // });
  };

  const handleEditar = (data: any) => {
    // console.log(selectedTaskData.id_agendamento);
    const dados = {
      data,
      id_usuario,
      id_agendamento: selectedTaskData.id_agendamento,
    };
    editarAgendamento(dados).then((res: any) => {
      console.log(res);

      setFormValues({
        urgencia: "",
        id_cliente: "",
        diaAtividade: "",
        horaAtividade: "",
        datafim: "",
        horafim: "",
        tipoAtv: "",
      });
      setOpenModal(true);
      console.log(data);

      // Feche o modal
      setOpenModal(false);
      getEvents();
    });
  };

  // const simulaClique = () => {
  //   const todayButton = document.querySelector(".fc-today-button");

  //   if (todayButton) {
  //     todayButton.click();
  //   }
  // };

  const handleApagar = (data: any) => {
    console.log(selectedTaskData.id_agendamento);

    const dados = {
      data,
      id_usuario,
      id_agendamento: selectedTaskData.id_agendamento,
    };
    apagarAgendamento(dados).then((res: any) => {
      console.log(res);

      setOpenModalAlert(true);
      console.log(data);

      // Feche o modal
      setOpenModalAlert(false);
      setOpenModal(false);
      getEvents();
    });
  };

  const [eventSchema, setEventSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));
  const { ...formEvent } = GetForm(eventSchema, setEventSchema);

  return (
    <>
      <Breadcrumb pageName="Agendamento" />

      {perfil_usuario === "1" || perfil_usuario === "1000" ? (
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <InputGroup>
            <InputSelectComponent
              name="usuarios_agendamento"
              label="Usuario"
              defaultValue={usuarioSelecionado}
              formulario={form}
              width="xl:w-1/1"
              onChange={(e: any) => {
                setUsuarioSelecionado(e.value);
              }}
              options={usuario.map((res: any) => ({
                value: res.id_usuario,
                label: res.nome_usuario,
              }))}
              error="Preencha o Campo"
              required
            />
            <button
              type="button"
              className="w-full xl:w-1/6 h-[2.8rem] mt-8.5 rounded bg-success p-3 font-medium text-gray"
              onClick={() => getEvents()}
            >
              Filtrar
            </button>
          </InputGroup>
        </form>
      ) : null}

      <br />

      {/* <button type="button" onClick={simulaClique}>
        Teste botão
      </button> */}
      <Container>
        <div className="z-0 relative">
          <FullCalendar
            events={agendamento}
            locale="pt-br"
            droppable={true}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={"dayGridMonth"}
            headerToolbar={{
              start: "dayGridMonth,timeGridWeek,timeGridDay",
              center: "title",
              end: "today prev,next",
            }}
            eventBackgroundColor="blue"
            buttonText={{
              today: "Hoje",
              month: "Mês",
              week: "Semana",
              day: "Dia",
            }}
            height={"90vh"}
            dateClick={handleDataClick}
            eventClick={handleDataClick}
            // datesSet={simulaClique}
          />
        </div>
      </Container>
      {modalType === "Novo Agendamento" && (
        <ModalComponente
          saved={formEvent.handleSubmit(handleCadastrar)}
          size="md"
          opened={openModal}
          // typeButton="submit"
          onClose={() => setOpenModal(!openModal)}
          header="Novo Agendamento"
        >
          <button></button>
          <NewDateScheduler
            selectedDateTime={selectedDateTime}
            form={formEvent}
          />
        </ModalComponente>
      )}

      {modalType === "Editar Agendamento" && (
        <ModalComponente
          size="md"
          opened={openModal}
          saved={formEvent.handleSubmit(handleEditar)}
          hasDenyButton={true}
          denyButtonText="Deletar"
          onDeny={() => setOpenModalAlert(!openModalAlert)}
          onClose={() => setOpenModal(!openModal)}
          header="Editar Agendamento"
        >
          <DialogAlert
            title="Deseja excluir esse Agendamento?"
            tipo="warning"
            open={openModalAlert}
            onSave={formEvent.handleSubmit(handleApagar)}
            onClose={() => setOpenModalAlert(!openModalAlert)}
          />
          <EditDateScheduler
            selectedDateTime={selectedDateTime}
            form={formEvent}
            taskData={selectedTaskData}
          />
        </ModalComponente>
      )}
    </>
  );
};

export default Calendar;
