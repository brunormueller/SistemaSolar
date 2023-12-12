import Button from "@/components/Forms/Button";
import {
    cadastrarAutomatizacao,
    deletarAutomatizacao,
    editarAutomatizacao,
    listarAutomatizacoes,
    listarTodosKanbans,
} from "@/requests/CRM/kanban";
import { useEffect, useState } from "react";
import CardEtapaAutomatizada from "./CardEtapaAutomatizada";
import FormParametorosAutomatizacao from "./FomParametrosAutomatizacao";

const FomParametrosAutomatizacaoComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [etapasAutomatizadas, setEtapasAutomatizadas] = useState<any[]>([]);

    const [etapas, setEtapas] = useState<any[]>([]);
    const [funis, setFunis] = useState<any[]>([]);

    useEffect(() => {
        listarFunis();
        atualizarListaAutomatizacoes();
    }, []);

    const atualizarListaAutomatizacoes = () => {
        listarAutomatizacoes().then((res: any) => setEtapasAutomatizadas(res));
    };

    useEffect(() => {
        setEtapas([...funis.map((funil) => funil.listas_kanban).flat()]);
    }, [funis]);

    const listarFunis = () => {
        listarTodosKanbans().then((res) => setFunis(res));
    };

    const removerAutomatizacao = async (id_etapa: any) => {
        setIsLoading(true);
        return deletarAutomatizacao({ acao_automatizacao: id_etapa }).finally(() => {
            setIsLoading(false);
            atualizarListaAutomatizacoes();
        })
    };

    // const statusEtapa = ["Cancelada", "Em Andamento", "Concluído"];

    const onSubmitFunction = async (data: any) => {
        setIsLoading(true);
        const { funil_destino, ...formattedData } = data;
        data = formattedData;

        const indexOfEtapa = etapasAutomatizadas.findIndex(
            (e: any) => e.acao_automatizacao == data.acao_automatizacao
        );
        if (indexOfEtapa == -1) {
            // return [...etapasAuto, data];
            cadastrarAutomatizacao(data).finally(() => {
                atualizarListaAutomatizacoes();

                setIsLoading(false);
            });
        } else {
            // return etapasAuto.splice(indexOfEtapa, 1, data);
            editarAutomatizacao(data).finally(() => {
                setEtapasAutomatizadas((etapasAuto) => {
                    etapasAuto.splice(indexOfEtapa, 1, data);
                    return etapasAuto;
                });

                setIsLoading(false);
                atualizarListaAutomatizacoes()
            });
        }
    };

    return (
        <>
            <FormParametorosAutomatizacao
                onSubmitFunction={onSubmitFunction}
                // className="h-[400px]"
                funis={funis}
                etapas={etapas}
                etapasDisponiveis={etapas.filter(
                    (etapa) =>
                        [
                            "Geração da Proposta",
                            "Envio da Proposta",
                            "Geração do Contrato",
                            "Envio do Contrato",
                        ].includes(etapa.titulo_kanban) &&
                        !etapasAutomatizadas.some(
                            (e) => e.acao_automatizacao == etapa.id_kanban
                        )
                )}
            >
                <div className="w-full flex flex-row justify-center p-4">
                    <Button loading={isLoading}>Salvar</Button>
                </div>
            </FormParametorosAutomatizacao>
            <div
                className={`flex ${
                    etapasAutomatizadas.length > 0 ? "flex-col" : "flex-row"
                } bg-body bg-opacity-10 rounded-md min-h-[200px]`}
            >
                {etapasAutomatizadas.length > 0 ? (
                    <table>
                        <tbody>
                            {funis &&
                                etapas &&
                                etapasAutomatizadas?.map((etapaAuto, index) => {
                                    const etapaAtual = etapas.find(
                                        (etapa: any) =>
                                            etapa.id_kanban ==
                                            etapaAuto.acao_automatizacao
                                    );
                                    const etapaDestino = etapas.find(
                                        (etapa: any) =>
                                            etapa.id_kanban ==
                                            etapaAuto.etapa_destino_automatizacao
                                    );
                                    const funilDestino = funis.find(
                                        (funil: any) =>
                                            funil.id_kanban ==
                                            etapaDestino?.grupo_kanban
                                    );
                                    return funilDestino?.id_kanban && (
                                        <CardEtapaAutomatizada
                                            etapaAtual={etapaAtual}
                                            etapaDestino={etapaDestino}
                                            funilDestino={funilDestino}
                                            funis={funis}
                                            etapas={etapas}
                                            onSubmitFunction={onSubmitFunction}
                                            isLoading={isLoading}
                                            removerAutomatizacao={removerAutomatizacao}
                                            key={index}
                                        />
                                    );
                                })}
                        </tbody>
                    </table>
                ) : (
                    <div className="w-full h-full flex flex-col justify-center items-center self-center">
                        Não há etapas Configuradas
                    </div>
                )}
            </div>
        </>
    );
};

export default FomParametrosAutomatizacaoComponent;
