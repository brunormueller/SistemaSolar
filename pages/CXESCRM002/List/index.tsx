import DialogAlert from "@/components/Alerts/dialogAlert";
import BasicModal from "@/components/Modal/Modal";
import ModalComponente from "@/components/Modal/ModalComponente";

import { cadastroNovoCard, excluirLista } from "@/requests/CRM/kanban";
import boardContext from "@/src/contexts/boardContext";
import { useContext, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { MdAdd } from "react-icons/md";
import Card from "../Card";
import EditCard from "../kanbanProjeto/editCard";
import CardInformations from "../kanbanTask/cardInformation";
import CardTask from "../kanbanTask/cardTask";
import NewCardKanban from "../kanbanTask/newCard";
export default function List({
  data,
  droppedCard,
  index: listIndex,
  updatedData,
  form,
}: any) {
  const { move }: any = useContext(boardContext);
  const [openModalCard, setOpenModalCard] = useState(false);
  const [openModalNewCard, setOpenModalNewCard] = useState(false);
  const [removeList, setRemoveList] = useState(false);
  const [editingListName, setEditingListName] = useState(false);
  const [dadosAtualCard, setDadosAtualCard] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [tags, setTags] = useState({});

  const done = data.done;
  const [{ isOver }, connectDropTarget] = useDrop({
    accept: "CARD",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item: any) => {
      if (item.listIndex === listIndex) {
      } else {
        move(item.listIndex, listIndex, item.index, item.index, true);
      }
      droppedCard(true);
    },
  });
  const handleSalvarNewCard = async () => {
    let maxIndexCard = 0;
    for (const card of data.cards) {
      if (card.index_card > maxIndexCard) {
        maxIndexCard = card.index_card;
      }
    }

    const nextIndexCard = maxIndexCard + 1;

    const { titulo, tipo, observacao, urgencia } = form.control._formValues;
    const listaDestino = data.id;
    const card = {
      titulo,
      tipo,
      observacao,
      urgencia,
      listaDestino,
      nextIndexCard,
    };
    await cadastroNovoCard(card).then((res) => {
      handleNewCard();
      updatedData(true);
    });
  };
  const handleSalvo = () => {
    console.log(data);
  };

  const getRandomColorWithOpacity = () => {
    const letters = "0123456789ABCDEF";
    let hexColor = "#";

    // Generate random values for each RGB component
    for (let i = 0; i < 6; i++) {
      hexColor += letters[Math.floor(Math.random() * 16)];
    }

    // Convert hexColor to string explicitly
    hexColor = hexColor.toString();

    // Convert hex to RGBA
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Add the alpha channel with 0.5 opacity
    const rgbaColor = `rgba(${r}, ${g}, ${b}, 0.2)`;

    return rgbaColor;
  };

  const randomBackgroundColor = getRandomColorWithOpacity();

  const handleRemoveList = () => {
    setRemoveList(!removeList);
    excluirLista(data);
    updatedData(true);
  };

  const handleSetTags = ({ nome, cor }: { nome: string; cor: string }) => {
    setTags({ nome, cor });
  };
  useEffect(() => {
    function change() {
      setIsDragging(true);
    }

    function change_back() {
      setIsDragging(false);
    }
    let element = document.getElementById("modalCard");

    element?.addEventListener("dragover", change);

    element?.addEventListener("dragleave", change_back);
  }, []);

  const handleCliqueCard = () => {
    setOpenModalCard(!openModalCard);
  };
  const handleNewCard = () => {
    setOpenModalNewCard(!openModalNewCard);
  };
  return connectDropTarget(
    <div
      className={`px-4 max-h-150 md:max-h-[400px] overflow-auto flex-[0_0_320px] pt-2  bg-opacity-60  mr-1 rounded-xl ${
        isOver ? " " : ""
      } ${done ? "opacity-60" : "opacity-100"} group`}
      style={{ border: "3px solid " + randomBackgroundColor }}
    >
      <header
        className="flex justify-between  rounded-md items-center h-10 "
        style={{ backgroundColor: randomBackgroundColor }}
      >
        {editingListName ? (
          <input
            type="text"
            className="bg-transparent border-b-2 text-base font-semibold"
            placeholder={data.title}
          />
        ) : (
          <div className="text-sm px-2 text-black flex gap-2 font-semibold">
            <span>{data.title}</span>
            <span>({data.cards.length})</span>
          </div>
        )}
        <div className="flex justify-end items-center">
          {data.creatable && (
            <button
              onClick={handleNewCard}
              className="h-[42px] flex items-center justify-center rounded-[18px] bg-primary border-none cursor-pointer w-[42px]"
              type="button"
            >
              <MdAdd size={18} color="#FFF" />
            </button>
          )}
        </div>
      </header>
      <ul className="mt-8">
        {data.cards.map((card: any, index: any) => (
          <Card
            key={index}
            clickedCard={() => {
              setDadosAtualCard(card);
              handleCliqueCard();
            }}
            listIndex={listIndex}
            index={index}
            data={card}
            tipoKanban={data.tipo}
          />
        ))}
      </ul>
      {data.tipo === "task" ? (
        <BasicModal opened={openModalCard} onClose={() => handleCliqueCard}>
          <aside className="bg-[#e2e8f0] w-1/2 asideModalCard  overflow-auto max-h-125  rounded-md shadow-lg z-50 h-full overflow-y-auto p-6 pr-9 ">
            <CardTask tags={tags} dadosCard={dadosAtualCard} />
          </aside>
          <aside className="bg-white w-2/6 -translate-x-4 rounded-md shadow-lg h-[410px]  z-50 overflow-y-auto">
            <CardInformations
              dadosCard={dadosAtualCard}
              dadosList={data}
              allTags={handleSetTags}
            />
          </aside>
        </BasicModal>
      ) : (
        <ModalComponente
          className={`bg-stroke  ${
            isDragging ? "brightness-50" : ""
          }	modalRecebe fixed h-[90%]  overflow-x-hidden`}
          saved={handleSalvo}
          hasSaveButton={false}
          opened={openModalCard}
          onClose={handleCliqueCard}
        >
          <EditCard dadosLista={data} dadosCard={dadosAtualCard} form={form} />
        </ModalComponente>
      )}
      <ModalComponente
        size="sm"
        opened={openModalNewCard}
        onClose={handleNewCard}
        saved={handleSalvarNewCard}
      >
        <NewCardKanban form={form} />
      </ModalComponente>

      <DialogAlert
        tipo="warning"
        onClose={() => setRemoveList(!removeList)}
        onSave={handleRemoveList}
        open={removeList}
        title="Certeza que deseja continuar?"
        message="A lista será excluída permanentemente e não poderá ser recuperada."
      />
    </div>
  );
}
