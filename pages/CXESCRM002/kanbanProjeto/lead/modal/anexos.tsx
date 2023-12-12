import PopoverAnexo from "@/components/Kanban/popoverAnexos";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { listarConfiguracoesAnexos } from "@/requests/CRM/kanban";
import { ImagePlus } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
const AnexosModal = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [tiposArquivos, setTiposArquivos] = useState<any>([]);

  const handleChangeTab = (value: any) => {
    setActiveTab(value);
  };
  useEffect(() => {
    listarConfiguracoesAnexos().then((res) => {
      setTiposArquivos(res);
    });
  });

  return (
    <Fragment>
      <p className="text-center font-medium text-lg text-black">Anexos</p>
      <Tabs defaultValue="fatura" className=" flex h-100 w-full gap-4">
        <div className="grid w-fit justify-center m-0  bg-stroke rounded-md p-1">
          <TabsList className="grid w-full bg-transparent">
            {tiposArquivos.map((item: any, index: number) => (
              <TabsTrigger
                key={index}
                className=" w-min  flex "
                value={item.id_anexo_crm}
                onClick={() => handleChangeTab(item.id_anexo_crm)}
              >
                <span className="max-sm:text-xs  ">
                  {item.identificacao_cfg_anexo}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          <Button className="flex self-end text-sm h-fit m-1">
            Adicionar categoria
          </Button>
        </div>
        <div className="flex-1 m-0 w-full ">
          <TabsContent value={activeTab} className="grid">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="flex bg-success hover:brightness-90 hover:bg-success justify-self-end text-sm h-fit items-center w-fit m-1 mb-4 p-1 px-2">
                  <ImagePlus size={15} className="mr-1" /> Adicionar imagem
                </Button>
              </PopoverTrigger>
              <PopoverContent className="z-9999 w-fit p-2">
                <PopoverAnexo />
              </PopoverContent>
            </Popover>

            <div className="grid lg:grid-cols-5 grid-cols-2 gap-y-3">
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="bg-stroke h-20 w-20 rounded cursor-pointer"
                />
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </Fragment>
  );
};

export default AnexosModal;
