import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import ModalComponente from "@/components/Modal/ModalComponente";
import LoaderSun from "@/components/common/Loader/LoaderSun";
import { enviarArquivo } from "@/requests/CRM/arquivos";
import {
  listarConfiguracoesAnexos,
  listarDadosCard,
} from "@/requests/CRM/kanban";

import { useEffect, useState } from "react";
import FormContrato from "./contratos";
import CardHistorico from "./lead/card/cardHistorico";
import CardInfo from "./lead/card/cardInfo";
import CardInfoCliente from "./lead/card/cardInfoCliente";
import CardNotas from "./lead/card/cardNotas";
import PropostasTab from "./propostas/propostas";
import Historico from "./historico/cardHistorico";
const EditCard = ({ form, dadosCard, dadosLista }: any) => {
  const [cliente, setCliente] = useState<any>({});
  const [etiquetas, setEtiquetas] = useState([]);

  const [openModalAnexo, setOpenModalAnexo] = useState(false);
  const [nomeAnexo, setNomeAnexo] = useState("");
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [historico, setHistorico] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [tiposArquivos, setTiposArquivos] = useState<any>([]);

  useEffect(() => {
    listarConfiguracoesAnexos().then((res) => {
      setTiposArquivos(res);
    });
    buscaCliente();
  }, []);
  const buscaCliente = async () => {
    setLoading(true);
    console.log("daaaaaadoooooooooooosssssss", dadosCard);

    await listarDadosCard(dadosCard.id, dadosCard.id_cliente).then((res) => {
      setCliente(res.dados_cliente[0]);
      console.log(res.dados_cliente);

      setEtiquetas(res.etiquetas);
      setHistorico(res.historico);
      setLogs(res.log);
    });
    setLoading(false);
  };
  const atualizaTiposAnexos = () => {
    return tiposArquivos.map((arr: any) => ({
      label: arr.identificacao_cfg_anexo,
      value: arr.id_anexo_crm,
    }));
  };
  const dropHandler = async (e: any) => {
    console.log("File(s) dropped");

    // // Impedir o comportamento padrão (impedir que o arquivo seja aberto)
    e.preventDefault();

    if (e.dataTransfer.items) {
      // Use a interface DataTransferItemList para acessar o (s) arquivo (s)
      for (var i = 0; i < e.dataTransfer.items.length; i++) {
        // Se os itens soltos não forem arquivos, rejeite-os
        if (e.dataTransfer.items[i].kind === "file") {
          var file = e.dataTransfer.items[i].getAsFile();
          setOpenModalAnexo(true);
          setNomeAnexo(file.name);
          setDroppedFile(file);
          displayFile(file);
        }
      }
    }
  };
  const sendFileToBackend = async () => {
    if (!droppedFile) {
      return;
    }
    const nomeFile = form.control._formValues?.nomeFile;
    const tipo = form.control._formValues?.tipo.value;

    if (!nomeFile) {
      console.error("nomeFile is missing");
      return;
    }

    const formData = new FormData();

    formData.append("file", droppedFile);
    formData.append("nomeArquivoPersonalizado", nomeFile);
    formData.append("categoriaArquivo", tipo);

    const response = await enviarArquivo(formData);
    console.log(response);
  };
  const displayFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFileURL(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const handleTeste = () => {
    setOpenModalAnexo(false);
  };
  const atualizaDados = () => {
    buscaCliente();
  };

  return (
    <div>
      {loading ? (
        <div className="flex h-screen overflow-hidden items-center justify-center">
          <LoaderSun />
        </div>
      ) : (
        <Tabs defaultValue="lead">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="lead">Lead</TabsTrigger>
            <TabsTrigger value="propostas">Propostas</TabsTrigger>
            <TabsTrigger value="contratos">Contratos</TabsTrigger>
            <TabsTrigger value="historico">Historico</TabsTrigger>
          </TabsList>

          <TabsContent
            value="lead"
            onDrop={dropHandler}
            className={`hover:bg-opacity-95 leadModal outline-none`}
          >
            <div className="flex flex-wrap justify-center gap-2 xl:gap-0  xl:justify-between xl:sticky top-0 w-full h-full">
              <CardInfoCliente
                test={atualizaDados}
                dadosCard={dadosCard}
                dadosCliente={cliente}
              />
              <CardNotas dataCard={dadosCard} form={form} />
              <CardInfo
                dadosEtiquetas={etiquetas}
                dadosLista={dadosLista}
                dataCard={dadosCard}
              />
            </div>
            <ModalComponente
              onClose={handleTeste}
              className="overflow-hidden"
              opened={openModalAnexo}
              size="lg"
              saved={sendFileToBackend}
            >
              <div className="flex justify-between">
                <aside className="flex items-center">
                  {fileURL && fileURL.startsWith("data:image") ? ( // Verifica se é uma imagem
                    <div className="w-full ">
                      <img
                        src={fileURL}
                        className="w-80 h-fit rounded"
                        alt="Imagem"
                      />
                    </div>
                  ) : (
                    <div className="w-full ">
                      <iframe
                        className="w-80 rounded"
                        src={fileURL!}
                        frameBorder="0"
                      >
                        {nomeAnexo}
                      </iframe>
                    </div>
                  )}
                </aside>
                <aside className=" w-1/2 ">
                  <p className="text-center text-lg pb-4 text-black font-medium">
                    Envio de arquivo
                  </p>
                  <InputGroup>
                    <Input
                      formulario={form}
                      name="nomeFile"
                      label="Qual nome você deseja?"
                      defaultValue={nomeAnexo}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputSelectComponent
                      formulario={form}
                      name="tipo"
                      label="Tipo"
                      options={atualizaTiposAnexos()}
                    />
                  </InputGroup>
                </aside>
              </div>
            </ModalComponente>

            {/* <CardHistorico
              dadosLogs={logs}
              dadosHistorico={historico}
              dataCard={dadosCard}
            /> */}
          </TabsContent>
          <TabsContent value="propostas">
            <PropostasTab dadosCard={dadosCard} dadosCliente={cliente} />
          </TabsContent>
          <TabsContent value="contratos">
            {/* <Button>Gerar Contrato</Button> */}
            <FormContrato dadosCard={dadosCard} dadosCliente={cliente} />
          </TabsContent>
          <TabsContent value="historico">
            {/* <Button>Gerar Contrato</Button> */}
            <Historico
              dadosLogs={logs}
              dadosHistorico={historico}
              dataCard={dadosCard}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default EditCard;
