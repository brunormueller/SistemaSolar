import Board from "@/pages/CXESCRM002/Board";

import { listarDadosFunil, listarKanban } from "@/requests/CRM/kanban";
import KanbanContext from "@/src/contexts/kanbanContext";
import { useContext, useEffect, useState } from "react";
import DashboardFunil from "./Dashboard";

const Kanban = () => {
  const [lists, setLists] = useState<any[]>([]);
  const [visualizacao, setVisualizacao] = useState("Kanban");
  const { updateKanban, setUpdateKanban } = useContext(KanbanContext);
  const [tituloKanban, setTituloKanban] = useState("");
  const searchParams = new URLSearchParams(window.location.search);

  const funil = searchParams.get("funil");

  const visualizacaoKanban = ["Kanban", "Gráfico Funil"];
  useEffect(() => {
    const listaDadosKanban = async () => {
      await listarKanban(funil).then((res: any) => {
        res = res.sort((a: any, b: any) => parseInt(a.id) - parseInt(b.id));
        console.log(res);

        setLists(res);
      });
    };
    listarDadosFunil(funil).then((res) => {
      setTituloKanban(res);
    });

    listaDadosKanban();
  }, [funil, updateKanban]);

  return (
    <>
      <div className="bg-white rounded p-3">
        <div className="flex gap-6 w-full text-2xl text-black  px-3 font-medium">
          {tituloKanban}
          <span className="border-r-2 "></span>
          <ul className="flex  text-base">
            {visualizacaoKanban.map((visual, index) => (
              <li
                key={index}
                className={`pt-1 cursor-pointer ${
                  visualizacao === visual && "border-b-2 border-b-primary"
                } px-4`}
                onClick={() => setVisualizacao(visual)}
              >
                {visual}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {visualizacao === "Kanban" && (
        <KanbanContext.Provider value={{ updateKanban, setUpdateKanban }}>
          <Board
            kanbanId={funil}
            listas={lists}
            atualizaKanban={() => console.log("")}
          />
        </KanbanContext.Provider>
      )}
      {visualizacao === "Gráfico Funil" && <DashboardFunil listas={lists} />}
    </>
  );
};

export default Kanban;
