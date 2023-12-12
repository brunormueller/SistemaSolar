import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarRegioesVenda } from "@/requests/CRUD/RegiaoVenda/listarRegioesVenda";
import {
    ICidade,
    IEstado,
    listarCidades,
    listarEstados,
} from "@/requests/common/EstadosCidades/estadosCidades";
import { IValueLabel } from "@/types/formInterfaces";
import { FormatFields, GetForm, valueLabel } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormIrradicaoGlobal = ({
    onSubmitFunction,
    defaultValues,
    disabledFields,
    children,
    ...rest
}: any) => {
    const [yupSchema, setYupSchema] = useState<
        yup.ObjectSchema<{}, yup.AnyObject, {}, "">
    >(yup.object().shape({}));

    const [valoresIrradiacao, setValoresIrradiacao] = useState<string[]>([]);
    const [regioesVenda, setRegioesVenda] = useState<IValueLabel[]>([]);
    const [estados, setEstados] = useState<any[]>([]);
    const [cidades, setCidades] = useState<ICidade[]>([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");

    const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

    useEffect(() => {
        listarEstados().then((arr) => setEstados(arr));

        listarCidades().then((arr) => setCidades(arr));

        listarRegioesVenda().then((arr) => {
            arr = arr.filter((e: any) => e.status_regiao_venda == 1);
            return setRegioesVenda(
                valueLabel(arr, "nome_regiao_venda", "id_regiao_venda")
            );
        });
    }, []);

    const setIrradiacaoIndexValue = (e: any, index: number) => {
        let newValoresIrradiacao = valoresIrradiacao;
        newValoresIrradiacao[index] = e.target.value;
        setValoresIrradiacao(newValoresIrradiacao);

        let valores = valoresIrradiacao.map<number>((valor) => {
            return parseFloat(valor.replaceAll(".", "").replace(",", "."));
        });
        form.setValue(
            "media_irradiacao" as never,
            FormatFields.formatarNumero(
                (
                    valores.reduce((prev, curr) => prev + curr, 0) /
                    valores.filter((valor) => typeof valor == "number").length
                ).toFixed(2)
            ) as never
        );
    };

    const meses = [
        "janeiro",
        "fevereiro",
        "marco",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
    ];

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
                <InputGroup>
                    <InputSelectComponent
                        name="uf_irradiacao"
                        label="UF"
                        options={estados.map((estado: IEstado) => ({
                            label: `${estado.uf_estado} - ${estado.nome_estado}`,
                            value: `${estado.uf_estado}`,
                        }))}
                        formulario={form}
                        onChange={(e: any) => {
                            form.setValue(
                                "cidade_irradiacao" as never,
                                "" as never
                            );
                            return setEstadoSelecionado(e.value);
                        }}
                        required
                        error="Selecione o estado"
                        defaultValue={
                            defaultValues && defaultValues["uf_irradiacao"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "uf_irradiacao"
                        )}
                    />
                    <InputSelectComponent
                        name="cidade_irradiacao"
                        label="cidade"
                        options={cidades
                            .filter(
                                (cidade) =>
                                    cidade.estado_cidade ==
                                    estados.find(
                                        (estado) =>
                                            estado.uf_estado ==
                                            estadoSelecionado
                                    )?.id_estado
                            )
                            .map<IValueLabel>((cidade: ICidade) => ({
                                label: cidade.nome_cidade,
                                value: cidade.nome_cidade,
                            }))}
                        formulario={form}
                        required
                        error="Selecione a cidade"
                        defaultValue={
                            defaultValues && defaultValues["cidade_irradiacao"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "cidade_irradiacao"
                        )}
                    />
                </InputGroup>
                <InputGroup wrap="wrap" align="center">
                    {/* <Button type="button" onClick={()=>console.log(yupSchema)}>Teste</Button> */}
                    {meses.map((mes, index) => (
                        <Input
                            key={index}
                            name={`${mes}_irradiacao`}
                            label={mes != "marco" ? mes : "março"}
                            formulario={form}
                            error={`Preencha ${mes}`}
                            mascara="numero"
                            required
                            onChange={(e) => setIrradiacaoIndexValue(e, index)}
                            width="xl:w-[32%]"
                            defaultValue={
                                defaultValues &&
                                defaultValues[`${mes}_irradiacao`]
                            }
                            disabled={disabledFields?.some(
                                (field: string) => field == `${mes}_irradiacao`
                            )}
                        />
                    ))}
                    <Input
                        name="media_irradiacao"
                        label="média"
                        formulario={form}
                        error="Preencha os meses"
                        // defaultValue="0,00"
                        // value={FormatFields.formatarNumero(
                        //     media.toFixed(2)
                        // )}
                        required
                        disabled
                        width="xl:w-[32%]"
                        defaultValue={
                            defaultValues && defaultValues["media_irradiacao"]
                        }
                    />
                    <Input
                        name="inclinacao_irradiacao"
                        label="inclinação"
                        formulario={form}
                        error="Preencha a inclinacao"
                        required
                        width="xl:w-[32%]"
                        prefix="º"
                        mascara="numerico"
                        defaultValue={
                            defaultValues &&
                            defaultValues["inclinacao_irradiacao"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "inclinacao_irradiacao"
                        )}
                    />
                    <InputSelectComponent
                        name="regiao_irradiacao"
                        label="região"
                        formulario={form}
                        options={regioesVenda}
                        error="Preencha a regiao"
                        required
                        width="xl:w-[32%]"
                        defaultValue={
                            defaultValues && defaultValues["regiao_irradiacao"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "regiao_irradiacao"
                        )}
                    />
                </InputGroup>
                {children}
            </form>
        </>
    );
};

export default FormIrradicaoGlobal;
