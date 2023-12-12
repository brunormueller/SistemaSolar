import ModalComponente from "@/components/Modal/ModalComponente";
import { atualizarDadosKanban, novaLista } from "@/requests/CRM/kanban";
import BoardContext from "@/src/contexts/boardContext";
import KanbanContext from "@/src/contexts/kanbanContext";
import { GetForm } from "@/utils";
import { produce } from "immer";
import { useContext, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import * as yup from "yup";
import List from "../List";
import NewList from "../newList";

export default function Board({ kanbanId, listas, atualizaKanban }: any) {
  const { updateKanban, setUpdateKanban } = useContext(KanbanContext);
  const [lists, setLists] = useState<any[]>([]);
  const [yupSchema, setYupSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));
  const [openModalList, setOpenModalList] = useState(false);
  const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);
  const [isMovingCard, setIsMovingCard] = useState(false);
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    setLists(listas);
    console.log(listas);
  }, [listas]);
  function handleAtualizaKanban() {
    console.log("entrou no handle atualiza kanban");

    setUpdateKanban();
  }
  const handleDroppedCard = () => {
    setDropped(!dropped);
  };

  const handleSalvo = async (value: boolean) => {
    if (value) {
      let { tituloLista, selectCreatable } = form.control._formValues;
      if (selectCreatable === "true") {
        selectCreatable = true;
      } else {
        selectCreatable = false;
      }
      const list = {
        title: tituloLista,
        creatable: selectCreatable,
        cards: [],
      };
      const newLists = [...lists, list];
      setLists(newLists);

      setOpenModalList(false);
      const index = newLists.indexOf(list);
      const data = { index, list, kanbanId };
      const res = await novaLista(data);
    }
  };

  const handleCreateList = () => {
    setOpenModalList(true);
  };

  function move(fromList: any, toList: any, from: any, to: any, dropped: any) {
    setLists((prevLists) => {
      const updatedLists = produce(prevLists, (draft) => {
        const dragged = draft[fromList].cards[from];

        setIsMovingCard(true);
        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      });
      if (dropped) {
        if (fromList === toList && from === to) {
        } else {
          const newListCard = updatedLists.map((list, index) => {
            let newCard = list.cards.map((card: any, index2: any) => {
              const updatedCard = {
                ...card,
                index_card: index2 + 1,
              };
              return updatedCard;
            });
            return { ...list, cards: newCard };
          });
          atualizarDadosKanban(newListCard).then((res: any) => {});
        }
      }
      return updatedLists;
    });
  }

  return (
    <BoardContext.Provider value={{ lists, move, updatedList: lists }}>
      <div className="flex py-[30px] overflow-auto h-[calc(100%_-_80px)]">
        {lists &&
          lists
            .slice()
            .sort((a, b) => a.index_lista_kanban - b.index_lista_kanban)
            .map((list, index) => (
              <List
                form={form}
                key={list.title}
                index={list.index_lista_kanban}
                data={list}
                droppedCard={handleDroppedCard}
                updatedData={handleAtualizaKanban}
              />
            ))}
        <header className="flex dark:bg-black dark:border-boxdark dark:text-stroke hover:bg-[#c3c4c7] cursor-pointer text-strokedark gap-1 justify-between items-center h-10 px-19 rounded-md border-stroke border-[1px] bg-[#e8e9ed]">
          <button onClick={handleCreateList} type="button">
            Adicionar{" "}
          </button>
          <MdAdd size={15} />
        </header>
      </div>

      <ModalComponente
        saved={handleSalvo}
        opened={openModalList}
        onClose={() => setOpenModalList(false)}
      >
        <NewList form={form} />
      </ModalComponente>
    </BoardContext.Provider>
  );
}
