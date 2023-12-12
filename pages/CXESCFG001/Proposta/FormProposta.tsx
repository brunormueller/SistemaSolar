import Button from "@/components/Forms/Button";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import ModalReact from "@/components/Modal/ModalReact";
import { GetForm } from "@/utils";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormProposta = ({
    onSubmitFunction,
    defaultValues,
    disabledFields,
    children,
    ...rest
}: any) => {
    const [yupSchema, setYupSchema] = useState<
        yup.ObjectSchema<{}, yup.AnyObject, {}, "">
    >(yup.object().shape({}));
    const [yupTemplateSchema, setYupTemplateSchema] = useState<
        yup.ObjectSchema<{}, yup.AnyObject, {}, "">
    >(yup.object().shape({}));
    const [isTemplateConfigOpen, setIsTemplateConfigOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(
        defaultValues?.template_proposta
            ? defaultValues["template_proposta"]
            : "1"
    );
    const [termos, setTermos] = useState<any[]>(
        (defaultValues && defaultValues["termos"]) || []
    );

    const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);
    const { ...formTemplate } = GetForm(
        yupTemplateSchema,
        setYupTemplateSchema
    );

    useEffect(() => {
        formTemplate.setValue("termos" as never, termos as never);
    }, [termos]);

    return (
        <>
            {isTemplateConfigOpen && (
                <ModalReact
                    open={isTemplateConfigOpen}
                    onClose={() => setIsTemplateConfigOpen(false)}
                    className="h-[90%] w-[90%] rounded-lg"
                    title="Edição do Template"
                >
                    <form
                        className="w-full flex flex-col justify-between items-center"
                        onSubmit={formTemplate.handleSubmit(onSubmitFunction)}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                gap: "1.25rem",
                                height: "100%",
                                width: "80%",
                                alignItems: "center",
                                paddingBottom: "5px",
                            }}
                        >
                            <InputSelectComponent
                                name="template_proposta"
                                label="Template da Proposta"
                                options={[
                                    {
                                        value: "1",
                                        label: "Template 1",
                                    },
                                    {
                                        value: "2",
                                        label: "Template 2",
                                    },
                                    {
                                        value: "3",
                                        label: "Template 3",
                                    },
                                    {
                                        value: "4",
                                        label: "Template 4",
                                    },
                                ]}
                                defaultValue={selectedTemplate}
                                formulario={formTemplate}
                                onChange={(e: any) =>
                                    setSelectedTemplate(e.value)
                                }
                                error="Informe o Template"
                                required
                            />
                            <div className="w-full">
                                <iframe
                                    src={`assets/templates/Template_${selectedTemplate}.pdf`}
                                    width="100%"
                                    height="420px"
                                />
                            </div>
                            <Input
                                name="quem_somos"
                                label="Quem Somos?"
                                formulario={formTemplate}
                                type="textarea"
                                defaultValue={
                                    defaultValues && defaultValues["quem_somos"]
                                }
                            />
                            <div className="w-full">
                                <div>Porque escolher</div>
                                <InputGroup>
                                    <Input
                                        name="motivo_escolha1"
                                        label="Motivo 1"
                                        formulario={formTemplate}
                                        defaultValue={
                                            defaultValues &&
                                            defaultValues["motivo_escolha1"]
                                        }
                                    />
                                    <Input
                                        name="motivo_escolha3"
                                        label="Motivo 3"
                                        formulario={formTemplate}
                                        defaultValue={
                                            defaultValues &&
                                            defaultValues["motivo_escolha3"]
                                        }
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Input
                                        name="motivo_escolha2"
                                        label="Motivo 2"
                                        formulario={formTemplate}
                                        defaultValue={
                                            defaultValues &&
                                            defaultValues["motivo_escolha2"]
                                        }
                                    />
                                    <Input
                                        name="motivo_escolha4"
                                        label="Motivo 4"
                                        formulario={formTemplate}
                                        defaultValue={
                                            defaultValues &&
                                            defaultValues["motivo_escolha4"]
                                        }
                                    />
                                </InputGroup>
                            </div>
                            <div className="w-full">
                                <label htmlFor="termos">Termos</label>
                                <table className="w-full  rounded">
                                    <thead>
                                        <tr>
                                            <th className="p-1">Item</th>
                                            <th className="p-1">Descrição</th>
                                            <th className="p-1">Remover</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {termos.map((termo, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="p-1 pl-2">
                                                        <Input
                                                            type="textarea"
                                                            name=""
                                                            // className="w-full rounded p-2 dark:bg-[#1d2a39]"
                                                            defaultValue={
                                                                termo.item
                                                            }
                                                            onChange={(e) =>
                                                                setTermos(
                                                                    termos.map(
                                                                        (
                                                                            t,
                                                                            i
                                                                        ) => {
                                                                            return {
                                                                                ...t,
                                                                                item:
                                                                                    index ==
                                                                                    i
                                                                                        ? e
                                                                                              .target
                                                                                              .value
                                                                                        : t.item,
                                                                            };
                                                                        }
                                                                    )
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                    <td className="p-1">
                                                        <Input
                                                            type="textarea"
                                                            name=""
                                                            // className="w-full rounded p-2 dark:bg-[#1d2a39]"
                                                            defaultValue={
                                                                termo.descricao
                                                            }
                                                            onChange={(e) =>
                                                                setTermos(
                                                                    termos.map(
                                                                        (
                                                                            t,
                                                                            i
                                                                        ) => {
                                                                            return {
                                                                                ...t,
                                                                                descricao:
                                                                                    index ==
                                                                                    i
                                                                                        ? e
                                                                                              .target
                                                                                              .value
                                                                                        : t.descricao,
                                                                            };
                                                                        }
                                                                    )
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                    <td>
                                                        <center>
                                                            <Button
                                                                className="bg-danger"
                                                                type="button"
                                                                onClick={() =>
                                                                    setTermos(
                                                                        termos.filter(
                                                                            (
                                                                                t,
                                                                                i
                                                                            ) =>
                                                                                i !==
                                                                                index
                                                                        )
                                                                    )
                                                                }
                                                            >
                                                                -
                                                            </Button>
                                                        </center>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div className="w-full flex flex-row justify-center">
                                    <Button
                                        className="bg-secondaryMenu"
                                        type="button"
                                        onClick={() =>
                                            setTermos([
                                                ...termos,
                                                { item: "", descricao: "" },
                                            ])
                                        }
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row-reverse py-3 w-full bg-bodydark dark:bg-black text-white">
                            <div className="flex flex-row gap-2">
                                <Button
                                    type="button"
                                    onClick={() =>
                                        setIsTemplateConfigOpen(false)
                                    }
                                    className="bg-body"
                                >
                                    Cancelar
                                </Button>
                                <Button>Salvar</Button>
                            </div>
                        </div>
                    </form>
                </ModalReact>
            )}
            <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
                <InputGroup align="center items-end">
                    <Button
                        type="button"
                        onClick={() => setIsTemplateConfigOpen(true)}
                        className="bg-primary font-medium items-center gap-2 h-fit rounded-xl"
                    >
                        <Settings size={16} />
                        Configurar Template
                    </Button>
                </InputGroup>

                <InputGroup align="center">
                    <Input
                        name="tempo_validade_proposta_parametro"
                        label="Validade da Proposta"
                        formulario={form}
                        mascara="numerico"
                        error="Informe o Tempo da Validade da Proposta"
                        required
                        defaultValue={
                            defaultValues &&
                            defaultValues["tempo_validade_proposta_parametro"]
                        }
                    />
                    <Input
                        name="adicional_maximo_parametro"
                        label="Adicional Máx. Proposta(%)"
                        formulario={form}
                        mascara="numero"
                        error="Informe o Adicional"
                        required
                        defaultValue={
                            defaultValues &&
                            defaultValues["adicional_maximo_parametro"]
                        }
                        maxLength={6}
                    />
                    <Input
                        name="desconto_maximo_parametro"
                        label="Desconto Máx. Proposta(%)"
                        formulario={form}
                        mascara="numero"
                        error="Informe o Desconto"
                        required
                        defaultValue={
                            defaultValues &&
                            defaultValues["desconto_maximo_parametro"]
                        }
                        maxLength={5}
                    />
                </InputGroup>
                <InputGroup align="center">
                    <Input
                        name="reajuste_rsi_parametro"
                        label="Reajuste RSI (%)"
                        formulario={form}
                        mascara="numero"
                        error="Informe o Reajuste"
                        required
                        defaultValue={
                            defaultValues &&
                            defaultValues["reajuste_rsi_parametro"]
                        }
                        maxLength={5}
                    />
                    <Input
                        name="margem_depreciacao_parametro"
                        label="Margem de depreciação dos módulos(%)"
                        formulario={form}
                        mascara="numero"
                        error="Informe a Margem de Depreciação dos módulos"
                        required
                        defaultValue={
                            defaultValues &&
                            defaultValues["margem_depreciacao_parametro"]
                        }
                    />
                    <Input
                        name="margem_geracao_parametro"
                        label="Margem de geração (%)"
                        formulario={form}
                        mascara="numero"
                        error="Informe a Margem de Geração"
                        required
                        defaultValue={
                            defaultValues &&
                            defaultValues["margem_geracao_parametro"]
                        }
                    />
                </InputGroup>
                {children}
            </form>
        </>
    );
};

export default FormProposta;
