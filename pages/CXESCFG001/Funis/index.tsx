import Button from "@/components/Forms/Button";
import LoaderSun from "@/components/common/Loader/LoaderSun";
import {
    atualizarListasKanbans,
    criarNovoKanban,
    listarTodosKanbans,
    novaLista,
} from "@/requests/CRM/kanban";
import FunilContext from "@/src/contexts/boardContext";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Funil from "./Funil";

const FunisComponent = () => {
    const [funis, setFunis] = useState<any[]>([]);
    // const [isLoaded, setIsLoaded] = useState(false);
    const funnelsBar = useRef(null);

    useEffect(() => {
        // listarTodosKanbans().then((res) => setFunis(res));
        listarFunis();
        // setIsLoaded(true);
    }, []);

    const listarFunis = async () => {
        return listarTodosKanbans().then((res) => setFunis(res));
    };

    const atualizarFunis = async (
        transformFunction: any = undefined,
        canReList = true
    ) => {
        return setFunis((funis: any) => {
            if (transformFunction) {
                funis = transformFunction(funis);
            }
            const newKanbans = funis?.map((list: any, index: number) => {
                let newListas_kanban = list.listas_kanban.map(
                    (etapa: any, index2: any) => {
                        const updatedList = {
                            ...etapa,
                            index_lista_kanban: index2,
                            grupo_kanban: list.id_kanban,
                        };
                        return updatedList;
                    }
                );
                return {
                    ...list,
                    listas_kanban: newListas_kanban,
                    index_kanban: index,
                };
            });
            atualizarListasKanbans(newKanbans).finally(() => {
                if (canReList) {
                    return listarFunis();
                }
            });
            return newKanbans;
        });
    };

    const [isCreatedNewFunnel, setIsCreatedNewFunnel] = useState(false);

    function createNewFunnel() {
        // const maxId = Math.max(...funis.map((funnel) => funnel.id));
        const newFunnel = {
            titulo_kanban: `Funil ${funis.length + 1}`,
            // id_kanban: maxId + 1,
            index_kanban: funis.length,
            // steps: [],
            // status_kanban: 1,
            tipo_kanban: "projeto",
        };
        criarNovoKanban(newFunnel).finally(() => {
            // Ajustar as prioridades ao criar um novo kanban
            listarFunis().then(() => setIsCreatedNewFunnel(true));
        });
    }

    async function createNewStep(funnelId: number, stepTitle: string) {
        // Encontre o funil correspondente com base no funnelId
        const funnel = funis.find((funnel) => funnel["id_kanban"] == funnelId);
        // Crie o novo passo

        // const newStep = {
        //     titulo_kanban: stepTitle,
        //     grupo_kanban: funnelId,
        //     index_lista_kanban: funnel.listas_kanban.length,
        // };
        const newStep = {
            list: {
                title: stepTitle,
                creatable: "0",
            },
            kanbanId: funnelId,
            // index_lista_kanban: funnel.listas_kanban.length,
        };

        return novaLista(newStep).finally(() => listarFunis());

        // Atualize o estado com os novos passos
        // setFunis(updatedFunis);
    }

    function moveFunil(fromList: any, toList: any, from: any, to: any) {
        setFunis((prevFunis) => {
            const updatedLists = produce(prevFunis, (draft) => {
                const dragged = draft[fromList].listas_kanban[from];
                draft[fromList].listas_kanban.splice(from, 1);
                draft[toList].listas_kanban.splice(to, 0, dragged);
            });

            return updatedLists;
        });
    }

    return (
        <FunilContext.Provider value={{ funis, moveFunil, updatedList: funis }}>
            <div className="w-full flex flex-row">
                <Button
                    onClick={createNewFunnel}
                    className="bg-primary font-medium items-center gap-2 h-fit rounded-xl"
                >
                    <Plus size={15} />
                    Criar Novo Funil
                </Button>
            </div>
            <div className="w-full overflow-auto" ref={funnelsBar}>
                <section className="w-min pt-[10px]">
                    <div className="flex flex-row gap-5 overflow-auto w-full">
                        {funis &&
                            funis?.map((funil, index) => (
                                <Funil
                                    // key={funil.id_kanban}
                                    key={index}
                                    funil={funil}
                                    funis={funis}
                                    index={index}
                                    createNewStep={createNewStep}
                                    atualizarFunis={atualizarFunis}
                                    isCreatedNewFunnel={isCreatedNewFunnel}
                                    setIsCreatedNewFunnel={
                                        setIsCreatedNewFunnel
                                    }
                                    funnelsBar={funnelsBar}
                                />
                            ))}
                    </div>
                </section>
                {funis[0] == undefined && (
                    <div className="w-full h-[500px] flex flex-col justify-center items-center">
                        <LoaderSun />
                    </div>
                )}
            </div>
        </FunilContext.Provider>
    );
};

export default FunisComponent;
