import Input from "@/components/Forms/Input";
import PopoverEtiqueta from "@/components/Kanban/popoverEtiqueta";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { listarEtiquetas } from "@/requests/CRM/kanban";
import { Paperclip, Plus, ShieldAlert, Tags, Users } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

const CardInformations = ({ dadosList, dadosCard, allTags }: any) => {
  const [etiquetas, setEtiquetas] = useState([]);
  useEffect(() => {
    listarEtiquetas().then((res) => {
      setEtiquetas(res);
    });
  }, []);
  const CamposTags = [
    { id: 1, name: "Etiquetas", icone: <Tags size={18} /> },
    { id: 2, name: "Urgência", icone: <ShieldAlert size={17} /> },
    { id: 3, name: "Anexos", icone: <Paperclip size={17} /> },
  ];
  return (
    <div className="modal-content p-4 px-5">
      <p className="text-sm text-black">Atualmente em</p>
      <p className="font-semibold text-black ">{dadosList.title}</p>
      <div className="flex gap-2">
        {CamposTags.map((campo) => (
          <Fragment key={campo.id}>
            <Popover>
              <PopoverTrigger asChild>
                <div
                  key={campo.id}
                  className="flex gap-1 px-2 font-medium cursor-pointer items-center bg-stroke text-sm w-fit rounded mt-3 text-black p-[2px]"
                >
                  {campo.name} {campo.icone}
                </div>
              </PopoverTrigger>
              <PopoverContent className="z-9999 w-fit p-2">
                <PopoverEtiqueta
                  dadosEtiqueta={etiquetas}
                  allTags={allTags}
                  dados={campo}
                />
              </PopoverContent>
            </Popover>
          </Fragment>
        ))}
      </div>
      <p className="mt-5 text-sm text-black font-medium">Responsáveis</p>
      <p className="text-sm text-body font-medium flex items-center underline-offset-4 gap-1 underline py-1">
        <Users size={15} />
        Adicionar responsáveis
      </p>
      <div className="border-b-2 w-full my-4"></div>
      <div className="flex text-sm font-medium justify-center">Comentários</div>
      <div className="flex  max-h-9 ">
        <Input placeholder="Preencha um comentário..." type="text" name="" />
        <div className="bg-primary text-sm text-white px-3 flex items-center rounded-sm">
          Publicar
        </div>
      </div>
    </div>
  );
};
export default CardInformations;
