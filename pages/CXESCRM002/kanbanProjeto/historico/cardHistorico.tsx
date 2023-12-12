import Avatar from "@/components/Avatar";
import { FormatFields } from "@/utils";
import React, { Fragment, useState } from "react";
import GetIcon from "@/components/Icons/IconComponent";

const Historico = ({ dadosLogs, dataCard, dadosHistorico }: any) => {
  console.log(dadosLogs);
  const [selecionado, setSelecionado] = useState("Geral");

  const combinedData = [
    ...dadosLogs.map((log: any) => ({ ...log })),
    ...dadosHistorico.map((historico: any) => ({
      ...historico,
    })),
  ];

  combinedData.sort((a, b) => {
    const dateA = new Date(
      a.datahora_log_kanban || a.dataHora_nota_kanban
    ) as any;
    const dateB = new Date(
      b.datahora_log_kanban || b.dataHora_nota_kanban
    ) as any;
    return dateA - dateB;
  });
  const filtros = ["Geral", "Notas", "Atividades"];

  const nomeResponsavel = "Bruno Mueller";
  return (
    <div className="flex justify-center relative z-1 h-fit lg:translate-x-1/2 rounded lg:w-1/2 mt-9">
      <div className="flex justify-center w-full">
        <div className="grid w-full">
          <div className="bg-white shadow rounded text-lg text-black font-semibold p-3">
            <p className="px-2 mb-2">Histórico</p>
            <div className="grid grid-cols-3">
              {filtros.map((filtro, index) => (
                <span
                  key={index}
                  onClick={() => setSelecionado(filtro)}
                  className={`text-sm px-7 flex justify-center mx-2 cursor-pointer ${
                    selecionado === filtro && "bg-gray"
                  } hover:bg-stroke rounded-full p-2 border-stroke`}
                >
                  {filtro}
                </span>
              ))}
            </div>
          </div>
          {dadosLogs.map((nota: any, index: number) => (
            <React.Fragment key={index}>
              <div className="flex shadow p-3 m-2 mx-0 justify-between rounded-sm bg-white">
                <div className="grid gap-2 max-w-[77%]">
                  <div className="flex items-start gap-2 flex-wrap">
                    {nota.icone_cfg_historico_funil && (
                      <GetIcon
                        icon={nota.icone_cfg_historico_funil}
                        size={40}
                        className={`bg-${nota.cor_cfg_historico_funil} text-${nota.cor_cfg_historico_funil} rounded-md p-1 bg-opacity-30`}
                      />
                    )}

                    <span className="font-semibold">
                      {nota.id_cfg_historico_funil === 1
                        ? "Nota adicionada"
                        : "Ação"}
                    </span>
                  </div>
                  <span className="pl-2 flex-wrap flex">
                    {nota.descricao_log_kanban}
                  </span>
                </div>
                <div className="text-sm gap-1  flex items-start">
                  <span className="font-medium">
                    {FormatFields.formatarDataHora(nota.datahora_log_kanban)}
                  </span>
                  <Avatar nome_responsavel={nomeResponsavel} />
                </div>
              </div>
              <hr className="w-9 -z-1 ml-5 bg-body h-[3px] rotate-90" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Historico;
