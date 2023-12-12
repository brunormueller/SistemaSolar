import React, { useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Import } from "lucide-react";
import ModalComponente from "../Modal/ModalComponente";
import NewDateScheduler from "./modalNewDateScheduler";
import InputGroup from "../Forms/InputGroup";
import InputSelectComponent from "../Forms/InputSelect";
import { Form } from "react-hook-form";
import { GetForm } from "@/utils";
import * as yup from "yup";

const Calendar = ({ onSubmitFunction }: any) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [test, setTest] = useState(dates(new Date()));
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);
  const [viewType, setViewType] = useState("mes"); // Padrão para mês
  const [yupSchema, setYupSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));
  const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

  const tasks = [
    { text: "Task 1", day: 31, hour: 8, color: "bg-danger" },
    { text: "Task 2", day: 31, hour: 10, color: "bg-warning" },
    { text: "Task 3", day: 31, hour: 8, color: "bg-success" },
    { text: "Task 3", day: 31, hour: 4, color: "bg-success" },
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

  const renderTableCell = (day: any) => {
    const hj = new Date();
    const diaAtual = hj.getDate(); // Obtém o dia atual (ex: 31)
    let bgCurrentDay = false;

    if (parseInt(day, 10) === diaAtual) {
      bgCurrentDay = true;
    }

    return (
      <td
        key={day}
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
            {tasks.map(
              (task, taskIndex) =>
                day === task.day && (
                  <span
                    key={taskIndex}
                    className={`${task.color} text-white h-fit px-3 text-xs rounded-sm`}
                  >
                    {truncateText(task.text, 7)}
                  </span>
                )
            )}
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
  const handleWeekCellClick = (day: any, hour: any) => {
    setOpenModal(!openModal);

    setSelectedDay(day);
    setSelectedHour(hour);
  };
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const renderWeekViewCells = () => {
    const tableRows = [];
    for (let hour = 0; hour < 24; hour++) {
      tableRows.push(
        <tr key={hour} className="grid grid-cols-8">
          <td className="font-medium text-sm justify-center border-r flex text-black border-b border-stroke  dark:text-white p-2">
            {hour}:00
          </td>
          {test.map((days, index) => {
            const day = new Date(currentWeek);
            day.setDate(day.getDate() + index);

            return (
              <td
                key={index}
                onClick={() => handleWeekCellClick(days, hour)}
                className="ease relative cursor-pointer border-b gap-1 border-r border-stroke p-1 flex flex-wrap max-w-full transition duration-500 hover:bg-gray dark:border-strokedark dark:hover-bg-meta-4 "
              >
                {tasks.map(
                  (task, taskIndex) =>
                    days.getDate() === task.day &&
                    hour === task.hour && (
                      <span
                        key={taskIndex}
                        className={`${task.color} text-white h-fit px-3 text-xs rounded-sm`}
                      >
                        {truncateText(task.text, 7)}
                      </span>
                    )
                )}
              </td>
            );
          })}
        </tr>
      );
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
    } else {
      return renderWeekViewCells();
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

  return (
    <>
      <Breadcrumb pageName="Calendar" />
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
          {renderTableHeader()}
          <tbody>
            {viewType === "mes" ? renderTableRows() : renderTableRows()}
          </tbody>
        </table>
      </div>
      <ModalComponente
        header="Adicione na agenda"
        opened={openModal}
        onClose={() => setOpenModal(!openModal)}
      >
        <NewDateScheduler
          diaEscolhido={selectedDay}
          horaEscolhida={selectedHour}
        />
      </ModalComponente>
    </>
  );
};

export default Calendar;
