import Divider from "@/components/Forms/Divider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
const CardTask = ({ dadosCard, tags }: any) => {
  const [urgencia, setUrgencia] = useState([]);
  const classParagraph = "text-sm font-semibold text-black";
  const classParagraphOpacity = "text-sm font-base text-[#c0bec4]";
  useEffect(() => {
    setUrgencia([tags as never]);
  }, [tags]);

  return (
    <div className="grid gap-2">
      <h2 className="font-semibold text-lg text-black">{dadosCard.content}</h2>
      <div className="flex gap-5">
        <div className="grid">
          <span className="text-sm font-medium">Urgência</span>
          {urgencia &&
            urgencia.map((item: any, index: number) => (
              <div
                key={index}
                style={{ backgroundColor: item.cor }}
                className="flex  rounded-md text-black w-fit p-1 px-3 text-sm"
              >
                {item.nome}
              </div>
            ))}
        </div>
        <div className="grid">
          <span className="text-sm font-medium">Etiquetas</span>
          <div className="flex bg-white rounded-md text-black w-fit p-1 px-3 text-sm">
            Média
          </div>
        </div>
      </div>
      <div className="bg-white w-full rounded-md p-4">
        <div className="flex justify-between">
          <p className={classParagraph}>Nova solicitação</p>
          <span className={classParagraph}>29/07</span>
        </div>
        <div className="flex justify-between">
          <p className={classParagraphOpacity}>Aberto por...</p>
          <span className={classParagraphOpacity}>14:31</span>
        </div>
        <p className={`${classParagraph} mt-4`}>Descrição</p>
        <textarea
          className="border-[1px] resize-none border-stroke rounded-sm w-full text-sm p-2 font-medium"
          placeholder="Adicione uma descrição..."
        >
          {dadosCard.descricao}
        </textarea>
        <div className="flex items-center justify-between mt-2 pb-2">
          <p className={`${classParagraph} mt-4`}>Anexos</p>
          <Button className="text-sm w-fit h-7 bg-stroke text-black hover:bg-bodydark">
            {" "}
            Adicionar anexo
          </Button>
        </div>
        <div className="flex hover:bg-stroke p-2">
          <div className="h-20 w-20 bg-bodydark"></div>
        </div>
        <div className="flex hover:bg-stroke p-2">
          <div className="h-20 w-20 bg-bodydark"></div>
        </div>
        <div className="flex hover:bg-stroke p-2">
          <div className="h-20 w-20 bg-bodydark"></div>
        </div>
        <div className="flex hover:bg-stroke p-2">
          <div className="h-20 w-20 bg-bodydark"></div>
        </div>
        <div className="flex hover:bg-stroke p-2">
          <div className="h-20 w-20 bg-bodydark"></div>
        </div>

        <Divider />
        <p className={`${classParagraph} mt-4`}>Histórico</p>
        <Accordion type="single" collapsible>
          <AccordionItem
            className="border-[1px] rounded text-sm  text-black font-semibold"
            value="item-1"
          >
            <AccordionTrigger className="justify-between hover:no-underline	flex p-3">
              <span>Sprint</span>
            </AccordionTrigger>

            <AccordionContent>
              <div className="flex bg-primary">teste</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default CardTask;
