import { useDrop } from "react-dnd";

import Button from "@/components/Forms/Button";
import Input from "@/components/Forms/Input";
import ModalReact from "@/components/Modal/ModalReact";
import boardContext from "@/src/contexts/boardContext";
import { GetForm } from "@/utils";
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { MdDragIndicator, MdEdit } from "react-icons/md";
import * as yup from "yup";
import Step from "./Step";
// import { useScrollTrigger } from "@mui/material";

const Funil = ({
    funil,
    funis,
    createNewStep,
    index: indexFunil,
    atualizarFunis,
    isCreatedNewFunnel,
    setIsCreatedNewFunnel,
    funnelsBar,
}: any) => {
    const steps = funil.listas_kanban;
    const [isCreatingStep, setIsCreatingStep] = useState(false);
    const [isEditName, setIsEditName] = useState(false);
    const [funilName, setFunilName] = useState(funil.titulo_kanban);
    const [isLoading, setIsLoading] = useState(false);
    const [showFunnelButtons, setShowFunnelButtons] = useState(false);
    const [canDeleteFunnel, setCanDeleteFunnel] = useState(false);

    const stepArea = useRef(null);

    useEffect(() => {
        if (isCreatedNewFunnel) {
            const barraDeFunis: any = funnelsBar.current;
            barraDeFunis.scrollLeft = barraDeFunis.scrollWidth;
            setIsCreatedNewFunnel(false);
        }
    }, [isCreatedNewFunnel]);

    const [yupSchema, setYupSchema] = useState<
        yup.ObjectSchema<{}, yup.AnyObject, {}, "">
    >(yup.object().shape({}));
    const [yupDeleteFunnelSchema, setYupDeleteFunnelSchema] = useState<
        yup.ObjectSchema<{}, yup.AnyObject, {}, "">
    >(yup.object().shape({}));
    const [showDeleteFunnel, setShowDeleteFunnel] = useState(false);

    const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);
    const { ...formDeleteFunnel } = GetForm(
        yupDeleteFunnelSchema,
        setYupDeleteFunnelSchema
    );

    const { moveFunil }: any = useContext(boardContext);

    const onSubmitStep = (data: any) => {
        setIsLoading(true);
        createNewStep(funil.id_kanban, data.title).then(() => {
            setIsCreatingStep(false);
            setIsLoading(false);
        });
    };

    const deleteFunnel = (data: any) => {
        atualizarFunis((funis: any) => {
            if (data.id_funil_destino != undefined) {
                const indexFunilDestino = funis.indexOf(
                    (f: any) => f.id_kanban == data.id_funil_destino
                );
                const funilDestino = funis.find(
                    (f: any) => f.id_kanban == data.id_funil_destino
                );
                const novasEtapasFunilDestino = [
                    ...funilDestino.listas_kanban,
                    ...steps,
                ];
                funilDestino["listas_kanban"] = novasEtapasFunilDestino;

                funis.splice(indexFunilDestino, 1, funilDestino);
            }
            return funis.filter(
                (funnel: any) => funnel.id_kanban != funil.id_kanban
            );
        }, false).then(() => handleShowDeleteFunnel());
    };

    // const [{ isOver }, dragFunnel] = useDrop({
    const [{ isOver }, dragFunnel] = useDrop({
        accept: "step",
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
        drop: (item: any) => {
            moveFunil(
                item.funilIndex,
                indexFunil,
                item.index,
                item.index,
                true
            );
        },
    });

    const handleShowDeleteFunnel = () => {
        setShowDeleteFunnel(!showDeleteFunnel);
    };

    const moveFunnel = (position: number) => {
        atualizarFunis((prevFunnels: any) => {
            const newFunnels = prevFunnels;
            const proximoFunnel =
                newFunnels[Number(funil.index_kanban) + position];

            newFunnels[Number(funil.index_kanban)] = proximoFunnel;
            newFunnels[Number(funil.index_kanban) + position] = funil;
            return newFunnels;
        }, false);
    };

    return dragFunnel(
        <div className="border-2  rounded-lg w-[300px] overflow-hidden flex-1 h-[470px] flex flex-col justify-between">
            <div
                onMouseOver={() => setShowFunnelButtons(true)}
                onMouseOut={() => setShowFunnelButtons(false)}
                className="flex flex-row justify-between items-center bg-black-2 bg-opacity-10 px-4 py-2"
            >
                <h3 className="text-current font-bold flex flex-row items-center">
                    {isEditName ? (
                        <input
                            defaultValue={funil.titulo_kanban}
                            placeholder={funil.titulo_kanban}
                            onInput={(e: any) => setFunilName(e.target.value)}
                            className="dark:bg-black p-2 rounded-md"
                        />
                    ) : (
                        <div className="p-2">{funil.titulo_kanban}</div>
                    )}{" "}
                    {showFunnelButtons && (
                        <>
                            <button
                                className="p-2 hover:bg-black-2 hover:bg-opacity-10 rounded-full"
                                onClick={() => {
                                    if (isEditName) {
                                        atualizarFunis((prevFunis: any) => {
                                            prevFunis.map((f: any) => {
                                                if (
                                                    f.id_kanban ==
                                                    funil.id_kanban
                                                ) {
                                                    f.titulo_kanban = funilName;
                                                }
                                                return f;
                                            });
                                            return prevFunis;
                                        });
                                    }
                                    setIsEditName(!isEditName);
                                }}
                            >
                                <MdEdit />
                            </button>
                            {!["1", "2", "3"].includes(funil.id_kanban) && (
                                <button
                                    className="p-2 hover:bg-black-2 hover:bg-opacity-10 rounded-full"
                                    onClick={handleShowDeleteFunnel}
                                >
                                    <FaTrash />
                                </button>
                            )}
                            <button
                                className="p-2 hover:bg-black-2 hover:bg-opacity-10 rounded-full"
                                onClick={() => moveFunnel(-1)}
                                disabled={funil.index_kanban < 1}
                            >
                                <BiArrowBack />
                            </button>
                            <button
                                className="p-2 hover:bg-black-2 hover:bg-opacity-10 rounded-full transform -scale-x-100"
                                onClick={() => moveFunnel(1)}
                                disabled={funil.index_kanban >= funis.length}
                            >
                                <BiArrowBack />
                            </button>
                        </>
                    )}
                </h3>
                <MdDragIndicator />
            </div>
            <ul
                // ref={dropStep}
                className="p-4   transition-all  flex flex-col gap-1 h-full overflow-auto"
                ref={stepArea}
            >
                {steps?.map((step: any, index: number) => (
                    <Step
                        key={step.id_kanban}
                        // key={index}
                        funil={funil}
                        step={step}
                        funis={funis}
                        index={index}
                        atualizarFunis={atualizarFunis}
                    />
                ))}
            </ul>
            <button
                type="button"
                onClick={() => setIsCreatingStep(true)}
                className="bg-black bg-opacity-10 p-6 flex flex-row items-center justify-center gap-2 font-bold"
            >
                <AiOutlinePlusCircle /> Adicionar Etapa
            </button>
            <ModalReact
                title="Criar Nova Etapa"
                open={isCreatingStep}
                onClose={() => setIsCreatingStep(false)}
            >
                <form onSubmit={handleSubmit(onSubmitStep)}>
                    <div className="p-4">
                        <Input
                            name="title"
                            label="Nome"
                            formulario={form}
                            required
                            error="Escreva o nome"
                        />
                        <Input
                            name="validade_kanban"
                            label="Validade (dias)"
                            formulario={form}
                            mascara="numerico"
                            required
                            error="Escreva a Validade"
                        />
                    </div>
                    <div className="flex flex-row-reverse py-3 w-full bg-bodydark dark:bg-black-2 text-white px-4">
                        <div className="flex flex-row gap-2">
                            <Button
                                type="button"
                                onClick={() => setIsCreatingStep(false)}
                                className="bg-body"
                            >
                                Cancelar
                            </Button>
                            <Button loading={isLoading}>Salvar</Button>
                        </div>
                    </div>
                </form>
            </ModalReact>
            <ModalReact
                title={`Confirma deletar ${funil.titulo_kanban}`}
                open={showDeleteFunnel}
                onClose={handleShowDeleteFunnel}
            >
                <form
                    onSubmit={formDeleteFunnel.handleSubmit(deleteFunnel)}
                    // className="p-4 h-[430px]"
                    className="p-4 min-h-[427px]"
                >
                    {steps.length > 0 && steps?.cards_kanban?.length > 0 ? (
                        <>
                            <div>
                                Para deletar um funil é necessário que as etapas
                                não contenham nenhum card nele!
                            </div>
                            {/* <div>Selecione um funil para enviar as etapas</div>
                            <InputSelectComponent
                                name="id_funil_destino"
                                label="Funil"
                                formulario={formDeleteFunnel}
                                options={funis
                                    .filter(
                                        (f: any) =>
                                            f.id_kanban != funil.id_kanban
                                    )
                                    .map((f: any) => ({
                                        value: f.id_kanban,
                                        label: f.titulo_kanban,
                                    }))}
                                error="Selecione um funil disponível"
                                required
                            />
                            <div>
                                <div className="font-bold">
                                    Etapas Enviadas:
                                </div>
                                {steps.map((step: any, index: number) => (
                                    <div key={index}>{step?.titulo_kanban}</div>
                                ))}
                            </div> */}
                        </>
                    ) : (
                        <>
                            <div>
                                Tem certeza que deseja continuar com a deleção
                                do funil?
                            </div>
                            {steps.length > 0 && (
                                <span className="underline underline-offset-2">
                                    (Todas as etapas dele também serão apagadas)
                                </span>
                            )}
                        </>
                    )}
                    {/* {canDeleteFunnel
                    
                    } */}
                    <div className="w-full flex flex-row items-center justify-center gap-3 pt-4">
                        <Button
                            type="button"
                            onClick={handleShowDeleteFunnel}
                            className="bg-body"
                        >
                            Cancelar
                        </Button>
                        <Button loading={isLoading}>Salvar</Button>
                    </div>
                </form>
            </ModalReact>
        </div>
    );
};

export default Funil;
