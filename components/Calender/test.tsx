import React, { useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [test, setTest] = useState(dates(new Date()));
  const [viewType, setViewType] = useState("month"); // Padrão para mês
  console.log(test);

  const diasSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  function dates(current) {
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

  const renderTableCell = (day) => {
    return (
      <td
        key={day}
        className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover-bg-meta-4 md:h-25 md:p-6 xl:h-31"
      >
        <span className="font-medium text-black dark:text-white">{day}</span>
      </td>
    );
  };
  const renderTableHeader = () => {
    return (
      <thead>
        <tr
          className={`rounded-t-sm bg-stroke text-black grid ${
            viewType === "month" ? "grid-cols-7" : "grid-cols-8"
          }`}
        >
          {viewType === "week" && (
            <th className="h-15 items-center justify-center p-1 text-xs font-semibold sm-text-base xl-p-5" />
          )}
          {test.map((day, index) => (
            <th
              key={index}
              className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm-text-base xl-p-5"
            >
              <span className="lg-block">
                {diasSemana[day.getDay()]} {day.getDate()}
              </span>
              <span className="block lg:hidden">
                {diasSemana[day.getDay()].slice(0, 3)} {day.getDate()}
              </span>
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderWeekViewCells = () => {
    const tableRows = [];
    for (let hour = 0; hour < 24; hour++) {
      tableRows.push(
        <tr key={hour} className="grid grid-cols-8">
          <td className="font-medium text-sm justify-center flex text-black border border-stroke  dark:text-white p-2">
            {hour}:00
          </td>
          {Array.from({ length: 7 }, (_, index) => {
            const day = new Date(currentWeek);
            day.setDate(day.getDate() + index);
            // console.log(day);

            return (
              <td
                key={day.getDate()}
                className="ease relative cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover-bg-meta-4 "
              >
                {/* Adicione a lógica para gravar agendamentos aqui */}
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
    if (viewType === "month") {
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
    if (viewType === "month") {
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
    if (viewType === "month") {
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

  const toggleView = () => {
    setViewType(viewType === "month" ? "week" : "month");
  };

  return (
    <>
      <Breadcrumb pageName="Calendar" />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark-bg-boxdark">
        <div className="flex justify-between p-4">
          <button onClick={goToPrevious} className="mr-2">
            Previous
          </button>
          <button onClick={goToNext} className="mr-2">
            Next
          </button>
          <button onClick={toggleView}>
            {viewType === "month" ? "Switch to Week" : "Switch to Month"}
          </button>
        </div>
        <table className="w-full">
          {renderTableHeader()}
          <tbody>
            {viewType === "month" ? renderTableRows() : renderTableRows()}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calendar;
