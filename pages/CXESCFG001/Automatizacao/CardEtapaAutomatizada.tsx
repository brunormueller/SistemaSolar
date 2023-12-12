import Button from "@/components/Forms/Button";
import InputSelectComponent from "@/components/Forms/InputSelect";
import ModalReact from "@/components/Modal/ModalReact";
import { GetForm } from "@/utils";
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import * as yup from "yup";

const CardEtapaAutomatizada = ({
    etapaAtual,
    etapaDestino,
    funilDestino,
    funis,
    etapas,
    isLoading,
    removerAutomatizacao,
    onSubmitFunction,
}: any) => {
    const [isEditCard, setIsEditCard] = useState(false);
    const [yupSchema, setYupSchema] = useState<
        yup.ObjectSchema<{}, yup.AnyObject, {}, "">
    >(yup.object().shape({}));

    const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

    const [selectedFunil, setSelectedFunil] = useState<any>(
        funilDestino && funilDestino?.id_kanban
    );

    const editEtapaAutomatizada = (data: any) => {
        data["acao_automatizacao"] = etapaAtual["id_kanban"];
        onSubmitFunction(data).then(() => setIsEditCard(false));
    };

    return (
        <tr className="hover:bg-primary hover:bg-opacity-10">
            <td className="w-0 pl-2" onClick={() => setIsEditCard(true)}>
                <button
                    type="button"
                    onClick={() => setIsEditCard(true)}
                    className="rounded-full p-3 hover:bg-black-2 hover:bg-opacity-20 hover:text-white"
                >
                    <MdEdit />
                </button>
                {isEditCard && (
                    <ModalReact
                        open={isEditCard}
                        onClose={() => setIsEditCard(false)}
                        title={`Automação da: ${etapaAtual?.titulo_kanban}`}
                    >
                        {funilDestino && etapaDestino && (
                            <form
                                className="p-4 flex flex-col gap-2"
                                onSubmit={handleSubmit(editEtapaAutomatizada)}
                            >
                                <div>
                                    <InputSelectComponent
                                        name="funil_destino"
                                        label="Funil"
                                        formulario={form}
                                        options={funis.map((funil: any) => ({
                                            value: String(funil.id_kanban),
                                            label: funil.titulo_kanban,
                                        }))}
                                        onChange={(e: any) =>
                                            setSelectedFunil(String(e.value))
                                        }
                                        defaultValue={funilDestino?.id_kanban}
                                        error="Selecione um funil"
                                        required
                                    />
                                </div>
                                <div>
                                    {selectedFunil && (
                                        <InputSelectComponent
                                            name="etapa_destino_automatizacao"
                                            label="Etapa Destino"
                                            formulario={form}
                                            options={etapas
                                                .filter(
                                                    (etapa: any) =>
                                                        etapa.grupo_kanban ==
                                                            selectedFunil &&
                                                        etapa.id_kanban !=
                                                            etapaAtual.id_kanban
                                                )
                                                .map((etapa: any) => ({
                                                    value: String(
                                                        etapa.id_kanban
                                                    ),
                                                    label: etapa.titulo_kanban,
                                                }))}
                                            defaultValue={
                                                etapaDestino?.id_kanban
                                            }
                                            error="Selecione uma etapa"
                                            required
                                        />
                                    )}
                                </div>
                                <div className="flex flex-row w-full justify-center gap-2">
                                    <Button
                                        type="button"
                                        onClick={() => setIsEditCard(false)}
                                        className="bg-bodydark2"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            removerAutomatizacao(
                                                etapaAtual["id_kanban"]
                                            ).then(() => setIsEditCard(false))
                                        }
                                        type="button"
                                        loading={isLoading}
                                        className="bg-danger"
                                    >
                                        Remover
                                    </Button>
                                    <Button loading={isLoading}>Salvar</Button>
                                </div>
                            </form>
                        )}
                    </ModalReact>
                )}
            </td>
            <td className="p-2 text-center">
                <div className="bg-white dark:bg-black rounded p-1">
                    {etapaAtual?.titulo_kanban}
                </div>
            </td>
            <td className="w-0">
                <FaLongArrowAltRight />
            </td>
            <td className="p-2 text-center">
                <div className="bg-white dark:bg-black rounded p-1">
                    {funilDestino?.titulo_kanban}
                </div>
            </td>
            <td className="w-0">
                <FaLongArrowAltRight />
            </td>
            <td className="p-2 text-center">
                <div className="bg-white dark:bg-black rounded p-1">
                    {etapaDestino?.titulo_kanban}
                </div>
            </td>
        </tr>
    );
};

export default CardEtapaAutomatizada;
