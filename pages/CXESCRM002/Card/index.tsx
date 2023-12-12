import User1 from "@/public/images/user/user-01.png";
import { useDrag, useDrop } from "react-dnd";
import Image from "next/image";
import { useRef, useContext, Fragment } from "react";
import BoardContext from "@/src/contexts/boardContext";
import { Bookmark, ChevronsUp, Flag, Trash } from "lucide-react";
import { FormatFields } from "@/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
interface CardProps {
  data: any;
  index: any;
  listIndex: any;
  tipoKanban: string;
  clickedCard: () => void;
}
type MyElementType = HTMLDivElement;
export default function Card({
  data,
  index,
  listIndex,
  clickedCard,
  tipoKanban,
}: CardProps) {
  // const ref = useRef();
  const ref = useRef<MyElementType>(null);
  const nomeResponsavel = "Bruno Mueller";
  const { move }: any = useContext(BoardContext);
  let memTime = 0;
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: "CARD", index, listIndex },
    type: "CARD",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item: any, monitor) {
      var date = new Date();
      var now = date.getTime();
      if (memTime == 0) memTime = now;
      const draggedListIndex = item.listIndex;

      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }
      if (ref.current) {
        const targetSize = ref.current.getBoundingClientRect();
        const targetCenter = (targetSize.bottom - targetSize.top) / 2;
        const draggedOffset = monitor.getClientOffset();
        const draggedTop = draggedOffset!.y - targetSize.top;

        if (draggedIndex < targetIndex && draggedTop < targetCenter) {
          return;
        }
        if (draggedIndex > targetIndex && draggedTop > targetCenter) {
          return;
        }
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex, false);
      item.index = targetIndex;
      item.listIndex = targetListIndex;
    },
    drop(item, monitor) {
      var date = new Date();
      var now = date.getTime();
      if (memTime == 0) memTime = now;
      const draggedListIndex = item.listIndex;

      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }
      if (ref.current) {
        const targetSize = ref.current.getBoundingClientRect();
        const targetCenter = (targetSize.bottom - targetSize.top) / 2;

        const draggedOffset = monitor.getClientOffset();
        const draggedTop = draggedOffset!.y - targetSize.top;

        if (draggedIndex < targetIndex && draggedTop < targetCenter) {
          return;
        }
        if (draggedIndex > targetIndex && draggedTop > targetCenter) {
          return;
        }
      }
      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex, true);
      item.index = targetIndex;
      item.listIndex = targetListIndex;
    },
  });
  dragRef(dropRef(ref));
  return (
    <div
      onClick={(e) => {
        if (
          (e.target as HTMLElement).classList.contains(
            "react-icons__bs__BsThreeDotsVertical"
          ) ||
          (e.target as HTMLElement).parentElement?.classList.contains(
            "react-icons__bs__BsThreeDotsVertical"
          )
        ) {
        } else {
          clickedCard();
        }
      }}
      ref={ref}
      className={`${
        isDragging
          ? "bg-transparent shadow-none cursor-grabbing pt-[31px] rounded-none border-2 border-dashed border-[rgba(0,0,0,0.2)]"
          : "bg-white cursor-grab  dark:bg-black dark:border-boxdark "
      } relative dark:shadow-xl pl-4 shadow-[0_1px_4px_0_rgba(192,208,230,0.8)]  mb-2.5 p-[15px] rounded-xl `}
    >
      {tipoKanban === "task" ? (
        <Fragment>
          <header
            className={`absolute -top-[22px] left-4 ${
              isDragging ? "opacity-0" : "opacity-100"
            }`}
          >
            {data.labels.map((label: any) => (
              <span
                key={label}
                style={{ backgroundColor: `${label}` }}
                className={`w-2.5 h-2.5 inline-block rounded-sm  ${
                  isDragging ? "opacity-0" : "opacity-100"
                }`}
              />
            ))}
          </header>
          <p
            className={`${
              isDragging ? "opacity-0" : "opacity-100"
            } font-semibold leading-5`}
          >
            {data.content}
          </p>
          <Image
            className={`w-6 h-6 rounded-sm mt-1 ${
              isDragging ? "opacity-0" : "opacity-100"
            }`}
            src={User1}
            alt=""
          />
        </Fragment>
      ) : (
        <Fragment>
          <header
            className={`  left-4 ${isDragging ? "opacity-0" : "opacity-100"}`}
          >
            {data.etiquetas && data.etiquetas.length > 0 && (
              <div className="flex py-2 flex-wrap gap-1">
                {data.etiquetas.map((etiqueta: any, index: number) => (
                  <span
                    key={index}
                    style={{ backgroundColor: etiqueta.cor_etiqueta_kanban }}
                    className="bg-primary rounded-full  px-2 text-white font-medium text-sm"
                  >
                    {etiqueta.titulo_etiqueta_kanban}
                  </span>
                ))}
              </div>
            )}
            {/* {data.labels.map((label) => (
              <span
                key={label}
                style={{ backgroundColor: `${label}` }}
                className={`w-2.5 h-2.5 inline-block rounded-sm  ${
                  isDragging ? "opacity-0" : "opacity-100"
                }`}
              />
            ))} */}
          </header>
          <div className="flex justify-between">
            <p
              className={`${
                isDragging ? "opacity-0" : "opacity-100"
              } font-semibold text-black leading-5`}
            >
              {data.content}
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <div
                  className="popover-hover:block p-1  hover:bg-stroke react-icons__bs__BsThreeDotsVertical
                 dark:bg-black   rounded-md cursor-pointer"
                >
                  <BsThreeDotsVertical className="react-icons__bs__BsThreeDotsVertical" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="popover w-fit h-fit p-1">
                <div className="grid">
                  <span className="flex items-center gap-1 p-2 cursor-pointer dark:hover:bg-boxdark hover:bg-stroke rounded-sm">
                    <Trash color="red" size={16} /> Excluir lead{" "}
                  </span>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-sm my-1">{data.telefone1_cliente}</p>
          <p className="text-sm">
            {data.cidade_cliente} - {data.estado_cliente}
          </p>
          {data.mostraValor === 1 && (
            <p className="font-medium text-black p-2">R$ {data.descricao}</p>
          )}
          <div className="flex justify-between p-1 items-center border-t-2 mt-2 pt-3">
            <div className="flex gap-2">
              {data.mostraValor === 1 && (
                <Flag size={16} color="red" fill="red" />
              )}
              {/* <Bookmark size={16} fill="blue" />
              <ChevronsUp size={16} color="orange" />
              <Flag size={16} color="red" fill="red" /> */}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">
                {FormatFields.formatarDataHora(data.datahora)}
              </span>
              <span
                className={`w-8 h-8 font-medium p-2 bg-bodydark rounded-full  text-xs ${
                  isDragging ? "opacity-0" : "opacity-100"
                }`}
              >
                {nomeResponsavel.substring(0, 2).toUpperCase()}
              </span>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}
