import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { User2 } from "lucide-react";
const HistoricoKanban = () => {
  return (
    <div className="grid">
      <h1>Últimas movimentações</h1>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Venda Movimentada </AccordionTrigger>
          <div className="flex py-1 items-center gap-1 px-2">
            <User2 size={20} />
            <p>Bruno Mueller</p>
          </div>
          <AccordionContent>
            <div className="flex bg-primary">teste</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HistoricoKanban;
