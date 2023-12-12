import { Plus } from "lucide-react";
import Button from "@/components/Forms/Button";
import { Fragment, useState } from "react";
import InputSelectComponent from "@/components/Forms/InputSelect";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Input from "@/components/Forms/Input";
import ModalComponente from "@/components/Modal/ModalComponente";
const NotasKanban = ({ form }: any) => {
  const [openModalNotas, setOpenModalNotas] = useState(false);

  const handleModalNotas = () => {
    setOpenModalNotas(!openModalNotas);
  };
  return (
    <Fragment>
      <div className=" mt-6 w-fit flex">
        <Button
          onClick={handleModalNotas}
          className="flex items-center gap-1 bg-success text-white p-2 text-sm rounded-md"
        >
          Adicionar nota
          <Plus size={20} />
        </Button>
      </div>
      <ModalComponente
        hasSaveButton={false}
        opened={openModalNotas}
        onClose={handleModalNotas}
        size="sm"
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-center text-black">Adicionar nota</h3>
          <textarea
            className="border border-[#c3c4c7] rounded-md p-2"
            placeholder="Adicione uma nota"
          />
          <InputSelectComponent
            label="Tipo de Nota"
            name="tipoNota"
            formulario={form}
            options={[{ value: "sim", label: "eita" }]}
          />
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Possui data? </AccordionTrigger>
              <AccordionContent>
                <Input name="data" mascara="data" formulario={form} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex ">
            <Button
              onClick={handleModalNotas}
              className="bg-success text-white p-2 text-sm rounded-md"
            >
              Adicionar
            </Button>
          </div>
        </div>
      </ModalComponente>
    </Fragment>
  );
};

export default NotasKanban;
