import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarFornecedores } from "@/requests/CRUD/Fornecedor/listarFornecedores";
import { IValueLabel } from "@/types/formInterfaces";
import { GetForm, valueLabel } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormInversor = ({
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
    const [fornecedores, setFornecedores] = useState<IValueLabel[]>([]);

    useEffect(() => {
        listarFornecedores().then((arr) => {
            const value = "id_fornecedor";
            const label = "nome_fornecedor";
            setFornecedores(valueLabel(arr, label, value));
        });
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
                <InputGroup>
                    <Input
                        label="Marca"
                        name="marca_inversor"
                        width="w-1/2"
                        formulario={form}
                        error="Preencha a Marca"
                        required
                        defaultValue={
                            defaultValues && defaultValues["marca_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "marca_inversor"
                        )}
                    />
                    <Input
                        label="Modelo"
                        name="modelo_inversor"
                        width="w-1/2"
                        formulario={form}
                        error="Preencha o Modelo"
                        required
                        defaultValue={
                            defaultValues && defaultValues["modelo_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "modelo_inversor"
                        )}
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        label="Cód. Interno"
                        name="cod_interno_inversor"
                        width="w-1/3"
                        mascara="numerico"
                        formulario={form}
                        error="Preencha o Código interno"
                        required
                        defaultValue={
                            defaultValues &&
                            defaultValues["cod_interno_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "cod_interno_inversor"
                        )}
                    />
                    <Input
                        label="Garantia"
                        name="garantia_inversor"
                        width="w-1/3"
                        mascara="numerico"
                        formulario={form}
                        error="Preencha a gatantia"
                        required
                        defaultValue={
                            defaultValues && defaultValues["garantia_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "garantia_inversor"
                        )}
                    />
                    <Input
                        label="Valor Garantia Estendida"
                        name="vlr_garantia_est_inversor"
                        width="w-1/3"
                        mascara="numero"
                        formulario={form}
                        error="Preencha o valor da garantia estendida"
                        required
                        prefix="R$"
                        defaultValue={
                            defaultValues &&
                            defaultValues["vlr_garantia_est_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) =>
                                field == "vlr_garantia_est_inversor"
                        )}
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        label="NCM"
                        name="ncm_inversor"
                        formulario={form}
                        error="Preencha o NCM"
                        required
                        defaultValue={
                            defaultValues && defaultValues["ncm_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "ncm_inversor"
                        )}
                    />
                    <Input
                        label="Número EX"
                        name="numero_ex_inversor"
                        mascara="numerico"
                        formulario={form}
                        error="Preencha o número EX"
                        required
                        defaultValue={
                            defaultValues && defaultValues["numero_ex_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "numero_ex_inversor"
                        )}
                    />
                    <Input
                        label="Resolução"
                        name="resolucao_inversor"
                        formulario={form}
                        error="Preencha a resolução do inversor"
                        required
                        defaultValue={
                            defaultValues && defaultValues["resolucao_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "resolucao_inversor"
                        )}
                    />
                </InputGroup>
                <InputGroup>
                    <InputSelectComponent
                        label="Tipo de Ligação"
                        name="ligacao_inversor"
                        options={[
                            { value: "Monofásico", label: "Monofásico" },
                            { value: "Trifásico", label: "Trifásico" },
                        ]}
                        formulario={form}
                        defaultValue={
                            defaultValues && defaultValues["ligacao_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "ligacao_inversor"
                        )}
                    />
                    <InputSelectComponent
                        label="Origem"
                        name="origem_inversor"
                        options={[
                            { value: "Nacional", label: "Nacional" },
                            { value: "Importado", label: "Importado" },
                        ]}
                        formulario={form}
                        error="Selecione a origem"
                        required
                        defaultValue={
                            defaultValues && defaultValues["origem_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "origem_inversor"
                        )}
                    />
                    <Input
                        label="Preço de Venda"
                        mascara="numero"
                        name="precovenda_inversor"
                        prefix="R$"
                        formulario={form}
                        required
                        error="Informe o preço de venda"
                        defaultValue={
                            defaultValues &&
                            defaultValues["precovenda_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "precovenda_inversor"
                        )}
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        label="Potência em kW"
                        name="potencia_inversor"
                        mascara="numero"
                        formulario={form}
                        error="Informe a potência"
                        required
                        defaultValue={
                            defaultValues && defaultValues["potencia_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "potencia_inversor"
                        )}
                    />
                    <Input
                        label="Potência em kVA"
                        name="potenciaKVA_inversor"
                        mascara="numero"
                        formulario={form}
                        error="Informe a potencia em kVA"
                        required
                        defaultValue={
                            defaultValues &&
                            defaultValues["potenciaKVA_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "potenciaKVA_inversor"
                        )}
                    />
                    <InputSelectComponent
                        label="Tensão"
                        name="tensao_inversor"
                        options={[
                            { value: "110", label: "110V" },
                            { value: "220", label: "220V" },
                            { value: "380", label: "380V" },
                        ]}
                        formulario={form}
                        error="Informe a tensão"
                        required
                        defaultValue={
                            defaultValues && defaultValues["tensao_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "tensao_inversor"
                        )}
                    />
                    <Input
                        label="Corrente"
                        name="corrente_inversor"
                        mascara="numero"
                        formulario={form}
                        error="Preencha a corrente"
                        required
                        defaultValue={
                            defaultValues && defaultValues["corrente_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "corrente_inversor"
                        )}
                    />
                </InputGroup>
                <InputGroup>
                    <InputSelectComponent
                        label="Fornecedores"
                        name="fornecedores"
                        options={fornecedores}
                        formulario={form}
                        isMulti
                        required
                        error="Informe ao menos um Fornecedor"
                        defaultValue={
                            defaultValues && defaultValues["fornecedores"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "fornecedores"
                        )}
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        type="textarea"
                        label="Observação Interna"
                        name="obs_interna_inversor"
                        formulario={form}
                        defaultValue={
                            defaultValues &&
                            defaultValues["obs_interna_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) => field == "obs_interna_inversor"
                        )}
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        label="Código FINAME(até 75 kWp)"
                        name="codigo_finameAte75_inversor"
                        formulario={form}
                        mascara="numerico"
                        defaultValue={
                            defaultValues &&
                            defaultValues["codigo_finameAte75_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) =>
                                field == "codigo_finameAte75_inversor"
                        )}
                    />
                    <Input
                        label="Código FINAME(até 375 kWp)"
                        name="codigo_finameAte375_inversor"
                        formulario={form}
                        mascara="numerico"
                        defaultValue={
                            defaultValues &&
                            defaultValues["codigo_finameAte375_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) =>
                                field == "codigo_finameAte375_inversor"
                        )}
                    />
                    <Input
                        label="Código FINAME(acima 375 kWp)"
                        name="codigo_finameAcima375_inversor"
                        formulario={form}
                        mascara="numerico"
                        defaultValue={
                            defaultValues &&
                            defaultValues["codigo_finameAcima375_inversor"]
                        }
                        disabled={disabledFields?.some(
                            (field: string) =>
                                field == "codigo_finameAcima375_inversor"
                        )}
                    />
                </InputGroup>
                {children}
            </form>
        </>
    );
};

export default FormInversor;
