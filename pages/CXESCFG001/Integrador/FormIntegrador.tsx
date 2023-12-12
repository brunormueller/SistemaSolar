import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputImg from "@/components/Forms/InputImg";
import InputSelectComponent from "@/components/Forms/InputSelect";
import {
    ICidade,
    IEstado,
    listarCidades,
    listarEstados,
} from "@/requests/common/EstadosCidades/estadosCidades";
import { IValueLabel } from "@/types/formInterfaces";
import { GetForm } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";
let count = 0;

const FormIntegrador = ({
    onSubmitFunction,
    defaultValues,
    disabledFields,
    children,
    classForm,
    ...rest
}: any) => {
    const [yupSchema, setYupSchema] = useState<
        yup.ObjectSchema<{}, yup.AnyObject, {}, "">
    >(yup.object().shape({}));

    const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);
    const [estados, setEstados] = useState<any[]>([]);
    const [cidades, setCidades] = useState<ICidade[]>([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState<string>(
        defaultValues && defaultValues["estado_cliente_linksun"]
    );
    const [cidadeSelecionada, setCidadeSelecionada] = useState<any>(
        defaultValues && defaultValues["cidade_cliente_linksun"]
    );

    useEffect(() => {
        listarEstados().then((arr) => setEstados(arr));
        listarCidades().then((arr) => setCidades(arr));
    }, []);

    useEffect(() => {
        if (
            estadoSelecionado !=
            (defaultValues && defaultValues["estado_cliente_linksun"])
        ) {
            setCidadeSelecionada(
                cidades.find(
                    (cidade) =>
                        cidade.estado_cidade ==
                        estados.find(
                            (estado) => estado.uf_estado == estadoSelecionado
                        )?.id_estado
                )?.nome_cidade
            );
        } else {
            setCidadeSelecionada(
                defaultValues && defaultValues["cidade_cliente_linksun"]
            );
        }
    }, [estadoSelecionado]);

    return (
        <form
            className={classForm}
            onSubmit={handleSubmit(onSubmitFunction)}
            {...rest}
        >
            <InputGroup>
                <InputSelectComponent
                    name="estado_cliente_linksun"
                    label="Estado"
                    width="xl:w-1/1"
                    options={estados.map((estado: IEstado) => ({
                        label: `${estado.uf_estado} - ${estado.nome_estado}`,
                        value: `${estado.uf_estado}`,
                    }))}
                    formulario={form}
                    onChange={(e: any) => setEstadoSelecionado(e.value)}
                    onClick={() => console.log("Click Estado")}
                    required
                    error="Selecione o estado"
                    defaultValue={estadoSelecionado}
                    disabled={disabledFields?.some(
                        (field: string) => field == "estado_cliente_linksun"
                    )}
                />
                <InputSelectComponent
                    name="cidade_cliente_linksun"
                    label="cidade"
                    options={cidades
                        .filter(
                            (cidade) =>
                                cidade.estado_cidade ==
                                estados.find(
                                    (estado) =>
                                        estado.uf_estado == estadoSelecionado
                                )?.id_estado
                        )
                        .map<IValueLabel>((cidade: ICidade) => ({
                            label: cidade.nome_cidade,
                            value: cidade.nome_cidade,
                        }))}
                    formulario={form}
                    required
                    error="Selecione a cidade"
                    defaultValue={cidadeSelecionada}
                    disabled={disabledFields?.some(
                        (field: string) => field == "cidade_cliente_linksun"
                    )}
                />
                <Input
                    name="telefone_cliente_linksun"
                    label="Telefone"
                    formulario={form}
                    mascara="telefone"
                    error={"Preencha o Telefone"}
                    required
                    defaultValue={
                        defaultValues &&
                        defaultValues["telefone_cliente_linksun"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "telefone_cliente_linksun"
                    )}
                />
            </InputGroup>
            <div>
                <label
                    htmlFor="logo_integrador"
                    className="mb-2.5 block text-black dark:text-white whitespace-nowrap"
                >
                    Logo
                </label>
                <InputImg />
            </div>
            <br />
            <div className="flex justify-center items-center w-full">
                {children}
            </div>
        </form>
    );
};

export default FormIntegrador;
