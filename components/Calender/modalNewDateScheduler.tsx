import Input from "@/components/Forms/Input";
import { GetForm } from "@/utils";
import { format } from "date-fns";
import { useState } from "react";
import * as yup from "yup";
const NewDateScheduler = ({ horaEscolhida, diaEscolhido }: any) => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [yupSchema, setYupSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));
  const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);
  const categorias = ["Tarefa", "Evento", "Lembrete", "Encontro"];
  const handleSelectCategoria = (categoria: any) => {
    setCategoriaSelecionada(categoria);
  };
  const formatDateTime = (date: any, hour: any) => {
    const formattedDate = format(new Date(date), "dd/MM");
    const formattedHour = hour + ":00h";
    const formattedResult = formattedDate + " - " + formattedHour;

    return formattedResult;
  };
  return (
    <>
      <div className="flex gap-2 my-4">
        {categorias.map((categoria, index) => (
          <span
            key={index}
            onClick={() => handleSelectCategoria(categoria)}
            className={`px-2 bg-stroke  ${
              categoriaSelecionada === categoria
                ? "bg-[#418cfd] text-white"
                : "bg-opacity-50 text-black border-2"
            }  py-1 text-sm font-semibold items-center flex tracking-wide cursor-pointer  border-stroke rounded-md`}
          >
            {categoria}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <Input formulario={form} label="Titulo" name="titleAgenda" />
        <Input
          formulario={form}
          defaultValue={formatDateTime(diaEscolhido, horaEscolhida)}
          label="Horário"
          name="horarioAgenda"
        />
        <Input
          formulario={form}
          type="textarea"
          label="Descrição"
          name="descricaoAgenda"
        />
      </div>
    </>
  );
};

export default NewDateScheduler;
