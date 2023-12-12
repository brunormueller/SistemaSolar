import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import InputGroup from "../../components/Forms/InputGroup";
import InputSelectComponent from "../../components/Forms/InputSelect";
import ModalComponente from "../../components/Modal/ModalComponente";
import NewDateScheduler from "./modalNewDateScheduler";
import { GetForm } from "@/utils";
import * as yup from "yup";
import { listarAgendamentos } from "@/requests/CRM/agenda";

const Calendar = ({ onSubmitFunction }: any) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [test, setTest] = useState(dates(new Date()));
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalContent, setModalContent] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);
  const [haTask, setHaTask] = useState(false);
  const [viewType, setViewType] = useState("mes");
  const [agendamento, setAgendamento] = useState<any[]>([]);
  // const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // const buscarcarUsuario = async () => {
    //     try {
    //         const response = await listarUsuario();
    //         setUsuarios(response.body.usuarios);
    //         console.log(response);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // buscarcarUsuario();
    // const listaAgendamento = async () => {
    // listarAgendamentos().then((res) => {
    //   setAgendamento(res);
    // });
    // };
    // listaAgendamento();
    // setUsuarios(response.body.usuarios);
  }, []);

  const tasks = [
    {
      text: "Limpeza placa solar",
      day: 31,
      hour: 8,
      color: "bg-danger",
      urgency: "Alta",
    },
    {
      text: "Venda proposta para incluir ao cliente Customax",
      day: 8,
      hour: 10,
      color: "bg-warning",
      urgency: "Média",
    },
    {
      text: "Venda proposta para incluir ao cliente Customax",
      day: 8,
      hour: 10,
      color: "bg-success",
      urgency: "Média",
    },
    { text: "Task 3", day: 10, hour: 8, color: "bg-success", urgency: "Baixa" },
    {
      text: "Gerar uma Proposta",
      day: 31,
      hour: 4,
      color: "bg-success",
      urgency: "Baixa",
    },
    // Add more tasks as needed
  ];

  const diasSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  function dates(current: any) {
    var week = new Array();
    // Starting Monday not Sunday
    current.setDate(current.getDate() - current.getDay() + 1);

    for (var i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return week;
  }

  const getFirstDayOfMonth = () => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
  };

  const getLastDayOfPreviousMonth = () => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = getFirstDayOfMonth();
  const lastDayOfPreviousMonth = getLastDayOfPreviousMonth();

  const handleTaskClick = (task: any) => {
    setSelectedDay(task.day);
    setOpenModal(true);
    setModalContent(task);
    setHaTask(true);
  };

  const handleTaskItemClick = (event: React.MouseEvent, task: any) => {
    event.stopPropagation(); // Impede a propagação do evento para o elemento pai
    handleTaskClick(task);
  };

  const handleCellClick = (day: any, hour: any) => {
    setOpenModal(!openModal);

    setSelectedHour(hour);
    setSelectedDay(day);

    setHaTask(false);
  };
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const renderTableCell = (day: any) => {
    const hj = new Date();
    const diaAtual = hj.getDate();
    const year = hj.getFullYear();
    const month = hj.getMonth();
    const fullDate = new Date(year, month, parseInt(day, 10));

    let bgCurrentDay = false;
    if (parseInt(day, 10) === diaAtual) {
      bgCurrentDay = true;
    }

    const formattedDateString = fullDate.toLocaleDateString("pt-BR");

    return (
      <td
        key={day}
        onClick={() => handleCellClick(fullDate, 0)}
        className={`ease relative h-20 cursor-pointer border ${
          bgCurrentDay ? "bg-[#587efc]" : "hover:bg-gray"
        } border-stroke p-2 transition duration-500  dark:border-strokedark dark:hover-bg-meta-4 md:h-25  xl:h-31`}
      >
        <span
          className={`font-medium  dark:text-white grid ${
            bgCurrentDay ? "text-stroke" : "text-black"
          }`}
        >
          {day}
          <div className="flex gap-1 flex-wrap w-full">
            {agendamento.map((item, index) => {
              const data = item.dt_inicio_agendamento;
              const data_brasileira = data.split("-").reverse().join("/");

              if (data_brasileira === formattedDateString) {
                return (
                  <span
                    key={index}
                    className={` text-white h-fit px-3 text-xs rounded-sm  cursor-pointer`}
                    onClick={(event) => handleTaskItemClick(event, item)}
                  >
                    {truncateText(item.descricao_agendamento, 7)}
                  </span>
                );
              }

              return null; // Return null if no JSX should be rendered for this item
            })}
          </div>
        </span>
      </td>
    );
  };

  const renderTableHeader = () => {
    const hj = new Date();
    const diaAtual = hj.getDate();

    return (
      <thead>
        <tr
          className={`rounded-t-sm text-black grid ${
            viewType === "mes" ? "grid-cols-7" : "grid-cols-8 border-b"
          }`}
        >
          {viewType === "mes" ? (
            diasSemana.map((day, index) => (
              <th
                key={index}
                className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm-text-base xl-p-5"
              >
                <span className="lg-block">{day}</span>
                <span className="block lg:hidden">{day.slice(0, 3)}</span>
              </th>
            ))
          ) : (
            <>
              <th className="h-15 items-center justify-center p-1 text-xs font-semibold sm-text-base xl-p-5" />
              {test.map((day, index) => (
                <th
                  key={index}
                  className={`flex h-15 items-center ${
                    day.getDate() === diaAtual
                      ? "bg-[#587efc] text-white"
                      : "bg-white"
                  } justify-center p-1 text-xs font-semibold sm-text-base xl-p-5`}
                >
                  <span className="lg-block">
                    {diasSemana[day.getDay()].slice(0, 3)}
                    {". "}
                    <span className="text-lg">{day.getDate()}</span>
                  </span>
                  <span className="block lg:hidden">
                    {diasSemana[day.getDay()].slice(0, 3)} {day.getDate()}
                  </span>
                </th>
              ))}
            </>
          )}
        </tr>
      </thead>
    );
  };

  const renderTableHeader2 = () => {
    const hj = new Date();
    const diaAtual = hj.getDate();
    const mesAtual = hj.getMonth() + 1;
    const diaSemana = hj.toLocaleDateString("pt-BR", { weekday: "long" }); // Obtém o dia da semana
    return (
      <thead>
        <tr
          className={`rounded-t-sm text-black grid ${
            viewType === "mes" ? "grid-cols-7" : "grid-cols-1 border-b" // Alterado para uma única coluna
          }`}
        >
          <th
            className={`flex h-15 items-center justify-center p-1 text-base font-semibold sm-text-base xl-p-5 bg-[#587efc] text-white`}
          >
            <span className="lg-block">
              {`${diaSemana}, ${diaAtual}/${mesAtual}`}
            </span>
            <span className="block lg:hidden">
              {`${diaAtual}/${mesAtual}`}{" "}
            </span>
          </th>
        </tr>
      </thead>
    );
  };

  const renderWeekViewCells = () => {
    const hj = new Date();
    const diaAtual = hj.getDate();
    const year = hj.getFullYear();
    const month = hj.getMonth();
    const fullDate = new Date(year, month, diaAtual);

    const tableRows = [];
    for (let hour = 0; hour < 24; hour++) {
      tableRows.push(
        <tr key={hour} className="grid grid-cols-8">
          <td className="font-medium text-sm justify-center border-r flex text-black border-b border-stroke dark:text-white p-2">
            {hour < 10 ? `0${hour}:00` : `${hour}:00`}
          </td>

          {test.map((days, index) => {
            const formattedDateString = days.toLocaleDateString("pt-BR");
            return (
              <td
                key={index}
                onClick={() => handleCellClick(days, hour)}
                className="ease relative cursor-pointer border-b gap-1 border-r border-stroke p-1 flex flex-wrap max-w-full transition duration-500 hover:bg-gray dark:border-strokedark dark:hover-bg-meta-4"
              >
                {agendamento.map((item, index) => {
                  const data = item.dt_inicio_agendamento;
                  const hora = item.hora_inicio_agendamento;
                  const data_brasileira = data.split("-").reverse().join("/");
                  const horaAtualMinutos = hour * 60;

                  const horaDoBancoMinutos =
                    parseInt(hora.split(":")[0]) * 60 +
                    parseInt(hora.split(":")[1]);

                  if (
                    data_brasileira === formattedDateString &&
                    horaAtualMinutos === horaDoBancoMinutos
                  ) {
                    return (
                      <span
                        key={index}
                        className={` bg-danger text-white h-fit px-3 text-xs rounded-sm  cursor-pointer`}
                        onClick={() => handleTaskClick(item)}
                      >
                        {truncateText(item.descricao_agendamento, 7)}
                      </span>
                    );
                  }

                  return null; // Return null if no JSX should be rendered for this item
                })}
              </td>
            );
          })}
        </tr>
      );
    }
    return tableRows;
  };

  const renderDayViewCells = () => {
    const tableRows = [];

    const today = new Date();
    const day = new Date().toLocaleDateString("en-US");
    for (let hour = 0; hour < 24; hour++) {
      tableRows.push(
        <tr key={hour} className="flex ">
          <td className="font-medium text-sm justify-center border-r w-30 flex text-black border-b border-stroke dark:text-white p-2">
            {hour < 10 ? `0${hour}:00` : `${hour}:00`}
          </td>
          <td
            onClick={() => handleCellClick(day, hour)}
            className="ease relative cursor-pointer border-b w-full gap-1 border-r border-stroke p-1 flex flex-wrap  transition duration-500 hover:bg-gray dark:border-strokedark dark:hover-bg-meta-4"
          >
            {tasks.map(
              (task, taskIndex) =>
                today.getDate() === task.day &&
                hour === task.hour && (
                  <span
                    key={taskIndex}
                    className={`${task.color} text-white h-fit px-3 text-xs rounded-sm cursor-pointer`}
                    onClick={() => handleTaskClick(task)}
                  >
                    {task.text}
                  </span>
                )
            )}
          </td>
        </tr>
      );

      // Avance para a próxima hora
      today.setHours(today.getHours() + 1);
    }

    return tableRows;
  };

  const renderTableRows = () => {
    const tableRows = [];
    let weekStart = new Date(currentWeek);
    weekStart.setHours(0, 0, 0, 0);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Início da semana (domingo)
    let dayCounter = 1;
    if (viewType === "mes") {
      for (let i = 0; i < 6; i++) {
        if (dayCounter > daysInMonth) break;

        tableRows.push(
          <tr key={i} className="grid grid-cols-7">
            {Array.from({ length: 7 }, (_, index) => {
              if (i === 0 && index < firstDayOfMonth) {
                return renderTableCell(
                  lastDayOfPreviousMonth - firstDayOfMonth + 1 + index
                );
              } else if (dayCounter <= daysInMonth) {
                return renderTableCell(dayCounter++);
              }
              return null;
            })}
          </tr>
        );
      }
    } else if (viewType === "semana") {
      return renderWeekViewCells();
    } else if (viewType === "dia") {
      return renderDayViewCells();
    }

    return tableRows;
  };

  const goToNext = () => {
    if (viewType === "mes") {
      if (currentDate.getMonth() === 11) {
        setCurrentDate(new Date(currentDate.getFullYear() + 1, 0, 1));
      } else {
        setCurrentDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        );
      }
    } else {
      const nextWeek = new Date(currentWeek);
      nextWeek.setDate(currentWeek.getDate() + 7);
      setCurrentWeek(nextWeek);
    }
  };

  const goToPrevious = () => {
    if (viewType === "mes") {
      if (currentDate.getMonth() === 0) {
        setCurrentDate(new Date(currentDate.getFullYear() - 1, 11, 1));
      } else {
        setCurrentDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        );
      }
    } else {
      const previousWeek = new Date(currentWeek);
      previousWeek.setDate(currentWeek.getDate() - 7);
      setCurrentWeek(previousWeek);
    }
  };

  const toggleView = (viewTipo: string) => {
    setViewType(viewTipo);
  };

  const [yupSchema, setYupSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));
  const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

  return (
    <>
      <Breadcrumb pageName="Agendamento" />
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <InputGroup>
          <InputSelectComponent
            name="usuarios_agendamento"
            label="Usuários"
            formulario={form}
            width="xl:w-1/1"
            options={[
              { value: "Todos", label: "Todos" },
              { value: "Selecionados", label: "Selecionados" },
            ]}
            error="Preencha o Campo"
            required
          />

          <InputSelectComponent
            name="usuarios_agendamento"
            label="Selecionados"
            formulario={form}
            width="xl:w-1/1"
            options={[
              {
                value: "Usuário Desenvolvimento",
                label: "Usuário Desenvolvimento",
              },
              { value: "Bruno Muller", label: "Bruno Muller" },
              { value: "João Marcelino", label: "João Marcelino" },
            ]}
            error="Preencha o Campo"
            required
          />

          <button className="w-full xl:w-1/6 h-[2.8rem] mt-8.5 rounded bg-success p-3 font-medium text-gray">
            Filtrar
          </button>
        </InputGroup>
      </form>

      <Tabs defaultValue="mes">
        <TabsList className="grid w-1/3 grid-cols-3 mb-4">
          <TabsTrigger onClick={() => toggleView("mes")} value="mes">
            Mês
          </TabsTrigger>
          <TabsTrigger onClick={() => toggleView("semana")} value="semana">
            Semana
          </TabsTrigger>
          <TabsTrigger onClick={() => toggleView("dia")} value="dia">
            Dia
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="w-full max-w-full rounded-sm border p-1 border-stroke bg-white shadow-default dark:border-strokedark dark-bg-boxdark">
        <div className="flex justify-between p-4">
          <button
            onClick={goToPrevious}
            className="mr-2 hover:bg-stroke rounded p-1"
          >
            <ChevronLeft />
          </button>
          <h2 className="first-letter:uppercase">
            {new Intl.DateTimeFormat("default", {
              month: "long",
              year: "numeric",
            }).format(currentDate)}
          </h2>
          <button
            onClick={goToNext}
            className="mr-2 hover:bg-stroke rounded p-1"
          >
            <ChevronRight />
          </button>
        </div>
        <table className="w-full">
          {viewType === "semana" && renderTableHeader()}
          {viewType === "dia" && renderTableHeader2()}
          {/* <tbody> */}
          {viewType === "mes" ? renderTableRows() : renderTableRows()}
          {/* </tbody> */}
        </table>
      </div>

      <ModalComponente
        className="w-120"
        header="Novo Agendamento"
        opened={openModal}
        onClose={() => setOpenModal(!openModal)}
      >
        <NewDateScheduler
          taskSelecionada={modalContent}
          diaEscolhido={selectedDay}
          haTask={haTask}
          horaEscolhida={selectedHour}
        />
      </ModalComponente>
    </>
  );
};

export default Calendar;
