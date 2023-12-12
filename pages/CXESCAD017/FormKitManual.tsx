import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import {
    listarInversores,
    listarPotenciaModulos,
} from "@/requests/CRUD/KitManual/cadastroKitManual";
import { GetForm } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormKitManual = ({
    onSubmitFunction,
    defaultValues,
    disabledFields,
    children,
    ...rest
}: any) => {
    const [yupSchema, setYupSchema] = useState<
        yup.ObjectSchema<{}, yup.AnyObject, {}, "">
    >(yup.object().shape({}));
    const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

    const [dadosPotencia, setDadosPotencia] = useState([]);
    const [dadosInversores, setDadosInversores] = useState([]);

    const arrayFiname = [
        { value: "", label: "Selecione..." },
        { value: "0", label: "Não" },
        { value: "1", label: "Sim" },
    ];

    useEffect(() => {
        const buscarPotenciasModulo = async () => {
            try {
                const response = await listarPotenciaModulos();
                // console.log(response);
                setDadosPotencia(response.body.potencias);
            } catch (error) {
                console.log(error);
            }
        };

        const buscarInversores = async () => {
            try {
                const response = await listarInversores();
                // console.log(response);
                setDadosInversores(response.body.inversores);
            } catch (error) {
                console.log(error);
            }
        };

        buscarPotenciasModulo();
        buscarInversores();
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
                <InputGroup align="center">
                    <InputSelectComponent
                        label="FINAME"
                        width="xl:w-1/3"
                        options={arrayFiname}
                        name="finame_kit"
                        formulario={form}
                        error="Selecione um campo Finame"
                        required
                        defaultValue={
                            defaultValues && defaultValues["finame_kit"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "finame_kit"
                        )}
                    />
                    <InputSelectComponent
                        name="potencia_modulo_kit"
                        label="Potência do Módulo"
                        formulario={form}
                        width="xl:w-1/3"
                        error="Selecione um campo de Potencia do Módulo"
                        options={dadosPotencia}
                        required
                        defaultValue={
                            defaultValues &&
                            defaultValues["potencia_modulo_kit"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "potencia_modulo_kit"
                        )}
                    />
                    <Input
                        name="potencia_kit"
                        formulario={form}
                        width="xl:w-1/3"
                        label="Potência do Kit (kWp)"
                        error="Preencha a Potencia do Kit"
                        mascara="numerico"
                        required
                        defaultValue={
                            defaultValues && defaultValues["potencia_kit"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "potencia_kit"
                        )}
                    />
                    <Input
                        name="qtd_min_modulos_kit"
                        formulario={form}
                        width="xl:w-1/3"
                        label="Mínimo de Módulos"
                        error="Preencha o minimo de módulos"
                        mascara="numerico"
                        required
                        defaultValue={
                            defaultValues &&
                            defaultValues["qtd_min_modulos_kit"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "qtd_min_modulos_kit"
                        )}
                    />
                    <Input
                        name="qtd_max_modulos_kit"
                        formulario={form}
                        width="xl:w-1/3"
                        label="Máximo de Módulos"
                        error="Preencha o máximo de módulos"
                        mascara="numerico"
                        required
                        defaultValue={
                            defaultValues &&
                            defaultValues["qtd_max_modulos_kit"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "qtd_max_modulos_kit"
                        )}
                    />
                </InputGroup>

                <InputGroup align="center">
                    <InputSelectComponent
                        label="Inversor 1"
                        width="xl:w-1/2"
                        options={dadosInversores}
                        name="cod_inversor1_kit"
                        formulario={form}
                        error="Selecione o Inversor 1"
                        required
                        defaultValue={
                            defaultValues && defaultValues["cod_inversor1_kit"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "cod_inversor1_kit"
                        )}
                    />
                    <Input
                        name="qtd_inversor1_kit"
                        formulario={form}
                        width="xl:w-1/6"
                        label="Quantidade 1"
                        error="Preencha a quantidade de inversores!"
                        mascara="numerico"
                        required
                        defaultValue={
                            defaultValues && defaultValues["qtd_inversor1_kit"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "qtd_inversor1_kit"
                        )}
                    />
                </InputGroup>

                <InputGroup align="center">
                    <InputSelectComponent
                        label="Inversor 2"
                        width="xl:w-1/2"
                        options={dadosInversores}
                        name="cod_inversor2_kit"
                        formulario={form}
                        error="Selecione o Inversor 2"
                        defaultValue={
                            defaultValues && defaultValues["cod_inversor2_kit"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "cod_inversor2_kit"
                        )}
                    />
                    <Input
                        label="Quantidade 2"
                        width="xl:w-1/6"
                        name="qtd_inversor2_kit"
                        formulario={form}
                        mascara="numerico"
                        error="Preencha a quantidade de inversores 2"
                        defaultValue={
                            defaultValues && defaultValues["qtd_inversor2_kit"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "qtd_inversor2_kit"
                        )}
                    />
                </InputGroup>

                <InputGroup align="center">
                    <InputSelectComponent
                        label="Inversor 3"
                        width="xl:w-1/2"
                        options={dadosInversores}
                        name="cod_inversor3_kit"
                        formulario={form}
                        error="Selecione o Inversor 3"
                        defaultValue={
                            defaultValues && defaultValues["cod_inversor3_kit"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "cod_inversor3_kit"
                        )}
                    />
                    <Input
                        label="Quantidade 3"
                        width="xl:w-1/6"
                        name="qtd_inversor3_kit"
                        formulario={form}
                        mascara="numerico"
                        error="Preencha a quantidade de inversores 3"
                        defaultValue={
                            defaultValues && defaultValues["qtd_inversor3_kit"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "qtd_inversor3_kit"
                        )}
                    />
                </InputGroup>
                {children}
            </form>
        </>
    );
};

export default FormKitManual;
