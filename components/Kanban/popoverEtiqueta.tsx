import { Pen, Plus } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import * as yup from "yup";
import { GetForm } from "@/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import Input from "../Forms/Input";
import { cadastroEtiquetas } from "@/requests/CRM/kanban";
const PopoverEtiqueta = ({
  dados,
  allTags,
  dadosEtiqueta: etiquetas,
  etiquetasSelecionadas,
}: any) => {
  const [corEtiqueta, setCorEtiqueta] = useState("#21272c");
  const [tituloEtiqueta, setTituloEtiqueta] = useState("");
  const [yupSchema, setYupSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));
  const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

  const cores = [
    "#d71295",
    "#ed678d",
    "#6c7395",
    "#87896b",
    "#0a913b",
    "#3d4e81",
    "#ac0214",
    "#1415be",
    "#e3f43b",
    "#00e403",
  ];

  const handleTituloChange = (e: any) => {
    setTituloEtiqueta(e.target.value);
  };
  const handleSave = () => {
    const data = form.control._formValues;
    cadastroEtiquetas(data).then((res) => {
      console.log(res);
    });
  };
  const handleChangeCor = (cor: string) => {
    setCorEtiqueta(cor);
    const setValue = form.setValue;
    setValue("corEtiqueta" as never, cor as never);
  };
  const calculateContrastColor = (backgroundColor: any) => {
    // Convert hex color to RGB
    const r = parseInt(backgroundColor.slice(1, 3), 16);
    const g = parseInt(backgroundColor.slice(3, 5), 16);
    const b = parseInt(backgroundColor.slice(5, 7), 16);

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "black" : "white";
  };
  const truncateText = (text: any, maxLength: any) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  const handleSetTag = (
    id_etiqueta_kanban: any,
    titulo_etiqueta_kanban: any,
    cor_etiqueta_kanban: any
  ) => {
    allTags({
      id_etiqueta_kanban,
      titulo_etiqueta_kanban,
      cor_etiqueta_kanban,
    });
  };
  const urgencias = [
    { title: "Sem urgência", cor: "" },
    { title: "Alta", cor: "danger" },
    { title: "Média", cor: "warning" },
    { title: "Baixa", cor: "primary" },
  ];

  const truncatedTituloEtiqueta = truncateText(tituloEtiqueta, 25);
  const textColor = calculateContrastColor(corEtiqueta);

  const classUrgenciaItens =
    "flex items-center hover:opacity-95 p-1 cursor-pointer rounded  text-sm";

  return (
    <Fragment>
      <header className="text-sm text-center mb-4">{dados.name}</header>
      {dados.name === "Urgência" ? (
        urgencias.map((urgencia, index) => (
          <div
            key={index}
            className={` ${classUrgenciaItens} w-full my-1 bg-${urgencia.cor}  `}
          >
            {urgencia.title}
          </div>
        ))
      ) : (
        <div className="grid gap-1">
          {etiquetas &&
            etiquetas.map((etiqueta: any) => (
              <div
                key={etiqueta.id_etiqueta_kanban}
                className="flex items-center gap-1"
              >
                <input
                  className="h-5 w-5 checked:bg-primary"
                  type="checkbox"
                  onChange={() =>
                    handleSetTag(
                      etiqueta.id_etiqueta_kanban,
                      etiqueta.titulo_etiqueta_kanban,
                      etiqueta.cor_etiqueta_kanban
                    )
                  }
                  checked={etiquetasSelecionadas.some(
                    (selected: any) =>
                      selected.id_etiqueta_kanban ===
                      etiqueta.id_etiqueta_kanban
                  )}
                />
                <span
                  style={{ backgroundColor: etiqueta.cor_etiqueta_kanban }}
                  onClick={() =>
                    handleSetTag(
                      etiqueta.id_etiqueta_kanban,
                      etiqueta.titulo_etiqueta_kanban,
                      etiqueta.cor_etiqueta_kanban
                    )
                  }
                  className={` ${classUrgenciaItens} w-full  `}
                >
                  {etiqueta.titulo_etiqueta_kanban}
                </span>
                <Pen size={15} />
              </div>
            ))}
        </div>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex mt-1 items-center p-3 cursor-pointer rounded hover:bg-stroke justify-center text-sm">
            <Plus size={15} />
            Adicionar {dados.name}
          </div>
        </PopoverTrigger>
        <PopoverContent className="z-99999 translate-y-50 w-75 px-0">
          <div className="grid ">
            <header className="text-center mb-3">Criar {dados.name}</header>
            <div className="bg-stroke  w-full justify-center items-center h-20 flex">
              <span
                style={{ backgroundColor: corEtiqueta, color: textColor }}
                className={`w-10/12 rounded-md text-sm items-center pt-1 text-center font-medium h-7`}
              >
                {truncatedTituloEtiqueta}
              </span>
            </div>
            <div className="px-4 grid gap-3 mt-3">
              <label>Título</label>
              <Input
                formulario={form}
                name="tituloNovoItem"
                className="border-2 w-full border-stroke rounded"
                type="text"
                onChange={handleTituloChange}
              />
              <label>Cor</label>
              <div className="grid grid-cols-5 gap-2 px-4">
                {cores.map((cor, index) => (
                  <div
                    key={index}
                    onClick={() => handleChangeCor(cor)}
                    className={`h-6 w-10 rounded-sm  cursor-pointer`}
                    style={{ backgroundColor: cor }}
                  ></div>
                ))}
              </div>
              <Button
                onClick={handleSave}
                type="button"
                className="h-8 mt-4 bg-success"
              >
                Criar
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </Fragment>
  );
};

export default PopoverEtiqueta;
