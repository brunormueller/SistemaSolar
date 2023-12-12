import Avatar from "@/components/Avatar";
import PopoverAnexo from "@/components/Kanban/popoverAnexos";
import PopoverEtiqueta from "@/components/Kanban/popoverEtiqueta";
import PopoverResponsaveis from "@/components/Kanban/popoverResponsaveis";
import ModalComponente from "@/components/Modal/ModalComponente";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Paperclip, Plus, ShieldAlert, Tags, Users } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import AnexosModal from "../modal/anexos";
import { cadastrarEtiquetasCard } from "@/requests/CRM/kanban";
const CardInfo = ({ dataCard, dadosEtiquetas, dadosLista }: any) => {
  const [etiquetas, setEtiquetas] = useState(dadosEtiquetas);
  const [etiquetasCard, setEtiquetasCard] = useState<any[]>([]);
  const [openModalAnexo, setOpenModalAnexo] = useState(false);
  const [openModalResponsavel, setOpenModalResponsavel] = useState(false);
  let todasEtiquetas = [] as any;
  const CamposTags = [
    { id: 1, name: "Etiquetas", icone: <Tags size={18} /> },
    { id: 2, name: "Urgência", icone: <ShieldAlert size={17} /> },
  ];

  const nomeResponsavel = "Bruno";
  useEffect(() => {
    const etiquetasFiltradas = dadosEtiquetas.filter((etiqueta: any) => {
      if (dataCard.etiquetas) {
        console.log(dataCard.etiquetas);

        return dataCard.etiquetas.some(
          (cardEtiqueta: any) =>
            cardEtiqueta.id_etiqueta_kanban === etiqueta.id_etiqueta_kanban
        );
      }
      return false;
    });

    setEtiquetasCard(etiquetasFiltradas);
  }, [dadosEtiquetas]);
  const salvaEtiquetas = () => {
    const idCard = dataCard.id;
    const data = { todasEtiquetas, idCard };
    cadastrarEtiquetasCard(data);
  };

  const handleTags = (tag: any) => {
    const etiquetasTeste = etiquetasCard.filter((etiqueta: any) => {
      return tag.id_etiqueta_kanban.includes(etiqueta.id_etiqueta_kanban);
    });
    if (etiquetasTeste.length > 0) {
      setEtiquetasCard(
        etiquetasCard.filter((etiqueta: any) => {
          return tag.id_etiqueta_kanban !== etiqueta.id_etiqueta_kanban;
        })
      );
      todasEtiquetas = etiquetasCard.filter((etiqueta: any) => {
        return tag.id_etiqueta_kanban !== etiqueta.id_etiqueta_kanban;
      });
      salvaEtiquetas();
    } else {
      setEtiquetasCard([...etiquetasCard, tag]);
      todasEtiquetas = [...etiquetasCard, tag];
      salvaEtiquetas();
    }
  };
  const handleModalAnexo = () => {
    setOpenModalAnexo(!openModalAnexo);
  };

  return (
    <div className="ficaComOScroll transition-all z-9999999 w-full xl:w-min grid gap-5 ">
      <div className="xl:grid h-full z-9999 xl:w-64 w-full  bg-white shadow-sm xl:shadow-xl p-3 rounded-md ">
        <p className="text-sm text-black">Atualmente em</p>
        <p className="font-semibold text-black ">{dadosLista.title}</p>
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
                    etiquetasSelecionadas={etiquetasCard}
                    dadosEtiqueta={etiquetas}
                    allTags={handleTags}
                    dados={campo}
                  />
                </PopoverContent>
              </Popover>
            </Fragment>
          ))}
        </div>
        <div className="grid mt-3 w-fit">
          <span className="text-sm font-medium text-black">Urgência</span>
          <span className="text-sm text-center px-9  bg-danger  rounded text-white">
            Alta
          </span>
        </div>
        <div className="grid w-fit mt-3">
          <span className="text-sm font-medium text-black">Etiquetas</span>
          <div className="grid grid-cols-2 gap-1">
            {etiquetasCard && etiquetasCard.length === 0 && (
              <span className="text-sm text-center">Nenhuma etiqueta</span>
            )}
            {etiquetasCard &&
              etiquetasCard.map((item, index) => (
                <span
                  key={index}
                  style={{ backgroundColor: item.cor_etiqueta_kanban }}
                  className="text-sm text-center px-5  rounded text-white"
                >
                  {item.titulo_etiqueta_kanban}
                </span>
              ))}
          </div>
        </div>
        <p className="mt-5 text-sm text-black font-medium">Responsáveis</p>
        <div className="flex gap-1 px-2 h-fit font-medium cursor-pointer items-center text-sm w-fit rounded mt-3 text-black p-[2px]">
          <Avatar nome_responsavel={nomeResponsavel} />
          {nomeResponsavel}
        </div>

        <p
          onClick={() => setOpenModalResponsavel(!openModalResponsavel)}
          className="text-sm cursor-pointer text-body font-medium flex items-center underline-offset-4 mt-2 gap-1 underline py-1"
        >
          <Users size={15} />
          Adicionar responsáveis
        </p>
        <ModalComponente
          className="overflow-hidden px-3 "
          size="sm"
          onClose={() => setOpenModalResponsavel(!openModalResponsavel)}
          hasSaveButton={false}
          opened={openModalResponsavel}
        >
          <PopoverResponsaveis />
        </ModalComponente>
      </div>
      <div className="grid h-fit ficaComOScroll xl:w-64 w-full z-9999999 bg-white shadow-sm xl:shadow-xl p-3 rounded-md ">
        <div className="flex px-2 items-center justify-between">
          <div
            onClick={handleModalAnexo}
            className="flex  gap-2 items-center cursor-pointer"
          >
            <Paperclip size={18} />
            <span className="font-semibold text-black">Arquivos</span>
          </div>
          <div className="flex h-fit gap-1">
            <div className="bg-stroke text-body font-medium p-1 text-sm rounded-md px-2">
              1
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <div className="hover:bg-stroke p-1 rounded-lg">
                  <Plus size={20} />
                </div>
              </PopoverTrigger>
              <PopoverContent className="z-9999 w-fit p-2">
                <PopoverAnexo />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <ModalComponente
        hasSaveButton={false}
        onClose={handleModalAnexo}
        size="lg"
        className="overflow-hidden "
        opened={openModalAnexo}
      >
        <AnexosModal />
      </ModalComponente>
    </div>
  );
};

export default CardInfo;
